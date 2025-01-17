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
pub trait RelationshipQueriesApi: Send + Sync {
    async fn batch_check<'store_id, 'body>(&self, store_id: &'store_id str, body: models::BatchCheckRequest) -> Result<models::BatchCheckResponse, Error<BatchCheckError>>;
    async fn check<'store_id, 'body>(&self, store_id: &'store_id str, body: models::CheckRequest) -> Result<models::CheckResponse, Error<CheckError>>;
    async fn expand<'store_id, 'body>(&self, store_id: &'store_id str, body: models::ExpandRequest) -> Result<models::ExpandResponse, Error<ExpandError>>;
    async fn list_objects<'store_id, 'body>(&self, store_id: &'store_id str, body: models::ListObjectsRequest) -> Result<models::ListObjectsResponse, Error<ListObjectsError>>;
    async fn list_users<'store_id, 'body>(&self, store_id: &'store_id str, body: models::ListUsersRequest) -> Result<models::ListUsersResponse, Error<ListUsersError>>;
    async fn streamed_list_objects<'store_id, 'body>(&self, store_id: &'store_id str, body: models::ListObjectsRequest) -> Result<models::StreamResultOfStreamedListObjectsResponse, Error<StreamedListObjectsError>>;
}

pub struct RelationshipQueriesApiClient {
    configuration: Arc<configuration::Configuration>
}

impl RelationshipQueriesApiClient {
    pub fn new(configuration: Arc<configuration::Configuration>) -> Self {
        Self { configuration }
    }
}



#[async_trait]
impl RelationshipQueriesApi for RelationshipQueriesApiClient {
    /// The `BatchCheck` API functions nearly identically to `Check`, but instead of checking a single user-object relationship BatchCheck accepts a list of relationships to check and returns a map containing `BatchCheckItem` response for each check it received.  An associated `correlation_id` is required for each check in the batch. This ID is used to correlate a check to the appropriate response. It is a string consisting of only alphanumeric characters or hyphens with a maximum length of 36 characters. This `correlation_id` is used to map the result of each check to the item which was checked, so it must be unique for each item in the batch. We recommend using a UUID or ULID as the `correlation_id`, but you can use whatever unique identifier you need as long  as it matches this regex pattern: `^[\\w\\d-]{1,36}$`  For more details on how `Check` functions, see the docs for `/check`.  ### Examples #### A BatchCheckRequest ```json {   \"checks\": [      {        \"tuple_key\": {          \"object\": \"document:2021-budget\"          \"relation\": \"reader\",          \"user\": \"user:anne\",        },        \"contextual_tuples\": {...}        \"context\": {}        \"correlation_id\": \"01JA8PM3QM7VBPGB8KMPK8SBD5\"      },      {        \"tuple_key\": {          \"object\": \"document:2021-budget\"          \"relation\": \"reader\",          \"user\": \"user:bob\",        },        \"contextual_tuples\": {...}        \"context\": {}        \"correlation_id\": \"01JA8PMM6A90NV5ET0F28CYSZQ\"      }    ] } ```  Below is a possible response to the above request. Note that the result map's keys are the `correlation_id` values from the checked items in the request: ```json {    \"result\": {      \"01JA8PMM6A90NV5ET0F28CYSZQ\": {        \"allowed\": false,         \"error\": {\"message\": \"\"}      },      \"01JA8PM3QM7VBPGB8KMPK8SBD5\": {        \"allowed\": true,         \"error\": {\"message\": \"\"}      } } ``` 
    async fn batch_check<'store_id, 'body>(&self, store_id: &'store_id str, body: models::BatchCheckRequest) -> Result<models::BatchCheckResponse, Error<BatchCheckError>> {
        let local_var_configuration = &self.configuration;

        let local_var_client = &local_var_configuration.client;

        let local_var_uri_str = format!("{}/stores/{store_id}/batch-check", local_var_configuration.base_path, store_id=crate::apis::urlencode(store_id));
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
            let local_var_entity: Option<BatchCheckError> = serde_json::from_str(&local_var_content).ok();
            let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
            Err(Error::ResponseError(local_var_error))
        }
    }

    /// The Check API returns whether a given user has a relationship with a given object in a given store. The `user` field of the request can be a specific target, such as `user:anne`, or a userset (set of users) such as `group:marketing#member` or a type-bound public access `user:*`. To arrive at a result, the API uses: an authorization model, explicit tuples written through the Write API, contextual tuples present in the request, and implicit tuples that exist by virtue of applying set theory (such as `document:2021-budget#viewer@document:2021-budget#viewer`; the set of users who are viewers of `document:2021-budget` are the set of users who are the viewers of `document:2021-budget`). A `contextual_tuples` object may also be included in the body of the request. This object contains one field `tuple_keys`, which is an array of tuple keys. Each of these tuples may have an associated `condition`. You may also provide an `authorization_model_id` in the body. This will be used to assert that the input `tuple_key` is valid for the model specified. If not specified, the assertion will be made against the latest authorization model ID. It is strongly recommended to specify authorization model id for better performance. You may also provide a `context` object that will be used to evaluate the conditioned tuples in the system. It is strongly recommended to provide a value for all the input parameters of all the conditions, to ensure that all tuples be evaluated correctly. By default, the Check API caches results for a short time to optimize performance. You may specify a value of `HIGHER_CONSISTENCY` for the optional `consistency` parameter in the body to inform the server that higher conisistency is preferred at the expense of increased latency. Consideration should be given to the increased latency if requesting higher consistency. The response will return whether the relationship exists in the field `allowed`.  Some exceptions apply, but in general, if a Check API responds with `{allowed: true}`, then you can expect the equivalent ListObjects query to return the object, and viceversa.  For example, if `Check(user:anne, reader, document:2021-budget)` responds with `{allowed: true}`, then `ListObjects(user:anne, reader, document)` may include `document:2021-budget` in the response. ## Examples ### Querying with contextual tuples In order to check if user `user:anne` of type `user` has a `reader` relationship with object `document:2021-budget` given the following contextual tuple ```json {   \"user\": \"user:anne\",   \"relation\": \"member\",   \"object\": \"time_slot:office_hours\" } ``` the Check API can be used with the following request body: ```json {   \"tuple_key\": {     \"user\": \"user:anne\",     \"relation\": \"reader\",     \"object\": \"document:2021-budget\"   },   \"contextual_tuples\": {     \"tuple_keys\": [       {         \"user\": \"user:anne\",         \"relation\": \"member\",         \"object\": \"time_slot:office_hours\"       }     ]   },   \"authorization_model_id\": \"01G50QVV17PECNVAHX1GG4Y5NC\" } ``` ### Querying usersets Some Checks will always return `true`, even without any tuples. For example, for the following authorization model ```python model   schema 1.1 type user type document   relations     define reader: [user] ``` the following query ```json {   \"tuple_key\": {      \"user\": \"document:2021-budget#reader\",      \"relation\": \"reader\",      \"object\": \"document:2021-budget\"   } } ``` will always return `{ \"allowed\": true }`. This is because usersets are self-defining: the userset `document:2021-budget#reader` will always have the `reader` relation with `document:2021-budget`. ### Querying usersets with difference in the model A Check for a userset can yield results that must be treated carefully if the model involves difference. For example, for the following authorization model ```python model   schema 1.1 type user type group   relations     define member: [user] type document   relations     define blocked: [user]     define reader: [group#member] but not blocked ``` the following query ```json {   \"tuple_key\": {      \"user\": \"group:finance#member\",      \"relation\": \"reader\",      \"object\": \"document:2021-budget\"   },   \"contextual_tuples\": {     \"tuple_keys\": [       {         \"user\": \"user:anne\",         \"relation\": \"member\",         \"object\": \"group:finance\"       },       {         \"user\": \"group:finance#member\",         \"relation\": \"reader\",         \"object\": \"document:2021-budget\"       },       {         \"user\": \"user:anne\",         \"relation\": \"blocked\",         \"object\": \"document:2021-budget\"       }     ]   }, } ``` will return `{ \"allowed\": true }`, even though a specific user of the userset `group:finance#member` does not have the `reader` relationship with the given object. ### Requesting higher consistency By default, the Check API caches results for a short time to optimize performance. You may request higher consistency to inform the server that higher consistency should be preferred at the expense of increased latency. Care should be taken when requesting higher consistency due to the increased latency. ```json {   \"tuple_key\": {      \"user\": \"group:finance#member\",      \"relation\": \"reader\",      \"object\": \"document:2021-budget\"   },   \"consistency\": \"HIGHER_CONSISTENCY\" } ``` 
    async fn check<'store_id, 'body>(&self, store_id: &'store_id str, body: models::CheckRequest) -> Result<models::CheckResponse, Error<CheckError>> {
        let local_var_configuration = &self.configuration;

        let local_var_client = &local_var_configuration.client;

        let local_var_uri_str = format!("{}/stores/{store_id}/check", local_var_configuration.base_path, store_id=crate::apis::urlencode(store_id));
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
            let local_var_entity: Option<CheckError> = serde_json::from_str(&local_var_content).ok();
            let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
            Err(Error::ResponseError(local_var_error))
        }
    }

    /// The Expand API will return all users and usersets that have certain relationship with an object in a certain store. This is different from the `/stores/{store_id}/read` API in that both users and computed usersets are returned. Body parameters `tuple_key.object` and `tuple_key.relation` are all required. A `contextual_tuples` object may also be included in the body of the request. This object contains one field `tuple_keys`, which is an array of tuple keys. Each of these tuples may have an associated `condition`. The response will return a tree whose leaves are the specific users and usersets. Union, intersection and difference operator are located in the intermediate nodes.  ## Example To expand all users that have the `reader` relationship with object `document:2021-budget`, use the Expand API with the following request body ```json {   \"tuple_key\": {     \"object\": \"document:2021-budget\",     \"relation\": \"reader\"   },   \"authorization_model_id\": \"01G50QVV17PECNVAHX1GG4Y5NC\" } ``` OpenFGA's response will be a userset tree of the users and usersets that have read access to the document. ```json {   \"tree\":{     \"root\":{       \"type\":\"document:2021-budget#reader\",       \"union\":{         \"nodes\":[           {             \"type\":\"document:2021-budget#reader\",             \"leaf\":{               \"users\":{                 \"users\":[                   \"user:bob\"                 ]               }             }           },           {             \"type\":\"document:2021-budget#reader\",             \"leaf\":{               \"computed\":{                 \"userset\":\"document:2021-budget#writer\"               }             }           }         ]       }     }   } } ``` The caller can then call expand API for the `writer` relationship for the `document:2021-budget`. ### Expand Request with Contextual Tuples  Given the model ```python model     schema 1.1  type user  type folder     relations         define owner: [user]  type document     relations         define parent: [folder]         define viewer: [user] or writer         define writer: [user] or owner from parent ``` and the initial tuples ```json [{     \"user\": \"user:bob\",     \"relation\": \"owner\",     \"object\": \"folder:1\" }] ```  To expand all `writers` of `document:1` when `document:1` is put in `folder:1`, the first call could be  ```json {   \"tuple_key\": {     \"object\": \"document:1\",     \"relation\": \"writer\"   },   \"contextual_tuples\": {     \"tuple_keys\": [       {         \"user\": \"folder:1\",         \"relation\": \"parent\",         \"object\": \"document:1\"       }     ]   } } ``` this returns: ```json {   \"tree\": {     \"root\": {       \"name\": \"document:1#writer\",       \"union\": {         \"nodes\": [           {             \"name\": \"document:1#writer\",             \"leaf\": {               \"users\": {                 \"users\": []               }             }           },           {             \"name\": \"document:1#writer\",             \"leaf\": {               \"tupleToUserset\": {                 \"tupleset\": \"document:1#parent\",                 \"computed\": [                   {                     \"userset\": \"folder:1#owner\"                   }                 ]               }             }           }         ]       }     }   } } ``` This tells us that the `owner` of `folder:1` may also be a writer. So our next call could be to find the `owners` of `folder:1` ```json {   \"tuple_key\": {     \"object\": \"folder:1\",     \"relation\": \"owner\"   } } ``` which gives ```json {   \"tree\": {     \"root\": {       \"name\": \"folder:1#owner\",       \"leaf\": {         \"users\": {           \"users\": [             \"user:bob\"           ]         }       }     }   } } ``` 
    async fn expand<'store_id, 'body>(&self, store_id: &'store_id str, body: models::ExpandRequest) -> Result<models::ExpandResponse, Error<ExpandError>> {
        let local_var_configuration = &self.configuration;

        let local_var_client = &local_var_configuration.client;

        let local_var_uri_str = format!("{}/stores/{store_id}/expand", local_var_configuration.base_path, store_id=crate::apis::urlencode(store_id));
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
            let local_var_entity: Option<ExpandError> = serde_json::from_str(&local_var_content).ok();
            let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
            Err(Error::ResponseError(local_var_error))
        }
    }

    /// The ListObjects API returns a list of all the objects of the given type that the user has a relation with.  To arrive at a result, the API uses: an authorization model, explicit tuples written through the Write API, contextual tuples present in the request, and implicit tuples that exist by virtue of applying set theory (such as `document:2021-budget#viewer@document:2021-budget#viewer`; the set of users who are viewers of `document:2021-budget` are the set of users who are the viewers of `document:2021-budget`). An `authorization_model_id` may be specified in the body. If it is not specified, the latest authorization model ID will be used. It is strongly recommended to specify authorization model id for better performance. You may also specify `contextual_tuples` that will be treated as regular tuples. Each of these tuples may have an associated `condition`. You may also provide a `context` object that will be used to evaluate the conditioned tuples in the system. It is strongly recommended to provide a value for all the input parameters of all the conditions, to ensure that all tuples be evaluated correctly. By default, the Check API caches results for a short time to optimize performance. You may specify a value of `HIGHER_CONSISTENCY` for the optional `consistency` parameter in the body to inform the server that higher conisistency is preferred at the expense of increased latency. Consideration should be given to the increased latency if requesting higher consistency. The response will contain the related objects in an array in the \"objects\" field of the response and they will be strings in the object format `<type>:<id>` (e.g. \"document:roadmap\"). The number of objects in the response array will be limited by the execution timeout specified in the flag OPENFGA_LIST_OBJECTS_DEADLINE and by the upper bound specified in the flag OPENFGA_LIST_OBJECTS_MAX_RESULTS, whichever is hit first. The objects given will not be sorted, and therefore two identical calls can give a given different set of objects.
    async fn list_objects<'store_id, 'body>(&self, store_id: &'store_id str, body: models::ListObjectsRequest) -> Result<models::ListObjectsResponse, Error<ListObjectsError>> {
        let local_var_configuration = &self.configuration;

        let local_var_client = &local_var_configuration.client;

        let local_var_uri_str = format!("{}/stores/{store_id}/list-objects", local_var_configuration.base_path, store_id=crate::apis::urlencode(store_id));
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
            let local_var_entity: Option<ListObjectsError> = serde_json::from_str(&local_var_content).ok();
            let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
            Err(Error::ResponseError(local_var_error))
        }
    }

    /// The ListUsers API returns a list of all the users of a specific type that have a relation to a given object.  To arrive at a result, the API uses: an authorization model, explicit tuples written through the Write API, contextual tuples present in the request, and implicit tuples that exist by virtue of applying set theory (such as `document:2021-budget#viewer@document:2021-budget#viewer`; the set of users who are viewers of `document:2021-budget` are the set of users who are the viewers of `document:2021-budget`). An `authorization_model_id` may be specified in the body. If it is not specified, the latest authorization model ID will be used. It is strongly recommended to specify authorization model id for better performance. You may also specify `contextual_tuples` that will be treated as regular tuples. Each of these tuples may have an associated `condition`. You may also provide a `context` object that will be used to evaluate the conditioned tuples in the system. It is strongly recommended to provide a value for all the input parameters of all the conditions, to ensure that all tuples be evaluated correctly. The response will contain the related users in an array in the \"users\" field of the response. These results may include specific objects, usersets  or type-bound public access. Each of these types of results is encoded in its own type and not represented as a string.In cases where a type-bound public access result is returned (e.g. `user:*`), it cannot be inferred that all subjects of that type have a relation to the object; it is possible that negations exist and checks should still be queried on individual subjects to ensure access to that document.The number of users in the response array will be limited by the execution timeout specified in the flag OPENFGA_LIST_USERS_DEADLINE and by the upper bound specified in the flag OPENFGA_LIST_USERS_MAX_RESULTS, whichever is hit first. The returned users will not be sorted, and therefore two identical calls may yield different sets of users.
    async fn list_users<'store_id, 'body>(&self, store_id: &'store_id str, body: models::ListUsersRequest) -> Result<models::ListUsersResponse, Error<ListUsersError>> {
        let local_var_configuration = &self.configuration;

        let local_var_client = &local_var_configuration.client;

        let local_var_uri_str = format!("{}/stores/{store_id}/list-users", local_var_configuration.base_path, store_id=crate::apis::urlencode(store_id));
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
            let local_var_entity: Option<ListUsersError> = serde_json::from_str(&local_var_content).ok();
            let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
            Err(Error::ResponseError(local_var_error))
        }
    }

    /// The Streamed ListObjects API is very similar to the the ListObjects API, with two differences:  1. Instead of collecting all objects before returning a response, it streams them to the client as they are collected.  2. The number of results returned is only limited by the execution timeout specified in the flag OPENFGA_LIST_OBJECTS_DEADLINE.  
    async fn streamed_list_objects<'store_id, 'body>(&self, store_id: &'store_id str, body: models::ListObjectsRequest) -> Result<models::StreamResultOfStreamedListObjectsResponse, Error<StreamedListObjectsError>> {
        let local_var_configuration = &self.configuration;

        let local_var_client = &local_var_configuration.client;

        let local_var_uri_str = format!("{}/stores/{store_id}/streamed-list-objects", local_var_configuration.base_path, store_id=crate::apis::urlencode(store_id));
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
            let local_var_entity: Option<StreamedListObjectsError> = serde_json::from_str(&local_var_content).ok();
            let local_var_error = ResponseContent { status: local_var_status, content: local_var_content, entity: local_var_entity };
            Err(Error::ResponseError(local_var_error))
        }
    }

}

