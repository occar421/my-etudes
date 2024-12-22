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

/// UsersetTree : A UsersetTree contains the result of an Expansion.
#[derive(Clone, Default, Debug, PartialEq, Serialize, Deserialize)]
pub struct UsersetTree {
    #[serde(rename = "root", skip_serializing_if = "Option::is_none")]
    pub root: Option<Box<models::Node>>,
}

impl UsersetTree {
    /// A UsersetTree contains the result of an Expansion.
    pub fn new() -> UsersetTree {
        UsersetTree {
            root: None,
        }
    }
}

