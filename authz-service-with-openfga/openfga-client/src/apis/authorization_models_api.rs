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
pub trait AuthorizationModelsApi: Send + Sync {
    async fn read_authorization_model<'store_id, 'id>(&self, store_id: &'store_id str, id: &'id str) -> Result<models::ReadAuthorizationModelResponse, Error<ReadAuthorizationModelError>>;
    async fn read_authorization_models<'store_id, 'page_size, 'continuation_token>(&self, store_id: &'store_id str, page_size: Option<i32>, continuation_token: Option<&'continuation_token str>) -> Result<models::ReadAuthorizationModelsResponse, Error<ReadAuthorizationModelsError>>;
    async fn write_authorization_model<'store_id, 'body>(&self, store_id: &'store_id str, body: models::WriteAuthorizationModelRequest) -> Result<models::WriteAuthorizationModelResponse, Error<WriteAuthorizationModelError>>;
}

pub struct AuthorizationModelsApiClient {
    configuration: Arc<configuration::Configuration>
}

impl AuthorizationModelsApiClient {
    pub fn new(configuration: Arc<configuration::Configuration>) -> Self {
        Self { configuration }
    }
}



#[async_trait]
impl AuthorizationModelsApi for AuthorizationModelsApiClient {
    /// The ReadAuthorizationModel API returns an authorization model by its identifier. The response will return the authorization model for the particular version.  ## Example To retrieve the authorization model with ID `01G5JAVJ41T49E9TT3SKVS7X1J` for the store, call the GET authorization-models by ID API with `01G5JAVJ41T49E9TT3SKVS7X1J` as the `id` path parameter.  The API will return: ```json {   \"authorization_model\":{     \"id\":\"01G5JAVJ41T49E9TT3SKVS7X1J\",     \"type_definitions\":[       {         \"type\":\"user\"       },       {         \"type\":\"document\",         \"relations\":{           \"reader\":{             \"union\":{               \"child\":[                 {                   \"this\":{}                 },                 {                   \"computedUserset\":{                     \"object\":\"\",                     \"relation\":\"writer\"                   }                 }               ]             }           },           \"writer\":{             \"this\":{}           }         }       }     ]   } } ``` In the above example, there are 2 types (`user` and `document`). The `document` type has 2 relations (`writer` and `reader`).
    async fn read_authorization_model<'store_id, 'id>(&self, store_id: &'store_id str, id: &'id str) -> Result<models::ReadAuthorizationModelResponse, Error<ReadAuthorizationModelError>> {
        let local_var_configuration = &self.configuration;

        let local_var_client = &local_var_configuration.client;

        let local_var_uri_str = format!("{}/stores/{store_id}/authorization-models/{id}", local_var_configuration.base_path, store_id=crate::apis::urlencode(store_id), id=crate::apis::urlencode(id));
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
            let local_var_entity: Option<ReadAuthorizationModelError> = serde_json::from_str(&local_var_content).ok();
            let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
            Err(Error::ResponseError(local_var_error))
        }
    }

    /// The ReadAuthorizationModels API will return all the authorization models for a certain store. OpenFGA's response will contain an array of all authorization models, sorted in descending order of creation.  ## Example Assume that a store's authorization model has been configured twice. To get all the authorization models that have been created in this store, call GET authorization-models. The API will return a response that looks like: ```json {   \"authorization_models\": [     {       \"id\": \"01G50QVV17PECNVAHX1GG4Y5NC\",       \"type_definitions\": [...]     },     {       \"id\": \"01G4ZW8F4A07AKQ8RHSVG9RW04\",       \"type_definitions\": [...]     },   ],   \"continuation_token\": \"eyJwayI6IkxBVEVTVF9OU0NPTkZJR19hdXRoMHN0b3JlIiwic2siOiIxem1qbXF3MWZLZExTcUoyN01MdTdqTjh0cWgifQ==\" } ``` If there are no more authorization models available, the `continuation_token` field will be empty ```json {   \"authorization_models\": [     {       \"id\": \"01G50QVV17PECNVAHX1GG4Y5NC\",       \"type_definitions\": [...]     },     {       \"id\": \"01G4ZW8F4A07AKQ8RHSVG9RW04\",       \"type_definitions\": [...]     },   ],   \"continuation_token\": \"\" } ``` 
    async fn read_authorization_models<'store_id, 'page_size, 'continuation_token>(&self, store_id: &'store_id str, page_size: Option<i32>, continuation_token: Option<&'continuation_token str>) -> Result<models::ReadAuthorizationModelsResponse, Error<ReadAuthorizationModelsError>> {
        let local_var_configuration = &self.configuration;

