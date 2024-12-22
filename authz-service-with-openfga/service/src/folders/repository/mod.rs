use crate::folders::model::{Folder, FolderCommandRepository, FolderId};
use crate::folders::FolderContext;
use openfga_client::apis::relationship_tuples_api::RelationshipTuplesApi;
use openfga_client::models::{TupleKey, WriteRequest, WriteRequestWrites};
use uuid::Uuid;

pub(crate) struct FolderRepositoryImpl {}

impl FolderRepositoryImpl {
    // TODO rename
    pub(crate) async fn create_folder_with_parent(
        &self,
        parent_folder_id: Uuid,
        context: FolderContext,
    ) -> Result<(), ()> {
        let request = {
            let mut req = WriteRequest::new();
            req.writes = Some(Box::new(WriteRequestWrites::new(vec![TupleKey {
                user: format!("folder:{}", parent_folder_id),
                relation: "parent".into(),
                object: format!("folder:{}", unimplemented!()),
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
}

// Should select for update
impl FolderCommandRepository for FolderRepositoryImpl {
    async fn find_by_id(&self, id: &FolderId) -> Result<Folder, ()> {
        todo!()
    }

    async fn create(&self, folder: Folder) -> Result<(), ()> {
        todo!()
    }
}
