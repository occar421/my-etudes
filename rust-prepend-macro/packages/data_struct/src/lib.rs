use lazy_static::lazy_static;

use syn::{Ident, Field, Type};
use syn::parse::{Parse, ParseStream};
use syn::punctuated::Punctuated;
use std::sync::RwLock;
use std::any::{TypeId, Any};

pub enum AttributeInput {
    Struct(ItemStruct)
}

pub struct ItemStruct {
    pub struct_token: syn::Token![struct],
    pub ident: Ident,
    pub brace_token: syn::token::Brace,
    pub fields: Punctuated<Field, syn::Token![,]>,
}

impl Parse for AttributeInput {
    fn parse(input: ParseStream) -> syn::Result<Self> {
        input.parse::<syn::Token![pub]>()?;
        let lookahead = input.lookahead1();
        if lookahead.peek(syn::Token![struct]) {
            input.parse().map(AttributeInput::Struct)
        } else {
            Err(lookahead.error())
        }
    }
}

impl Parse for ItemStruct {
    fn parse(input: ParseStream) -> syn::Result<Self> {
        let content;
        Ok(ItemStruct {
            struct_token: input.parse()?,
            ident: input.parse()?,
            brace_token: syn::braced!(content in input),
            fields: content.parse_terminated(Field::parse_named)?,
        })
    }
}


pub trait Trait {
    fn dump(&self);
}

#[derive(Debug)]
pub struct Struct;

#[derive(Debug)]
struct MapItem {
    ident: (String, String),
    fields: Vec<(String, TypeId)>,
}

pub trait Dual<T> {
    fn flip(self) -> T;
}

// static mut MAP: Option<HashMap<u8, Struct>> = None;

lazy_static! {
    static ref VEC: RwLock<Vec<MapItem>> = RwLock::new(Vec::new());
}

pub fn register(input: &AttributeInput) {
    {
        let mut vec = VEC.try_write().unwrap();
        match input {
            AttributeInput::Struct(s) => {
                vec.push(MapItem {
                    ident: (s.ident.to_string(), format!("{:?}", s.ident.span())),
                    fields: s.fields.iter().map(|a| (a.ident.as_ref().unwrap().to_string(), a.ty.clone())).collect(),
                    // TODO a.ty で match して 完全文字列化 or 構造抽出 する
                });
            }
        }
    }
    // let vec = VEC.try_read();
    // panic!(format!("{:?}", vec));
}

pub fn dump() {
    panic!(format!("{:?}", VEC.try_read()));
}

pub fn get(name: &str) -> Vec<(String, TypeId)> {
    VEC.try_read().unwrap().iter()
        .find(|i| i.ident.0 == name)
        // .map(|i| i.fields.iter().map(|(name, _)| (name.clone(), u8_type)))
        .map(|i| i.fields.iter().map(|f| f.clone()))
        .unwrap()
        .collect()
}