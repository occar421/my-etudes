use uuid::Uuid;

#[derive(Clone)]
pub(crate) struct Folder {
    id: FolderId,
    name: FolderName,
    parent_id: Option<FolderId>,
}

impl Folder {
    pub(crate) fn new(id: FolderId, name: FolderName, parent_id: Option<FolderId>) -> Self {
        Self {
            id,
            name,
            parent_id,
        }
    }
}

#[derive(Clone)]
pub(crate) struct FolderName(pub(crate) String);

#[derive(Clone)]
pub(crate) struct FolderId(pub(crate) Uuid);

pub(crate) trait FolderUpdateRepository {
    async fn generate_id(&self) -> FolderId;
    async fn find_by_id(&self, id: &FolderId) -> Result<Folder, ()>;
    async fn create(&self, folder: Folder) -> Result<(), ()>;
}
