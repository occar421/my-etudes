/*
 * OpenFGA
 *
 * A high performance and flexible authorization/permission engine built for developers and inspired by Google Zanzibar.
 *
 * The version of the OpenAPI document: 1.x
 * Contact: community@openfga.dev
 * Generated by: https://openapi-generator.tech
 */

use crate::models;
use serde::{Deserialize, Serialize};

#[derive(Clone, Default, Debug, PartialEq, Serialize, Deserialize)]
pub struct StreamResultOfStreamedListObjectsResponse {
    #[serde(rename = "result", skip_serializing_if = "Option::is_none")]
    pub result: Option<Box<models::StreamedListObjectsResponse>>,
    #[serde(rename = "error", skip_serializing_if = "Option::is_none")]
    pub error: Option<Box<models::Status>>,
}

impl StreamResultOfStreamedListObjectsResponse {
    pub fn new() -> StreamResultOfStreamedListObjectsResponse {
        StreamResultOfStreamedListObjectsResponse {
            result: None,
            error: None,
        }
    }
}

