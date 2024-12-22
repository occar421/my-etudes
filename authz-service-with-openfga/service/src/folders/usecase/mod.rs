use crate::folders::model::DomainEvent;
use std::collections::HashMap;

pub(crate) mod create_folder;

trait DomainEventHandler {
    fn target_id(&self) -> String;
    fn handle(&self, event: &DomainEvent);
}

pub(crate) struct DomainEventPublisher {
    handlers: HashMap<String, Vec<Box<dyn DomainEventHandler>>>,
}

impl DomainEventPublisher {
    pub(crate) fn new() -> Self {
        Self {
            handlers: HashMap::new(),
        }
    }

    fn subscribe(&mut self, handler: Box<dyn DomainEventHandler>) {
        self.handlers
            .entry(handler.target_id())
            .or_default()
            .push(handler);
    }

    fn publish(&self, events: &[DomainEvent]) {
        events.iter().for_each(|event| {
            self.handlers.get(&event.get_id()).map(|handlers| {
                handlers.iter().for_each(|handler| {
                    handler.handle(&event);
                })
            });
        })
    }
}
