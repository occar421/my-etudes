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
pub struct UsersetTreePeriodTupleToUserset {
    #[serde(rename = "tupleset")]
    pub tupleset: String,
    #[serde(rename = "computed")]
    pub computed: Vec<models::Computed>,
}

impl UsersetTreePeriodTupleToUserset {
    pub fn new(tupleset: String, computed: Vec<models::Computed>) -> UsersetTreePeriodTupleToUserset {
        UsersetTreePeriodTupleToUserset {
            tupleset,
            computed,
        }
    }
}

