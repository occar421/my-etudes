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
pub struct Nodes {
    #[serde(rename = "nodes")]
    pub nodes: Vec<models::Node>,
}

impl Nodes {
    pub fn new(nodes: Vec<models::Node>) -> Nodes {
        Nodes {
            nodes,
        }
    }
}

