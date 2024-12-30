use crate::folders::model::{Folder, FolderId, FolderRepository};
use crate::folders::usecase::DomainEventPublisher;
use std::sync::Arc;

pub(crate) async fn exec<FolderRepo: FolderRepository>(
    command: Command,
    domain_event_publisher: Arc<DomainEventPublisher>,
    folder_repo: Arc<FolderRepo>,
) -> Result<Folder, ()> {
    if let Some(parent_id) = &command.parent_id {
        if let Err(_) = folder_repo.find_by_id(parent_id).await {
            return Err(());
        }
    }

    let (folder, events) = Folder::create(command.parent_id);

    folder_repo.create(folder.clone()).await?;

    domain_event_publisher.publish(&events);

    Ok(folder)
}

pub(crate) struct Command {
    parent_id: Option<FolderId>,
}

impl Command {
    pub(crate) fn new(parent_id: Option<FolderId>) -> Self {
        Self { parent_id }
    }
}
