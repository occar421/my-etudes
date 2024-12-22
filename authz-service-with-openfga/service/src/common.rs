use std::time::{SystemTime, UNIX_EPOCH};
use uuid::{NoContext, Timestamp, Uuid};

pub(crate) fn generate_uuid_v7() -> Uuid {
    let duration = SystemTime::now().duration_since(UNIX_EPOCH).unwrap();

    Uuid::new_v7(Timestamp::from_unix(
        NoContext,
        duration.as_secs(),
        duration.subsec_nanos(),
    ))
}
