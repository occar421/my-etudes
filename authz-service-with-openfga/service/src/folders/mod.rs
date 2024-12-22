mod model;
mod repository;
mod usecase;

use crate::folders::model::{DomainEvent, FolderEvent, FolderId, FolderName};
use crate::folders::repository::FolderRepositoryImpl;
use crate::folders::usecase::{DomainEventHandler, DomainEventPublisher};
use axum::extract::State;
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::routing::post;
use axum::{Json, Router};
use openfga_client::apis::relationship_tuples_api::RelationshipTuplesApiClient;
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use uuid::Uuid;

pub(super) fn init(
    store_id: String,
    rel_tuple_api_client: Arc<RelationshipTuplesApiClient>,
) -> Router {
    let mut domain_event_publisher = DomainEventPublisher::new();

    domain_event_publisher.subscribe(DomainEventHandler::new(
        "FolderCreated".to_string(),
        |event| {
            if let DomainEvent::Folder(FolderEvent::Created { folder }) = event {
                println!("{:?}", folder.name());
            }
        },
    ));

    let domain_event_publisher = Arc::new(domain_event_publisher);
    let folder_repository = Arc::new(FolderRepositoryImpl {});

    Router::new()
        .route("/", post(create_folder_command))
        .with_state(FolderContext {
            store_id,
            rel_tuple_api_client,
            domain_event_publisher,
            folder_repository,
        })
}

#[derive(Clone)]
struct FolderContext {
    store_id: String,
    rel_tuple_api_client: Arc<RelationshipTuplesApiClient>,
    domain_event_publisher: Arc<DomainEventPublisher>,
    folder_repository: Arc<FolderRepositoryImpl>,
}

async fn create_folder_command(
    State(context): State<FolderContext>,
    Json(payload): Json<CreateFolderRequestPayload>,
) -> impl IntoResponse {
    let folder = usecase::create_folder::exec(
        FolderName::from(payload.name.try_into().unwrap()),
        payload.parent_folder_id.map(|id| id.try_into().unwrap()),
        context.domain_event_publisher,
        context.folder_repository,
    )
    .await
    .unwrap();

    // TODO add OpenFGA relation through event emit

    (
        StatusCode::OK,
        Json(CreateFolderResponsePayload {
            id: folder.id().clone().into(),
        }),
    )
}

#[derive(Deserialize)]
struct CreateFolderRequestPayload {
    parent_folder_id: Option<Uuid>,
    name: String,
}

#[derive(Serialize)]
struct CreateFolderResponsePayload {
    id: Uuid,
}
