mod model;
mod repository;
mod usecase;

use crate::folders::model::{FolderId, FolderName};
use crate::folders::repository::FolderRepositoryImpl;
use axum::extract::State;
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::routing::post;
use axum::{Json, Router};
use openfga_client::apis::relationship_tuples_api::RelationshipTuplesApiClient;
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use uuid::Uuid;

pub(super) fn routes(
    store_id: String,
    rel_tuple_api_client: Arc<RelationshipTuplesApiClient>,
) -> Router {
    Router::new()
        .route("/", post(create_folder_command))
        .with_state(FolderContext {
            store_id,
            rel_tuple_api_client,
        })
}

#[derive(Clone)]
struct FolderContext {
    store_id: String,
    rel_tuple_api_client: Arc<RelationshipTuplesApiClient>,
}

async fn create_folder_command(
    State(context): State<FolderContext>,
    Json(payload): Json<CreateFolderRequestPayload>,
) -> impl IntoResponse {
    let folder_repository = FolderRepositoryImpl {};

    let folder_created_event = usecase::create_folder::exec(
        FolderName::from("a".to_string().try_into().unwrap()),
        payload.parent_folder_id.map(|id| id.try_into().unwrap()),
        folder_repository,
    )
    .await
    .unwrap();

    // TODO add OpenFGA relation through event emit

    (
        StatusCode::OK,
        Json(CreateFolderResponsePayload {
            id: unimplemented!(),
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
