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
pub struct Node {
    #[serde(rename = "name")]
    pub name: String,
    #[serde(rename = "leaf", skip_serializing_if = "Option::is_none")]
    pub leaf: Option<Box<models::Leaf>>,
    #[serde(rename = "difference", skip_serializing_if = "Option::is_none")]
    pub difference: Option<Box<models::UsersetTreePeriodDifference>>,
    #[serde(rename = "union", skip_serializing_if = "Option::is_none")]
    pub union: Option<Box<models::Nodes>>,
    #[serde(rename = "intersection", skip_serializing_if = "Option::is_none")]
    pub intersection: Option<Box<models::Nodes>>,
}

impl Node {
    pub fn new(name: String) -> Node {
        Node {
            name,
            leaf: None,
            difference: None,
            union: None,
            intersection: None,
        }
    }
}

