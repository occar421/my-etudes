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
pub enum ErrorCode {
    #[serde(rename = "no_error")]
    NoError,
    #[serde(rename = "validation_error")]
    ValidationError,
    #[serde(rename = "authorization_model_not_found")]
    AuthorizationModelNotFound,
    #[serde(rename = "authorization_model_resolution_too_complex")]
    AuthorizationModelResolutionTooComplex,
    #[serde(rename = "invalid_write_input")]
    InvalidWriteInput,
    #[serde(rename = "cannot_allow_duplicate_tuples_in_one_request")]
    CannotAllowDuplicateTuplesInOneRequest,
    #[serde(rename = "cannot_allow_duplicate_types_in_one_request")]
    CannotAllowDuplicateTypesInOneRequest,
    #[serde(rename = "cannot_allow_multiple_references_to_one_relation")]
    CannotAllowMultipleReferencesToOneRelation,
    #[serde(rename = "invalid_continuation_token")]
    InvalidContinuationToken,
    #[serde(rename = "invalid_tuple_set")]
    InvalidTupleSet,
    #[serde(rename = "invalid_check_input")]
    InvalidCheckInput,
    #[serde(rename = "invalid_expand_input")]
    InvalidExpandInput,
    #[serde(rename = "unsupported_user_set")]
    UnsupportedUserSet,
    #[serde(rename = "invalid_object_format")]
    InvalidObjectFormat,
    #[serde(rename = "write_failed_due_to_invalid_input")]
    WriteFailedDueToInvalidInput,
    #[serde(rename = "authorization_model_assertions_not_found")]
    AuthorizationModelAssertionsNotFound,
    #[serde(rename = "latest_authorization_model_not_found")]
    LatestAuthorizationModelNotFound,
    #[serde(rename = "type_not_found")]
    TypeNotFound,
    #[serde(rename = "relation_not_found")]
    RelationNotFound,
    #[serde(rename = "empty_relation_definition")]
    EmptyRelationDefinition,
    #[serde(rename = "invalid_user")]
    InvalidUser,
    #[serde(rename = "invalid_tuple")]
    InvalidTuple,
    #[serde(rename = "unknown_relation")]
    UnknownRelation,
    #[serde(rename = "store_id_invalid_length")]
    StoreIdInvalidLength,
    #[serde(rename = "assertions_too_many_items")]
    AssertionsTooManyItems,
    #[serde(rename = "id_too_long")]
    IdTooLong,
    #[serde(rename = "authorization_model_id_too_long")]
    AuthorizationModelIdTooLong,
    #[serde(rename = "tuple_key_value_not_specified")]
    TupleKeyValueNotSpecified,
    #[serde(rename = "tuple_keys_too_many_or_too_few_items")]
    TupleKeysTooManyOrTooFewItems,
    #[serde(rename = "page_size_invalid")]
    PageSizeInvalid,
    #[serde(rename = "param_missing_value")]
    ParamMissingValue,
    #[serde(rename = "difference_base_missing_value")]
    DifferenceBaseMissingValue,
    #[serde(rename = "subtract_base_missing_value")]
    SubtractBaseMissingValue,
    #[serde(rename = "object_too_long")]
    ObjectTooLong,
    #[serde(rename = "relation_too_long")]
    RelationTooLong,
    #[serde(rename = "type_definitions_too_few_items")]
    TypeDefinitionsTooFewItems,
    #[serde(rename = "type_invalid_length")]
    TypeInvalidLength,
    #[serde(rename = "type_invalid_pattern")]
    TypeInvalidPattern,
    #[serde(rename = "relations_too_few_items")]
    RelationsTooFewItems,
    #[serde(rename = "relations_too_long")]
    RelationsTooLong,
    #[serde(rename = "relations_invalid_pattern")]
    RelationsInvalidPattern,
    #[serde(rename = "object_invalid_pattern")]
    ObjectInvalidPattern,
    #[serde(rename = "query_string_type_continuation_token_mismatch")]
    QueryStringTypeContinuationTokenMismatch,
    #[serde(rename = "exceeded_entity_limit")]
    ExceededEntityLimit,
    #[serde(rename = "invalid_contextual_tuple")]
    InvalidContextualTuple,
    #[serde(rename = "duplicate_contextual_tuple")]
    DuplicateContextualTuple,
    #[serde(rename = "invalid_authorization_model")]
    InvalidAuthorizationModel,
    #[serde(rename = "unsupported_schema_version")]
    UnsupportedSchemaVersion,
    #[serde(rename = "cancelled")]
    Cancelled,
    #[serde(rename = "invalid_start_time")]
    InvalidStartTime,

}