        let local_var_client = &local_var_configuration.client;

        let local_var_uri_str = format!("{}/stores/{store_id}/authorization-models", local_var_configuration.base_path, store_id=crate::apis::urlencode(store_id));
        let mut local_var_req_builder = local_var_client.request(reqwest::Method::GET, local_var_uri_str.as_str());

        if let Some(ref local_var_str) = page_size {
            local_var_req_builder = local_var_req_builder.query(&[("page_size", &local_var_str.to_string())]);
        }
        if let Some(ref local_var_str) = continuation_token {
            local_var_req_builder = local_var_req_builder.query(&[("continuation_token", &local_var_str.to_string())]);
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
            let local_var_entity: Option<ReadAuthorizationModelsError> = serde_json::from_str(&local_var_content).ok();
            let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
            Err(Error::ResponseError(local_var_error))
        }
    }

    /// The WriteAuthorizationModel API will add a new authorization model to a store. Each item in the `type_definitions` array is a type definition as specified in the field `type_definition`. The response will return the authorization model's ID in the `id` field.  ## Example To add an authorization model with `user` and `document` type definitions, call POST authorization-models API with the body:  ```json {   \"type_definitions\":[     {       \"type\":\"user\"     },     {       \"type\":\"document\",       \"relations\":{         \"reader\":{           \"union\":{             \"child\":[               {                 \"this\":{}               },               {                 \"computedUserset\":{                   \"object\":\"\",                   \"relation\":\"writer\"                 }               }             ]           }         },         \"writer\":{           \"this\":{}         }       }     }   ] } ``` OpenFGA's response will include the version id for this authorization model, which will look like  ``` {\"authorization_model_id\": \"01G50QVV17PECNVAHX1GG4Y5NC\"} ``` 
    async fn write_authorization_model<'store_id, 'body>(&self, store_id: &'store_id str, body: models::WriteAuthorizationModelRequest) -> Result<models::WriteAuthorizationModelResponse, Error<WriteAuthorizationModelError>> {
        let local_var_configuration = &self.configuration;

        let local_var_client = &local_var_configuration.client;

        let local_var_uri_str = format!("{}/stores/{store_id}/authorization-models", local_var_configuration.base_path, store_id=crate::apis::urlencode(store_id));
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
            let local_var_entity: Option<WriteAuthorizationModelError> = serde_json::from_str(&local_var_content).ok();
            let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
            Err(Error::ResponseError(local_var_error))
        }
    }

}

/// struct for typed errors of method [`read_authorization_model`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum ReadAuthorizationModelError {
    Status400(models::ValidationErrorMessageResponse),
    Status401(models::UnauthenticatedResponse),
    Status403(models::ForbiddenResponse),
    Status404(models::PathUnknownErrorMessageResponse),
    Status409(models::AbortedMessageResponse),
    Status422(models::UnprocessableContentMessageResponse),
    Status500(models::InternalErrorMessageResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`read_authorization_models`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum ReadAuthorizationModelsError {
    Status400(models::ValidationErrorMessageResponse),
    Status401(models::UnauthenticatedResponse),
    Status403(models::ForbiddenResponse),
    Status404(models::PathUnknownErrorMessageResponse),
    Status409(models::AbortedMessageResponse),
    Status422(models::UnprocessableContentMessageResponse),
    Status500(models::InternalErrorMessageResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`write_authorization_model`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum WriteAuthorizationModelError {
    Status400(models::ValidationErrorMessageResponse),
    Status401(models::UnauthenticatedResponse),
    Status403(models::ForbiddenResponse),
    Status404(models::PathUnknownErrorMessageResponse),
    Status409(models::AbortedMessageResponse),
    Status422(models::UnprocessableContentMessageResponse),
    Status500(models::InternalErrorMessageResponse),
    UnknownValue(serde_json::Value),
}

