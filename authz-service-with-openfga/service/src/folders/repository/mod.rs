use crate::folders::model::{Folder, FolderId, FolderRepository};

pub(crate) struct FolderRepositoryImpl {}

impl FolderRepositoryImpl {
    pub(crate) fn new() -> Self {
        Self {}
    }
}

// Should select for update
impl FolderRepository for FolderRepositoryImpl {
    async fn find_by_id(&self, id: &FolderId) -> Result<Folder, ()> {
        todo!()
    }

    async fn create(&self, folder: Folder) -> Result<(), ()> {
        todo!()
    }
}
