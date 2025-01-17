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
pub struct UserTypeFilter {
    #[serde(rename = "type")]
    pub r#type: String,
    #[serde(rename = "relation", skip_serializing_if = "Option::is_none")]
    pub relation: Option<String>,
}

impl UserTypeFilter {
    pub fn new(r#type: String) -> UserTypeFilter {
        UserTypeFilter {
            r#type,
            relation: None,
        }
    }
}

