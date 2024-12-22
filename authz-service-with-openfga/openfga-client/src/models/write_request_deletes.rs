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
pub struct WriteRequestDeletes {
    #[serde(rename = "tuple_keys")]
    pub tuple_keys: Vec<models::TupleKeyWithoutCondition>,
}

impl WriteRequestDeletes {
    pub fn new(tuple_keys: Vec<models::TupleKeyWithoutCondition>) -> WriteRequestDeletes {
        WriteRequestDeletes {
            tuple_keys,
        }
    }
}

