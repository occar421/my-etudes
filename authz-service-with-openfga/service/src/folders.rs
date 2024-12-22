use axum::extract::State;
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::routing::post;
use axum::{Json, Router};
use openfga_client::apis::stores_api::{StoresApi, StoresApiClient};
use std::sync::Arc;

pub(crate) fn routes(store_id: String, store_api_client: Arc<StoresApiClient>) -> Router {
    Router::new()
        .route("/", post(list_folders))
        .with_state(FolderContext {
            store_id,
            store_api_client,
        })
}

#[derive(Clone)]
struct FolderContext {
    store_id: String,
    store_api_client: Arc<StoresApiClient>,
}

async fn list_folders(State(context): State<FolderContext>) -> impl IntoResponse {
    let response = context
        .store_api_client
        .get_store(&context.store_id)
        .await
        .unwrap();
    (StatusCode::OK, Json(response.name))
}
