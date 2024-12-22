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
pub struct ReadAuthorizationModelsResponse {
    #[serde(rename = "authorization_models")]
    pub authorization_models: Vec<models::AuthorizationModel>,
    /// The continuation token will be empty if there are no more models.
    #[serde(rename = "continuation_token", skip_serializing_if = "Option::is_none")]
    pub continuation_token: Option<String>,
}

impl ReadAuthorizationModelsResponse {
    pub fn new(authorization_models: Vec<models::AuthorizationModel>) -> ReadAuthorizationModelsResponse {
        ReadAuthorizationModelsResponse {
            authorization_models,
            continuation_token: None,
        }
    }
}

