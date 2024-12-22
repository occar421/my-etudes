/*
 * OpenFGA
 *
 * A high performance and flexible authorization/permission engine built for developers and inspired by Google Zanzibar.
 *
 * The version of the OpenAPI document: 1.x
 * Contact: community@openfga.dev
 * Generated by: https://openapi-generator.tech
 */


use async_trait::async_trait;
use reqwest;
use std::sync::Arc;
use serde::{Deserialize, Serialize};
use crate::{apis::ResponseContent, models};
use super::{Error, configuration};

#[async_trait]
pub trait StoresApi: Send + Sync {
    async fn create_store<'body>(&self, body: models::CreateStoreRequest) -> Result<models::CreateStoreResponse, Error<CreateStoreError>>;
    async fn delete_store<'store_id>(&self, store_id: &'store_id str) -> Result<(), Error<DeleteStoreError>>;
    async fn get_store<'store_id>(&self, store_id: &'store_id str) -> Result<models::GetStoreResponse, Error<GetStoreError>>;
    async fn list_stores<'page_size, 'continuation_token, 'name>(&self, page_size: Option<i32>, continuation_token: Option<&'continuation_token str>, name: Option<&'name str>) -> Result<models::ListStoresResponse, Error<ListStoresError>>;
}

pub struct StoresApiClient {
    configuration: Arc<configuration::Configuration>
}

impl StoresApiClient {
    pub fn new(configuration: Arc<configuration::Configuration>) -> Self {
        Self { configuration }
    }
}



#[async_trait]
impl StoresApi for StoresApiClient {
    /// Create a unique OpenFGA store which will be used to store authorization models and relationship tuples.
    async fn create_store<'body>(&self, body: models::CreateStoreRequest) -> Result<models::CreateStoreResponse, Error<CreateStoreError>> {
        let local_var_configuration = &self.configuration;

        let local_var_client = &local_var_configuration.client;

        let local_var_uri_str = format!("{}/stores", local_var_configuration.base_path);
        let mut local_var_req_builder = local_var_client.request(reqwest::Method::POST, local_var_uri_str.as_str());

        if let Some(ref local_var_user_agent) = local_var_configuration.user_agent {
            local_var_req_builder = local_var_req_builder.header(reqwest::header::USER_AGENT, local_var_user_agent.clone());
        }
        local_var_req_builder = local_var_req_builder.json(&body);

        let local_var_req = local_var_req_builder.build()?;
        let local_var_resp = local_var_client.execute(local_var_req).await?;

        let local_var_status = local_var_resp.status();
        let local_var_content = local_var_resp.text().await?;

