mod folders;

use crate::folders::routes;
use axum::Router;
use openfga_client::apis::configuration::Configuration;
use openfga_client::apis::stores_api::StoresApiClient;
use std::sync::Arc;

#[tokio::main]
async fn main() {
    let mut config = Configuration::new();
    config.base_path = "http://localhost:8080".to_string();
    let stores_api_client = StoresApiClient::new(Arc::new(config));
    let stores_api_client = Arc::new(stores_api_client);
    let store_id = "01JFQ79PAX6Y4QTYXK5H1JBAP7".to_string();

    let app = Router::new().nest("/folders", routes(store_id, stores_api_client));
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    println!("Listening on: {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}
