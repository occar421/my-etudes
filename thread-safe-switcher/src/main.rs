use std::fmt::{Display, Formatter};
use std::rc::Rc;
use std::sync::Arc;

fn main() {
    test::<ThreadUnsafeResolver>();
}

trait ReferenceCountSwitcher {
    type Result<T: Display>;

    fn new<T: Display>(value: T) -> ReferenceCountWrap<Self::Result<T>>;
}

// impl<T: Display> Display for impl ReferenceCountSwitcher::Result<T> {
//     fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
//         todo!()
//     }
// }

struct ReferenceCountWrap<Inner> {
    inner: Inner,
}

impl<Inner> ReferenceCountWrap<Inner> {
    fn new(inner: Inner) -> Self {
        Self { inner }
    }
}

impl<Inner: Display> Display for ReferenceCountWrap<Inner> {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        self.inner.fmt(f)
    }
}

struct ThreadUnsafeResolver;

impl ReferenceCountSwitcher for ThreadUnsafeResolver {
    type Result<T: Display> = Rc<T>;

    fn new<T: Display>(value: T) -> ReferenceCountWrap<Self::Result<T>> {
        ReferenceCountWrap::new(Rc::new(value))
    }
}

// impl<T: Display> Display for <ThreadUnsafeResolver as ReferenceCountSwitcher>::Result<T> {
//     fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
//         write!(f, "{}", self.as_ref())
//     }
// }

fn test<Rcs: ReferenceCountSwitcher>() {
    let value = Rcs::new(1);

    println!("{}", value);
}
