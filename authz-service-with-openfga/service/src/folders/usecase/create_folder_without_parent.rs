use crate::folders::model::{FolderId, FolderRepository};

pub(crate) async fn exec<FolderRepo: FolderRepository>(
    folder_repo: FolderRepo,
) -> Result<Content, ()> {
    let folder_id = folder_repo.generate_id().await;

    // TODO insert new folder in DB

    Ok(Content { id: folder_id })
}

pub(crate) struct Content {
    pub(crate) id: FolderId,
}
