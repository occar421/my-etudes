use crate::folders::model::DomainEvent;
use std::any::Any;
use std::any::TypeId;
use std::collections::HashMap;

pub(crate) mod create_folder;

trait DomainEventHandler<T: DomainEvent + 'static> {
    // const TYPE_ID: TypeId = TypeId::of::<T>(); unstable with const
    fn type_id(&self) -> TypeId {
        TypeId::of::<T>()
    }
    fn handle(&self, event: &T);
}

struct DomainEventPublisher {
    handlers: HashMap<TypeId, Vec<Box<dyn DomainEventHandler<dyn DomainEvent>>>>,
}

impl DomainEventPublisher {
    fn new() -> Self {
        Self {
            handlers: HashMap::new(),
        }
    }

    fn subscribe(&mut self, handler: Box<dyn DomainEventHandler<dyn DomainEvent>>) {
        self.handlers
            .entry(handler.type_id())
            .or_default()
            .push(handler);
    }

    fn publish(&self, events: &[Box<dyn DomainEvent>]) {
        events.iter().for_each(|event| {
            self.handlers.get(&self.type_id()).map(|handlers| {
                handlers.iter().for_each(|handler| {
                    handler.handle(event.clone());
                })
            });
        })
    }
}
