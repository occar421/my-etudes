use crate::folders::model::FolderId;

pub(crate) async fn exec(parent_folder_id: FolderId) -> Result<Content, ()> {
    // TODO check if parent DB record exists

    let folder_id = FolderId(unimplemented!()); // TODO get from repository

    // TODO insert new folder in DB

    // TODO add OpenFGA relation

    Ok(Content { id: folder_id })
}

pub(crate) struct Content {
    pub(crate) id: FolderId,
}
