use axum::extract::Query;
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::{response::Json, routing::get, Router};
use serde::{Deserialize, Serialize};
use serde_with::{serde_as, NoneAsEmptyString};

#[tokio::main]
async fn main() {
    let app = Router::new().route("/", get(handler));
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    println!("Listening on: {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

async fn handler(Query(params): Query<GreetingParams>) -> impl IntoResponse {
    let GreetingParams { name, age } = params;
    (
        StatusCode::OK,
        Json(Greeting {
            message: format!(
                "Hello {}{}.",
                name.map_or("Anonymous".to_string(), |name| name + "-san"),
                age.map_or("".to_string(), |age| format!("({})", age)),
            ),
        }),
    )
}

#[serde_as]
#[derive(Deserialize)]
struct GreetingParams {
    #[serde(default)]
    #[serde_as(as = "NoneAsEmptyString")]
    name: Option<String>,
    age: Option<u8>,
}

#[derive(Serialize)]
struct Greeting {
    message: String,
}
