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
pub struct ReadRequest {
    #[serde(rename = "tuple_key", skip_serializing_if = "Option::is_none")]
    pub tuple_key: Option<Box<models::ReadRequestTupleKey>>,
    #[serde(rename = "page_size", skip_serializing_if = "Option::is_none")]
    pub page_size: Option<i32>,
    #[serde(rename = "continuation_token", skip_serializing_if = "Option::is_none")]
    pub continuation_token: Option<String>,
    #[serde(rename = "consistency", skip_serializing_if = "Option::is_none")]
    pub consistency: Option<models::ConsistencyPreference>,
}

impl ReadRequest {
    pub fn new() -> ReadRequest {
        ReadRequest {
            tuple_key: None,
            page_size: None,
            continuation_token: None,
            consistency: None,
        }
    }
}