/// struct for typed errors of method [`batch_check`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum BatchCheckError {
    Status400(models::ValidationErrorMessageResponse),
    Status401(models::UnauthenticatedResponse),
    Status403(models::ForbiddenResponse),
    Status404(models::PathUnknownErrorMessageResponse),
    Status409(models::AbortedMessageResponse),
    Status422(models::UnprocessableContentMessageResponse),
    Status500(models::InternalErrorMessageResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`check`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum CheckError {
    Status400(models::ValidationErrorMessageResponse),
    Status401(models::UnauthenticatedResponse),
    Status403(models::ForbiddenResponse),
    Status404(models::PathUnknownErrorMessageResponse),
    Status409(models::AbortedMessageResponse),
    Status422(models::UnprocessableContentMessageResponse),
    Status500(models::InternalErrorMessageResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`expand`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum ExpandError {
    Status400(models::ValidationErrorMessageResponse),
    Status401(models::UnauthenticatedResponse),
    Status403(models::ForbiddenResponse),
    Status404(models::PathUnknownErrorMessageResponse),
    Status409(models::AbortedMessageResponse),
    Status422(models::UnprocessableContentMessageResponse),
    Status500(models::InternalErrorMessageResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`list_objects`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum ListObjectsError {
    Status400(models::ValidationErrorMessageResponse),
    Status401(models::UnauthenticatedResponse),
    Status403(models::ForbiddenResponse),
    Status404(models::PathUnknownErrorMessageResponse),
    Status409(models::AbortedMessageResponse),
    Status422(models::UnprocessableContentMessageResponse),
    Status500(models::InternalErrorMessageResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`list_users`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum ListUsersError {
    Status400(models::ValidationErrorMessageResponse),
    Status401(models::UnauthenticatedResponse),
    Status403(models::ForbiddenResponse),
    Status404(models::PathUnknownErrorMessageResponse),
    Status409(models::AbortedMessageResponse),
    Status422(models::UnprocessableContentMessageResponse),
    Status500(models::InternalErrorMessageResponse),
    UnknownValue(serde_json::Value),
}

/// struct for typed errors of method [`streamed_list_objects`]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum StreamedListObjectsError {
    Status400(models::ValidationErrorMessageResponse),
    Status401(models::UnauthenticatedResponse),
    Status403(models::ForbiddenResponse),
    Status404(models::PathUnknownErrorMessageResponse),
    Status409(models::AbortedMessageResponse),
    Status422(models::UnprocessableContentMessageResponse),
    Status500(models::InternalErrorMessageResponse),
    UnknownValue(serde_json::Value),
}

