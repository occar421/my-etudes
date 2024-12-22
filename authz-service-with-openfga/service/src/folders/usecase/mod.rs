use crate::folders::model::DomainEvent;
use std::collections::HashMap;

pub(crate) mod create_folder;

pub(crate) struct DomainEventHandler {
    target_id: String,
    f: fn(&DomainEvent),
}

impl DomainEventHandler {
    pub(crate) fn new(target_id: String, handler: fn(&DomainEvent)) -> Self {
        Self {
            target_id,
            f: handler,
        }
    }
    fn target_id(&self) -> String {
        self.target_id.clone()
    }
    fn handle(&self, event: &DomainEvent) {
        (self.f)(event)
    }
}

pub(crate) struct DomainEventPublisher {
    handlers: HashMap<String, Vec<DomainEventHandler>>,
}

impl DomainEventPublisher {
    pub(crate) fn new() -> Self {
        Self {
            handlers: HashMap::new(),
        }
    }

    pub(crate) fn subscribe(&mut self, handler: DomainEventHandler) {
        self.handlers
            .entry(handler.target_id())
            .or_default()
            .push(handler);
    }

    pub(crate) fn publish(&self, events: &[DomainEvent]) {
        events.iter().for_each(|event| {
            self.handlers.get(&event.get_id()).map(|handlers| {
                handlers.iter().for_each(|handler| {
                    handler.handle(&event);
                })
            });
        })
    }
}
