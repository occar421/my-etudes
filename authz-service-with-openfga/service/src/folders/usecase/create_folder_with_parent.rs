use crate::folders::model::{FolderId, FolderRepository};

pub(crate) async fn exec<FolderRepo: FolderRepository>(
    parent_folder_id: FolderId,
    folder_repo: FolderRepo,
) -> Result<Content, ()> {
    let folder_id = folder_repo.generate_id().await;

    // TODO check if parent DB record exists

    // TODO insert new folder in DB

    // TODO add OpenFGA relation

    Ok(Content { id: folder_id })
}

pub(crate) struct Content {
    pub(crate) id: FolderId,
}
