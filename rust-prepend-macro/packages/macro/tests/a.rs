mod core {
    use prepend_macro::my_attribute;

    // #[derive(Eq, PartialEq)]
    #[my_attribute]
    pub struct MyStruct {
        pub hoge: u8,
        pub fuga: u8,
    }

    //
    // impl MyStruct {
    //     pub fn foo(&self) {}
    // }
    //
    // fn core_logic() {
    //     let _ = MyStruct {};
    // }
    pub fn core_logic() {
        // let a = MyStruct {};
        // a.dump();
        // println!("{:?}", __hoge__::MyStruct);
    }
}

mod wrap {
    use prepend_macro::my_macro;
    use super::core::MyStruct;
    use prepend_struct::Dual;

    my_macro!(MyStruct, [PartialEq, Eq, Copy, Clone]);

    // #[derive(Eq, PartialEq)]
    // struct MyStruct8 {
    //     pub hoge: u8,
    //     pub fuga: u8,
    // }
    //
    // impl Into<MyStruct8> for MyStruct {
    //     fn into(self) -> MyStruct8 {
    //         MyStruct8 { hoge: self.hoge, fuga: self.fuga }
    //     }
    // }
    //
    // impl Into<MyStruct> for MyStruct8 {
    //     fn into(self) -> MyStruct {
    //         MyStruct { hoge: self.hoge, fuga: self.fuga }
    //     }
    // }
    //
    // impl Dual<MyStruct> for MyStruct8 {
    //     fn turn(self) -> MyStruct {
    //         self.into()
    //     }
    // }
    //
    // impl Dual<MyStruct8> for MyStruct {
    //     fn turn(self) -> MyStruct8 {
    //         self.into()
    //     }
    // }


    // impl From<MyStruct> for MyStruct8 {
    //     fn from(target: MyStruct) -> Self {
    //         MyStruct8 { hoge: target.hoge, fuga: target.fuga, __phantom: PhantomData }
    //     }
    // }
    //
    // impl From<MyStruct8> for MyStruct {
    //     fn from(target: MyStruct8) -> Self {
    //         MyStruct { hoge: target.hoge, fuga: target.fuga }
    //     }
    // }
    // impl<'a> Deref for MyStruct8<'a> {
    //     type Target = MyStruct;
    //
    //     fn deref(&self) -> &Self::Target {
    //         unimplemented!();
    //     }
    // }
    //
    // impl<'a> AsRef<MyStruct> for MyStruct8<'a> {
    //     fn as_ref(&self) -> &MyStruct {
    //         unimplemented!();
    //     }
    // }

    #[test]
    fn test() {
        super::core::core_logic();
        let a = MyStruct { fuga: 0, hoge: 1 }.flip();
        let b = a == a;
        // a.into() == a.into();

        // prepend_struct::dump();
    }
    // use prepend_poc::my_macro;
    // use super::core::MyStruct;
    // use std::cell::Ref;
    // use std::ops::Deref;
    //
    // // my_macro!(MyStruct, [Eq]);
    //
    // // impl Debug for MyStruct {
    // //     fn fmt(&self, f: &mut Formatter<'_>) -> Result {
    // //         unimplemented!()
    // //     }
    // // }
    //
    // #[derive(Copy, Clone)]
    // struct __MyStruct__<'a>(&'a MyStruct);
    //
    // // impl<'a> From<&'a MyStruct> for __MyStruct__<'a> {
    // //     fn from(target: &'a MyStruct) -> Self {
    // //         __MyStruct__(target)
    // //     }
    // // }
    //
    // impl<'a> Into<__MyStruct__<'a>> for MyStruct {
    //     fn into(self) -> __MyStruct__<'a> {
    //         unimplemented!()
    //     }
    // }
    //
    // impl<'a> Deref for __MyStruct__<'a> {
    //     type Target = MyStruct;
    //
    //     fn deref(&self) -> &Self::Target {
    //         &self.0
    //     }
    // }
    //
    // impl<'a> AsRef<__MyStruct__<'a>> for MyStruct {
    //     fn as_ref(&self) -> &__MyStruct__<'a> {
    //         unimplemented!()
    //     }
    // }
    //
    // #[test]
    // fn main() {
    //     // let var = MyStruct {};
    //     // var.foo();
    //     // // let a: __MyStruct__ = var.into();
    //     // // a.clone();
    //     // // a.foo();
    //     // let b = var.as_ref().clone();
    //     // b.clone();
    //     // b.foo();
    //     // var.foo();
    //     // let c = var == var;
    //     // let c = b == b;
    //     // a.clone();
    //     // let var = __MyStruct__ {};
    //     // println!("{:?}", var);
    //     // assert_eq!(var, var);
    // }
}
