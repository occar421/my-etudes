use crate::folders::model::{Folder, FolderCommandRepository, FolderId, FolderName};
use crate::folders::usecase::DomainEventPublisher;

pub(crate) async fn exec<FolderCommandRepo: FolderCommandRepository>(
    name: FolderName,
    parent_id: Option<FolderId>,
    domain_event_publisher: DomainEventPublisher,
    folder_repo: FolderCommandRepo,
) -> Result<Folder, ()> {
    if let Some(parent_id) = &parent_id {
        if let Err(_) = folder_repo.find_by_id(parent_id).await {
            return Err(());
        }
    }

    let (folder, events) = Folder::create(name, parent_id);

    folder_repo.create(folder.clone()).await?;

    domain_event_publisher.publish(&events);

    Ok(folder)
}
