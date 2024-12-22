use crate::folders::model::{Folder, FolderCommandRepository, FolderCreated, FolderId, FolderName};

pub(crate) async fn exec<FolderCommandRepo: FolderCommandRepository>(
    name: FolderName,
    parent_id: Option<FolderId>,
    folder_repo: FolderCommandRepo,
) -> Result<FolderCreated, ()> { // TODO multiple abstract events
    if let Some(parent_id) = &parent_id {
        if let Err(_) = folder_repo.find_by_id(parent_id).await {
            return Err(());
        }
    }

    let folder = Folder::create(name, parent_id);

    folder_repo.create(folder.clone()).await?;

    Ok(FolderCreated::new(folder))
}
