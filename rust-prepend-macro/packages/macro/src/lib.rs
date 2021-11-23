extern crate proc_macro;

use proc_macro::TokenStream;

use syn::{parse_macro_input, Ident, ExprArray, Path, Type};
use quote::{quote, ToTokens};
use syn::parse::{Parse, ParseStream};
use syn::export::{Span, TokenStream2};
use prepend_struct::{AttributeInput, ItemStruct};
use std::collections::HashMap;
use std::any::TypeId;


struct MacroInput {
    target: Path,
    derives: Vec<Path>,
}

impl Parse for MacroInput {
    fn parse(input: ParseStream) -> syn::Result<Self> {
        let target: Path = input.parse()?;

        input.parse::<syn::Token![,]>()?;

        let derives: ExprArray = input.parse()?;

        let mut v = vec![];

        for e in derives.elems.iter() {
            if let syn::Expr::Path(path) = e {
                v.push(path.clone().path);
            } else { panic!("") }
        }

        Ok(MacroInput {
            target,
            derives: v,
        })
    }
}

// static ref TYPE_TABLE: HashMap<TypeId, u8> = {
// let mut m = HashMap::new();
// // m.insert(TypeId::of::<u8>(), )
// m
// };

struct RenderPair<'a>(&'a String, &'a Type);

impl<'a> quote::ToTokens for RenderPair<'a> {
    fn to_tokens(&self, tokens: &mut TokenStream2) {
        let ident = Ident::new(self.0, Span::call_site());
        let ty = self.1;
        tokens.extend(quote! {
            #ident: #ty
        })
    }
}

#[proc_macro]
pub fn my_macro(input: TokenStream) -> TokenStream {
    let MacroInput { target, derives } = parse_macro_input!(input as MacroInput);

    let serialized_target_name = target.segments.iter().map(|e| e.ident.to_string()).collect::<Vec<_>>().join("__");
    let quasi_target = Ident::new(&format!("__{}__", serialized_target_name), Span::call_site());

    let ident = target.segments.iter().last().map(|e| e.ident.to_string()).unwrap();

    let data = prepend_struct::get(&ident);

    let map = {
        let a = quote::quote! {
            struct __A__ {
                a: u8,
                b: u16,
            }
        }.into();

        let a = parse_macro_input!(a as ItemStruct);

        let u8_type = a.fields[0].clone().ty;
        let u16_type = a.fields[1].clone().ty;

        let mut m = HashMap::new();
        m.insert(TypeId::of::<u8>(), u8_type);
        m.insert(TypeId::of::<u16>(), u16_type);
        m
    };

    panic!(format!("{:?} | {:?} | {:?}", data, map.keys(), TypeId::of::<u8>()));

    let b = data.iter().map(|(name, type_id)| RenderPair(name, map.get(type_id).unwrap()));

    let c: Vec<_> = b.collect();

    let tokens = quote! {
        #[derive(#(#derives),*)]
        pub struct #quasi_target {
            #(pub #c),*
        }

        impl Into<#quasi_target> for #target {
            fn into(self) -> #quasi_target {
                #quasi_target { hoge: self.hoge, fuga: self.fuga }
            }
        }

        impl Into<#target> for #quasi_target {
            fn into(self) -> #target {
                #target { hoge: self.hoge, fuga: self.fuga }
            }
        }

        impl Dual<#target> for #quasi_target {
            fn flip(self) -> #target {
                self.into()
            }
        }

        impl Dual<#quasi_target> for #target {
            fn flip(self) -> #quasi_target {
                self.into()
            }
        }
    };

    tokens.into()
}

#[proc_macro_attribute]
pub fn my_attribute(_args: proc_macro::TokenStream, original_input: proc_macro::TokenStream) -> proc_macro::TokenStream {
    let input = original_input.clone();
    let input = parse_macro_input!(input as AttributeInput);

    prepend_struct::register(&input);

    original_input
}