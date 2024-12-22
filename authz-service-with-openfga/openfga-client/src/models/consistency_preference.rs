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

/// ConsistencyPreference : Controls the consistency preferences when calling the query APIs.   - UNSPECIFIED: Default if not set. Behavior will be the same as MINIMIZE_LATENCY.  - MINIMIZE_LATENCY: Minimize latency at the potential expense of lower consistency.  - HIGHER_CONSISTENCY: Prefer higher consistency, at the potential expense of increased latency.
/// Controls the consistency preferences when calling the query APIs.   - UNSPECIFIED: Default if not set. Behavior will be the same as MINIMIZE_LATENCY.  - MINIMIZE_LATENCY: Minimize latency at the potential expense of lower consistency.  - HIGHER_CONSISTENCY: Prefer higher consistency, at the potential expense of increased latency.
#[derive(Clone, Copy, Debug, Eq, PartialEq, Ord, PartialOrd, Hash, Serialize, Deserialize)]
pub enum ConsistencyPreference {
    #[serde(rename = "UNSPECIFIED")]
    Unspecified,
    #[serde(rename = "MINIMIZE_LATENCY")]
    MinimizeLatency,
    #[serde(rename = "HIGHER_CONSISTENCY")]
    HigherConsistency,

}

impl std::fmt::Display for ConsistencyPreference {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            Self::Unspecified => write!(f, "UNSPECIFIED"),
            Self::MinimizeLatency => write!(f, "MINIMIZE_LATENCY"),
            Self::HigherConsistency => write!(f, "HIGHER_CONSISTENCY"),
        }
    }
}

impl Default for ConsistencyPreference {
    fn default() -> ConsistencyPreference {
        Self::Unspecified
    }
}
