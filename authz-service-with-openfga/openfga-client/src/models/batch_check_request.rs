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
pub struct BatchCheckRequest {
    #[serde(rename = "checks")]
    pub checks: Vec<models::BatchCheckItem>,
    #[serde(rename = "authorization_model_id", skip_serializing_if = "Option::is_none")]
    pub authorization_model_id: Option<String>,
    #[serde(rename = "consistency", skip_serializing_if = "Option::is_none")]
    pub consistency: Option<models::ConsistencyPreference>,
}

impl BatchCheckRequest {
    pub fn new(checks: Vec<models::BatchCheckItem>) -> BatchCheckRequest {
        BatchCheckRequest {
            checks,
            authorization_model_id: None,
            consistency: None,
        }
    }
}