impl std::fmt::Display for ErrorCode {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            Self::NoError => write!(f, "no_error"),
            Self::ValidationError => write!(f, "validation_error"),
            Self::AuthorizationModelNotFound => write!(f, "authorization_model_not_found"),
            Self::AuthorizationModelResolutionTooComplex => write!(f, "authorization_model_resolution_too_complex"),
            Self::InvalidWriteInput => write!(f, "invalid_write_input"),
            Self::CannotAllowDuplicateTuplesInOneRequest => write!(f, "cannot_allow_duplicate_tuples_in_one_request"),
            Self::CannotAllowDuplicateTypesInOneRequest => write!(f, "cannot_allow_duplicate_types_in_one_request"),
            Self::CannotAllowMultipleReferencesToOneRelation => write!(f, "cannot_allow_multiple_references_to_one_relation"),
            Self::InvalidContinuationToken => write!(f, "invalid_continuation_token"),
            Self::InvalidTupleSet => write!(f, "invalid_tuple_set"),
            Self::InvalidCheckInput => write!(f, "invalid_check_input"),
            Self::InvalidExpandInput => write!(f, "invalid_expand_input"),
            Self::UnsupportedUserSet => write!(f, "unsupported_user_set"),
            Self::InvalidObjectFormat => write!(f, "invalid_object_format"),
            Self::WriteFailedDueToInvalidInput => write!(f, "write_failed_due_to_invalid_input"),
            Self::AuthorizationModelAssertionsNotFound => write!(f, "authorization_model_assertions_not_found"),
            Self::LatestAuthorizationModelNotFound => write!(f, "latest_authorization_model_not_found"),
            Self::TypeNotFound => write!(f, "type_not_found"),
            Self::RelationNotFound => write!(f, "relation_not_found"),
            Self::EmptyRelationDefinition => write!(f, "empty_relation_definition"),
            Self::InvalidUser => write!(f, "invalid_user"),
            Self::InvalidTuple => write!(f, "invalid_tuple"),
            Self::UnknownRelation => write!(f, "unknown_relation"),
            Self::StoreIdInvalidLength => write!(f, "store_id_invalid_length"),
            Self::AssertionsTooManyItems => write!(f, "assertions_too_many_items"),
            Self::IdTooLong => write!(f, "id_too_long"),
            Self::AuthorizationModelIdTooLong => write!(f, "authorization_model_id_too_long"),
            Self::TupleKeyValueNotSpecified => write!(f, "tuple_key_value_not_specified"),
            Self::TupleKeysTooManyOrTooFewItems => write!(f, "tuple_keys_too_many_or_too_few_items"),
            Self::PageSizeInvalid => write!(f, "page_size_invalid"),
            Self::ParamMissingValue => write!(f, "param_missing_value"),
            Self::DifferenceBaseMissingValue => write!(f, "difference_base_missing_value"),
            Self::SubtractBaseMissingValue => write!(f, "subtract_base_missing_value"),
            Self::ObjectTooLong => write!(f, "object_too_long"),
            Self::RelationTooLong => write!(f, "relation_too_long"),
            Self::TypeDefinitionsTooFewItems => write!(f, "type_definitions_too_few_items"),
            Self::TypeInvalidLength => write!(f, "type_invalid_length"),
            Self::TypeInvalidPattern => write!(f, "type_invalid_pattern"),
            Self::RelationsTooFewItems => write!(f, "relations_too_few_items"),
            Self::RelationsTooLong => write!(f, "relations_too_long"),
            Self::RelationsInvalidPattern => write!(f, "relations_invalid_pattern"),
            Self::ObjectInvalidPattern => write!(f, "object_invalid_pattern"),
            Self::QueryStringTypeContinuationTokenMismatch => write!(f, "query_string_type_continuation_token_mismatch"),
            Self::ExceededEntityLimit => write!(f, "exceeded_entity_limit"),
            Self::InvalidContextualTuple => write!(f, "invalid_contextual_tuple"),
            Self::DuplicateContextualTuple => write!(f, "duplicate_contextual_tuple"),
            Self::InvalidAuthorizationModel => write!(f, "invalid_authorization_model"),
            Self::UnsupportedSchemaVersion => write!(f, "unsupported_schema_version"),
            Self::Cancelled => write!(f, "cancelled"),
            Self::InvalidStartTime => write!(f, "invalid_start_time"),
        }
    }
}

impl Default for ErrorCode {
    fn default() -> ErrorCode {
        Self::NoError
    }
}

