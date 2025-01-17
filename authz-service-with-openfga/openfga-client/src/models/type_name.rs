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

/// 
#[derive(Clone, Copy, Debug, Eq, PartialEq, Ord, PartialOrd, Hash, Serialize, Deserialize)]
pub enum TypeName {
    #[serde(rename = "TYPE_NAME_UNSPECIFIED")]
    Unspecified,
    #[serde(rename = "TYPE_NAME_ANY")]
    Any,
    #[serde(rename = "TYPE_NAME_BOOL")]
    Bool,
    #[serde(rename = "TYPE_NAME_STRING")]
    String,
    #[serde(rename = "TYPE_NAME_INT")]
    Int,
    #[serde(rename = "TYPE_NAME_UINT")]
    Uint,
    #[serde(rename = "TYPE_NAME_DOUBLE")]
    Double,
    #[serde(rename = "TYPE_NAME_DURATION")]
    Duration,
    #[serde(rename = "TYPE_NAME_TIMESTAMP")]
    Timestamp,
    #[serde(rename = "TYPE_NAME_MAP")]
    Map,
    #[serde(rename = "TYPE_NAME_LIST")]
    List,
    #[serde(rename = "TYPE_NAME_IPADDRESS")]
    Ipaddress,

}

impl std::fmt::Display for TypeName {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            Self::Unspecified => write!(f, "TYPE_NAME_UNSPECIFIED"),
            Self::Any => write!(f, "TYPE_NAME_ANY"),
            Self::Bool => write!(f, "TYPE_NAME_BOOL"),
            Self::String => write!(f, "TYPE_NAME_STRING"),
            Self::Int => write!(f, "TYPE_NAME_INT"),
            Self::Uint => write!(f, "TYPE_NAME_UINT"),
            Self::Double => write!(f, "TYPE_NAME_DOUBLE"),
            Self::Duration => write!(f, "TYPE_NAME_DURATION"),
            Self::Timestamp => write!(f, "TYPE_NAME_TIMESTAMP"),
            Self::Map => write!(f, "TYPE_NAME_MAP"),
            Self::List => write!(f, "TYPE_NAME_LIST"),
            Self::Ipaddress => write!(f, "TYPE_NAME_IPADDRESS"),
        }
    }
}

impl Default for TypeName {
    fn default() -> TypeName {
        Self::Unspecified
    }
}