        if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
            serde_json::from_str(&local_var_content).map_err(Error::from)
        } else {
            let local_var_entity: Option<CreateStoreError> = serde_json::from_str(&local_var_content).ok();
            let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
            Err(Error::ResponseError(local_var_error))
        }
    }

    /// Delete an OpenFGA store. This does not delete the data associated with the store, like tuples or authorization models.
    async fn delete_store<'store_id>(&self, store_id: &'store_id str) -> Result<(), Error<DeleteStoreError>> {
        let local_var_configuration = &self.configuration;

        let local_var_client = &local_var_configuration.client;

        let local_var_uri_str = format!("{}/stores/{store_id}", local_var_configuration.base_path, store_id=crate::apis::urlencode(store_id));
        let mut local_var_req_builder = local_var_client.request(reqwest::Method::DELETE, local_var_uri_str.as_str());

        if let Some(ref local_var_user_agent) = local_var_configuration.user_agent {
            local_var_req_builder = local_var_req_builder.header(reqwest::header::USER_AGENT, local_var_user_agent.clone());
        }

        let local_var_req = local_var_req_builder.build()?;
        let local_var_resp = local_var_client.execute(local_var_req).await?;

        let local_var_status = local_var_resp.status();
        let local_var_content = local_var_resp.text().await?;

        if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
            Ok(())
        } else {
            let local_var_entity: Option<DeleteStoreError> = serde_json::from_str(&local_var_content).ok();
            let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
            Err(Error::ResponseError(local_var_error))
        }
    }

    /// Returns an OpenFGA store by its identifier
    async fn get_store<'store_id>(&self, store_id: &'store_id str) -> Result<models::GetStoreResponse, Error<GetStoreError>> {
        let local_var_configuration = &self.configuration;

        let local_var_client = &local_var_configuration.client;

        let local_var_uri_str = format!("{}/stores/{store_id}", local_var_configuration.base_path, store_id=crate::apis::urlencode(store_id));
        let mut local_var_req_builder = local_var_client.request(reqwest::Method::GET, local_var_uri_str.as_str());

        if let Some(ref local_var_user_agent) = local_var_configuration.user_agent {
            local_var_req_builder = local_var_req_builder.header(reqwest::header::USER_AGENT, local_var_user_agent.clone());
        }

        let local_var_req = local_var_req_builder.build()?;
        let local_var_resp = local_var_client.execute(local_var_req).await?;

        let local_var_status = local_var_resp.status();
        let local_var_content = local_var_resp.text().await?;

        if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
            serde_json::from_str(&local_var_content).map_err(Error::from)
        } else {
            let local_var_entity: Option<GetStoreError> = serde_json::from_str(&local_var_content).ok();
            let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
            Err(Error::ResponseError(local_var_error))
        }
    }

    /// Returns a paginated list of OpenFGA stores and a continuation token to get additional stores. The continuation token will be empty if there are no more stores. 
    async fn list_stores<'page_size, 'continuation_token, 'name>(&self, page_size: Option<i32>, continuation_token: Option<&'continuation_token str>, name: Option<&'name str>) -> Result<models::ListStoresResponse, Error<ListStoresError>> {
        let local_var_configuration = &self.configuration;

        let local_var_client = &local_var_configuration.client;

        let local_var_uri_str = format!("{}/stores", local_var_configuration.base_path);
        let mut local_var_req_builder = local_var_client.request(reqwest::Method::GET, local_var_uri_str.as_str());

        if let Some(ref local_var_str) = page_size {
            local_var_req_builder = local_var_req_builder.query(&[("page_size", &local_var_str.to_string())]);
        }
        if let Some(ref local_var_str) = continuation_token {
            local_var_req_builder = local_var_req_builder.query(&[("continuation_token", &local_var_str.to_string())]);
        }
        if let Some(ref local_var_str) = name {
            local_var_req_builder = local_var_req_builder.query(&[("name", &local_var_str.to_string())]);
        }
        if let Some(ref local_var_user_agent) = local_var_configuration.user_agent {
            local_var_req_builder = local_var_req_builder.header(reqwest::header::USER_AGENT, local_var_user_agent.clone());
        }

        let local_var_req = local_var_req_builder.build()?;
        let local_var_resp = local_var_client.execute(local_var_req).await?;

        let local_var_status = local_var_resp.status();
        let local_var_content = local_var_resp.text().await?;

        if !local_var_status.is_client_error() && !local_var_status.is_server_error() {
            serde_json::from_str(&local_var_content).map_err(Error::from)
        } else {
            let local_var_entity: Option<ListStoresError> = serde_json::from_str(&local_var_content).ok();
            let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
            Err(Error::ResponseError(local_var_error))
        }
    }

}

/// struct for typed errors of method [`create_store`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum CreateStoreError {
    Status400(models::ValidationErrorMessageResponse),
    Status401(models::UnauthenticatedResponse),
    Status403(models::ForbiddenResponse),
    Status404(models::PathUnknownErrorMessageResponse),
    Status409(models::AbortedMessageResponse),
    Status422(models::UnprocessableContentMessageResponse),
    Status500(models::InternalErrorMessageResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`delete_store`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum DeleteStoreError {
    Status400(models::ValidationErrorMessageResponse),
    Status401(models::UnauthenticatedResponse),
    Status403(models::ForbiddenResponse),
    Status404(models::PathUnknownErrorMessageResponse),
    Status409(models::AbortedMessageResponse),
    Status422(models::UnprocessableContentMessageResponse),
    Status500(models::InternalErrorMessageResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`get_store`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum GetStoreError {
    Status400(models::ValidationErrorMessageResponse),
    Status401(models::UnauthenticatedResponse),
    Status403(models::ForbiddenResponse),
    Status404(models::PathUnknownErrorMessageResponse),
    Status409(models::AbortedMessageResponse),
    Status422(models::UnprocessableContentMessageResponse),
    Status500(models::InternalErrorMessageResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`list_stores`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum ListStoresError {
    Status400(models::ValidationErrorMessageResponse),
    Status401(models::UnauthenticatedResponse),
    Status403(models::ForbiddenResponse),
    Status404(models::PathUnknownErrorMessageResponse),
    Status409(models::AbortedMessageResponse),
    Status422(models::UnprocessableContentMessageResponse),
    Status500(models::InternalErrorMessageResponse),
    UnknownValue(serde_json::Value),
}

