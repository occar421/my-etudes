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
pub struct ListUsersRequest {
    #[serde(rename = "authorization_model_id", skip_serializing_if = "Option::is_none")]
    pub authorization_model_id: Option<String>,
    #[serde(rename = "object")]
    pub object: Box<models::Object>,
    #[serde(rename = "relation")]
    pub relation: String,
    /// The type of results returned. Only accepts exactly one value.
    #[serde(rename = "user_filters")]
    pub user_filters: Vec<models::UserTypeFilter>,
    #[serde(rename = "contextual_tuples", skip_serializing_if = "Option::is_none")]
    pub contextual_tuples: Option<Vec<models::TupleKey>>,
    /// Additional request context that will be used to evaluate any ABAC conditions encountered in the query evaluation.
    #[serde(rename = "context", skip_serializing_if = "Option::is_none")]
    pub context: Option<serde_json::Value>,
    #[serde(rename = "consistency", skip_serializing_if = "Option::is_none")]
    pub consistency: Option<models::ConsistencyPreference>,
}

impl ListUsersRequest {
    pub fn new(object: models::Object, relation: String, user_filters: Vec<models::UserTypeFilter>) -> ListUsersRequest {
        ListUsersRequest {
            authorization_model_id: None,
            object: Box::new(object),
            relation,
            user_filters,
            contextual_tuples: None,
            context: None,
            consistency: None,
        }
    }
}

