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
pub enum UnprocessableContentErrorCode {
    #[serde(rename = "no_throttled_error_code")]
    NoThrottledErrorCode,
    #[serde(rename = "throttled_timeout_error")]
    ThrottledTimeoutError,

}

impl std::fmt::Display for UnprocessableContentErrorCode {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            Self::NoThrottledErrorCode => write!(f, "no_throttled_error_code"),
            Self::ThrottledTimeoutError => write!(f, "throttled_timeout_error"),
        }
    }
}

impl Default for UnprocessableContentErrorCode {
    fn default() -> UnprocessableContentErrorCode {
        Self::NoThrottledErrorCode
    }
}

