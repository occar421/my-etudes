mod model;
mod repository;
mod usecase;

use crate::folders::model::{DomainEvent, FolderEvent};
use crate::folders::repository::FolderRepositoryImpl;
use crate::folders::usecase::{DomainEventHandler, DomainEventPublisher};
use axum::extract::State;
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::routing::post;
use axum::{Json, Router};
use openfga_client::apis::relationship_tuples_api::RelationshipTuplesApiClient;
use openfga_client::models::{TupleKey, WriteRequest, WriteRequestWrites};
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
                todo!("add OpenFGA relation through event emit")

                // let request = {
                //     let mut req = WriteRequest::new();
                //     req.writes = Some(Box::new(WriteRequestWrites::new(vec![TupleKey {
                //         user: format!("folder:{}", parent_folder_id),
                //         relation: "parent".into(),
                //         object: format!("folder:{}", unimplemented!()),
                //         condition: None,
                //     }])));
                //     req
                // };

                // context
                //     .rel_tuple_api_client
                //     .write(&context.store_id, request)
                //     .await
                //     .unwrap();
            }
        },
    ));

    let domain_event_publisher = Arc::new(domain_event_publisher);
    let folder_repository = Arc::new(FolderRepositoryImpl::new());

    Router::new()
        .route("/", post(create_folder))
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

async fn create_folder(
    State(context): State<FolderContext>,
    Json(payload): Json<CreateFolderRequestPayload>,
) -> impl IntoResponse {
    let command = usecase::create_folder::Command::new(
        payload.parent_folder_id.map(|id| id.try_into().unwrap()),
    );

    let folder = usecase::create_folder::exec(
        command,
        context.domain_event_publisher,
        context.folder_repository,
    )
    .await
    .unwrap();

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
}

#[derive(Serialize)]
struct CreateFolderResponsePayload {
    id: Uuid,
}
