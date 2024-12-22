mod folders;

use axum::Router;
use openfga_client::apis::configuration::Configuration;
use openfga_client::apis::relationship_tuples_api::RelationshipTuplesApiClient;
use std::sync::Arc;

#[tokio::main]
async fn main() {
    let mut config = Configuration::new();
    config.base_path = "http://localhost:8080".to_string();
    let rel_tuple_api_client = RelationshipTuplesApiClient::new(Arc::new(config));
    let rel_tuple_api_client = Arc::new(rel_tuple_api_client);
    let store_id = "01JFQ79PAX6Y4QTYXK5H1JBAP7".to_string();
    // let authz_model_id = "01JFQD8HBS0ZTXPT5G7VC3K55A".to_string();

    let app = Router::new().nest("/folders", folders::routes(store_id, rel_tuple_api_client));
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    println!("Listening on: {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}
