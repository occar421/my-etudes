use crate::folders::model::{Folder, FolderId, FolderName, FolderUpdateRepository};

pub(crate) async fn exec<FolderRepo: FolderUpdateRepository>(
    name: &FolderName,
    folder_repo: FolderRepo,
) -> Result<Content, ()> {
    let folder_id = folder_repo.generate_id().await;
    let folder = Folder::new(folder_id.clone(), name.clone(), None);

    folder_repo.create(folder).await?;

    Ok(Content { id: folder_id })
}

pub(crate) struct Content {
    pub(crate) id: FolderId,
}
