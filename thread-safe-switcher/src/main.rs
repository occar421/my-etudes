use std::fmt::{Display, Formatter};
use std::rc::Rc;
use std::sync::Arc;

fn main() {
    test::<RcResolver<usize>>();
    test::<ArcResolver<usize>>();
}

trait RcSwitcher<T: ?Sized>: Display {
    fn new(value: T) -> Self where T: Sized;
}

struct RcResolver<T: ?Sized>(Rc<T>);

impl<T: ?Sized + Display> Display for RcResolver<T> {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        self.0.fmt(f)
    }
}

impl<T: Display> RcSwitcher<T> for RcResolver<T> {
    fn new(value: T) -> Self {
        RcResolver(Rc::new(value))
    }
}

struct ArcResolver<T: ?Sized>(Arc<T>);

impl<T: ?Sized + Display> Display for ArcResolver<T> {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        self.0.fmt(f)
    }
}

impl<T: Display> RcSwitcher<T> for ArcResolver<T> {
    fn new(value: T) -> Self {
        ArcResolver(Arc::new(value))
    }
}

fn test<Rcs: RcSwitcher<usize>>() {
    let value = Rcs::new(1);

    println!("{}", value);
}
