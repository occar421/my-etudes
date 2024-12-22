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

/// Object : Object represents an OpenFGA Object.  An Object is composed of a type and identifier (e.g. 'document:1')  See https://openfga.dev/docs/concepts#what-is-an-object
#[derive(Clone, Default, Debug, PartialEq, Serialize, Deserialize)]
pub struct Object {
    #[serde(rename = "type")]
    pub r#type: String,
    #[serde(rename = "id")]
    pub id: String,
}

impl Object {
    /// Object represents an OpenFGA Object.  An Object is composed of a type and identifier (e.g. 'document:1')  See https://openfga.dev/docs/concepts#what-is-an-object
    pub fn new(r#type: String, id: String) -> Object {
        Object {
            r#type,
            id,
        }
    }
}

