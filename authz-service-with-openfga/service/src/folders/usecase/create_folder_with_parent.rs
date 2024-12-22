use crate::folders::model::{Folder, FolderId, FolderName, FolderUpdateRepository};

pub(crate) async fn exec<FolderUpdateRepo: FolderUpdateRepository>(
    parent_folder_id: &FolderId,
    name: &FolderName,
    folder_repo: FolderUpdateRepo,
) -> Result<Content, ()> {
    let folder_id = folder_repo.generate_id().await;

    if let Err(_) = folder_repo.find_by_id(&parent_folder_id).await {
        return Err(());
    }

    let folder = Folder::new(
        folder_id.clone(),
        name.clone(),
        parent_folder_id.clone().into(),
    );

    folder_repo.create(folder).await?;

    // TODO add OpenFGA relation

    Ok(Content { id: folder_id })
}

pub(crate) struct Content {
    pub(crate) id: FolderId,
}
