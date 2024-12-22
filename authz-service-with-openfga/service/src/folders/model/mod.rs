use crate::common::generate_uuid_v7;
use uuid::Uuid;

#[derive(Clone)]
pub(crate) struct Folder {
    id: FolderId,
    name: FolderName,
    parent_id: Option<FolderId>,
}

impl Folder {
    pub(crate) fn create(name: FolderName, parent_id: Option<FolderId>) -> Self {
        Self {
            id: FolderId(generate_uuid_v7()),
            name,
            parent_id,
        }
    }

    pub(crate) fn id(&self) -> &FolderId {
        &self.id
    }

    pub(crate) fn name(&self) -> &FolderName {
        &self.name
    }

    pub(crate) fn parent_id(&self) -> &Option<FolderId> {
        &self.parent_id
    }
}

#[derive(Clone)]
pub(crate) struct FolderId(Uuid);

impl TryFrom<Uuid> for FolderId {
    type Error = ();

    fn try_from(value: Uuid) -> Result<Self, Self::Error> {
        Ok(Self(value))
    }
}

#[derive(Clone)]
pub(crate) struct FolderName(String);

impl TryFrom<String> for FolderName {
    type Error = ();

    fn try_from(value: String) -> Result<Self, Self::Error> {
        Ok(Self(value))
    }
}

#[derive(Clone)]
pub(crate) struct FolderCreated {
    folder: Folder,
}

impl FolderCreated {
    pub(crate) fn new(folder: Folder) -> Self {
        Self { folder }
    }
}

pub(crate) trait FolderCommandRepository {
    async fn find_by_id(&self, id: &FolderId) -> Result<Folder, ()>;
    async fn create(&self, folder: Folder) -> Result<(), ()>;
}
