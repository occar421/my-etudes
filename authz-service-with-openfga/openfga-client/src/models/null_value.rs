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

/// NullValue : `NullValue` is a singleton enumeration to represent the null value for the `Value` type union.  The JSON representation for `NullValue` is JSON `null`.   - NULL_VALUE: Null value.
/// `NullValue` is a singleton enumeration to represent the null value for the `Value` type union.  The JSON representation for `NullValue` is JSON `null`.   - NULL_VALUE: Null value.
#[derive(Clone, Copy, Debug, Eq, PartialEq, Ord, PartialOrd, Hash, Serialize, Deserialize)]
pub enum NullValue {
    #[serde(rename = "NULL_VALUE")]
    NullValue,

}

impl std::fmt::Display for NullValue {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            Self::NullValue => write!(f, "NULL_VALUE"),
        }
    }
}

impl Default for NullValue {
    fn default() -> NullValue {
        Self::NullValue
    }
}

