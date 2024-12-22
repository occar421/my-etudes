mod model;
mod repository;
mod usecase;

use crate::folders::model::FolderId;
use axum::extract::State;
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::routing::post;
use axum::{Json, Router};
use openfga_client::apis::relationship_tuples_api::{
    RelationshipTuplesApi, RelationshipTuplesApiClient,
};
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
    let folder_id = if let Some(parent_folder_id) = payload.parent_folder_id {
        let parent_folder_id = FolderId(parent_folder_id);
        usecase::create_folder_with_parent::exec(parent_folder_id)
            .await
            .unwrap()
            .id
    } else {
        usecase::create_folder_without_parent::exec()
            .await
            .unwrap()
            .id
    };

    (
        StatusCode::OK,
        Json(CreateFolderResponsePayload { id: folder_id.0 }),
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
