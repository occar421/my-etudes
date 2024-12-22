use crate::folders::model::FolderId;
use crate::folders::FolderContext;
use openfga_client::apis::relationship_tuples_api::RelationshipTuplesApi;
use openfga_client::models::{TupleKey, WriteRequest, WriteRequestWrites};
use std::time::{SystemTime, UNIX_EPOCH};
use uuid::{NoContext, Timestamp, Uuid};

pub(crate) struct FolderRepository {}

impl FolderRepository {
    // TODO rename
    pub(crate) async fn create_folder_with_parent(
        &self,
        parent_folder_id: Uuid,
        context: FolderContext,
    ) -> Result<(), ()> {
        // TODO check if parent DB record exists

        let duration = SystemTime::now().duration_since(UNIX_EPOCH).unwrap();
        let folder_id = Uuid::new_v7(Timestamp::from_unix(
            NoContext,
            duration.as_secs(),
            duration.subsec_nanos(),
        ));

        // TODO insert new folder in DB

        let request = {
            let mut req = WriteRequest::new();
            req.writes = Some(Box::new(WriteRequestWrites::new(vec![TupleKey {
                user: format!("folder:{}", parent_folder_id),
                relation: "parent".into(),
                object: format!("folder:uuid:{}", folder_id),
                condition: None,
            }])));
            req
        };

        context
            .rel_tuple_api_client
            .write(&context.store_id, request)
            .await
            .unwrap();

        Ok(())
    }

    // TODO rename
    pub(crate) async fn create_folder_without_parent(
        &self,
        context: FolderContext,
    ) -> Result<(), ()> {
        // TODO insert new folder in DB

        Ok(())
    }

    pub(crate) async fn generate_id(&self) -> FolderId {
        let duration = SystemTime::now().duration_since(UNIX_EPOCH).unwrap();
        let id = Uuid::new_v7(Timestamp::from_unix(
            NoContext,
            duration.as_secs(),
            duration.subsec_nanos(),
        ));

        FolderId(id)
    }
}
