use crate::folders::model::FolderId;

pub(crate) async fn exec() -> Result<Content, ()> {
    let folder_id = FolderId(unimplemented!()); // TODO get from repository

    // TODO insert new folder in DB

    Ok(Content { id: folder_id })
}

pub(crate) struct Content {
    pub(crate) id: FolderId,
}
