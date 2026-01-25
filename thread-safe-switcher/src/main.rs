use std::fmt::{Display, Formatter};
use std::rc::Rc;
use std::sync::Arc;

fn main() {
    test::<ThreadUnsafeResolver>();
}

trait ReferenceCountSwitcher {
    type Wrap<T>: ReferenceCountWrap<T>;

    fn new<T>(value: T) -> Self::Wrap<T>;
}

// impl<T: Display> Display for dyn ReferenceCountSwitcher<Wrap<T> = ThreadUnsafeRcw<T>> {
//     fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
//         todo!()
//     }
// }

// impl<T: Display> Display for ReferenceCountSwitcher::Wrap<T> {
//     fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
//         todo!()
//     }
// }

// impl<T: Display> Display for impl ReferenceCountSwitcher::Result<T> {
//     fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
//         todo!()
//     }
// }

trait ReferenceCountWrap<Inner> {}

// impl<Inner, T: Display> ReferenceCountWrap<Inner> for T {}

// impl<Inner> ReferenceCountWrap<Inner> {
//     fn new(inner: Inner) -> Self {
//         Self { inner }
//     }
// }

// impl<Inner: Display> Display for dyn ReferenceCountWrap<Inner> {
//     fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
//         todo!()
//     }
// }

impl<Inner: Display> Display for dyn ReferenceCountWrap<Inner> {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        todo!()
    }
}

struct ThreadUnsafeResolver;

struct ThreadUnsafeRcw<T> {
    inner: Rc<T>,
}

impl<T> ReferenceCountWrap<T> for ThreadUnsafeRcw<T> {}

impl ReferenceCountSwitcher for ThreadUnsafeResolver {
    type Wrap<T> = ThreadUnsafeRcw<T>;

    // fn new<T>(value: T) -> ReferenceCountWrap<Self::Result<T>> {
    //     ReferenceCountWrap::new(Rc::new(value))
    // }

    fn new<T>(value: T) -> Self::Wrap<T> {
        ThreadUnsafeRcw {
            inner: Rc::new(value),
        }
    }
}

// impl<T: Display> Display for ThreadUnsafeRcw<T>
// where
//     Rc<T>: Display,
// {
//     fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
//         todo!()
//     }
// }

// impl<T: Display> Display for <ThreadUnsafeResolver as ReferenceCountSwitcher>::Wrap<T> {
//     fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
//         todo!()
//     }
// }

// impl<T: Display> Display for <ThreadUnsafeResolver as ReferenceCountSwitcher>::Result<T> {
//     fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
//         write!(f, "{}", self.as_ref())
//     }
// }

fn test<Rcs: ReferenceCountSwitcher>() {
    let value = Rcs::new(1);

    println!("{}", value);

    let value2 = ThreadUnsafeResolver::new(1);

    println!("{}", value2);
}
