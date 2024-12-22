use crate::common::generate_uuid_v7;
use uuid::Uuid;

#[derive(Clone, Debug)]
pub(crate) enum DomainEvent {
    Folder(FolderEvent),
}

impl DomainEvent {
    pub(crate) fn get_id(&self) -> String {
        match self {
            DomainEvent::Folder(f) => f.get_id(),
        }
    }
}

#[derive(Clone, Debug)]
pub enum FolderEvent {
    Created { folder: Folder },
    Moved {}, // TODO
}

impl FolderEvent {
    pub(crate) fn get_id(&self) -> String {
        match self {
            FolderEvent::Created { .. } => "FolderCreated".into(),
            FolderEvent::Moved { .. } => "FolderMoved".into(),
        }
    }
}

#[derive(Clone, Debug)]
pub(crate) struct Folder {
    id: FolderId,
    name: FolderName,
    parent_id: Option<FolderId>,
}

impl Folder {
    pub(crate) fn create(
        name: FolderName,
        parent_id: Option<FolderId>,
    ) -> (Self, Vec<DomainEvent>) {
        let folder = Self {
            id: FolderId(generate_uuid_v7()),
            name,
            parent_id,
        };

        (
            folder.clone(),
            vec![DomainEvent::Folder(FolderEvent::Created { folder })],
        )
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

#[derive(Clone, Debug)]
pub(crate) struct FolderId(Uuid);

impl TryFrom<Uuid> for FolderId {
    type Error = ();

    fn try_from(value: Uuid) -> Result<Self, Self::Error> {
        Ok(Self(value))
    }
}

impl Into<Uuid> for FolderId {
    fn into(self) -> Uuid {
        self.0
    }
}

#[derive(Clone, Debug)]
pub(crate) struct FolderName(String);

impl TryFrom<String> for FolderName {
    type Error = ();

    fn try_from(value: String) -> Result<Self, Self::Error> {
        Ok(Self(value))
    }
}

pub(crate) trait FolderCommandRepository {
    async fn find_by_id(&self, id: &FolderId) -> Result<Folder, ()>;
    async fn create(&self, folder: Folder) -> Result<(), ()>;
}
