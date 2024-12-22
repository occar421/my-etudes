use uuid::Uuid;

pub(crate) struct FolderId(pub(crate) Uuid);

pub(crate) trait FolderRepository {
    async fn generate_id(&self) -> FolderId;
}
