import Lean
import Lean.Parser.Term

open Lean Elab Term Meta

structure Actor where
  name: String -- TODO 自動取得

instance : ToString Actor where
  toString a := a.name

-- structure Action

structure Object where
  name: String -- TODO 自動取得

instance : ToString Object where
  toString o := o.name

structure UseCaseAtom where
  actor: Actor
  -- action: Action -- TODO ここは個別の関数になるかもしれない？ユビキタス言語の可能性も？
  object: Object

inductive UseCaseSentence where
  | atom(_: UseCaseAtom)
  | invoke(_: UseCaseSentence)

structure UseCase where
  title: UseCaseAtom
  description: Array UseCaseSentence -- TODO index および 名前付き参照

-- Definition ends

def User: Actor := { name := "User" }

def System: Actor := { name := "System" }
 
inductive ServerFileAttribute(τ) where
  | loading
  | failed
  | loaded(value: τ)
  | userDefined(value: τ)

def ServerFile: Object := { name:= "ServerFile" } -- TODO use ServerFileAttribute

def LocalFile: Object := { name:= "LocalFile" }

inductive TemplateItem where
  | str(s: String)
  | actor(a: Actor)
  | object(o: Object)

elab:max "uc!" xs:interpolatedStr(term) : term => do
  let parts := xs.raw.getArgs
  let mut items := #[]
  
  for part in parts do
    match Syntax.isInterpolatedStrLit? part with
    | some "" => continue
    | some strLit =>
      items := items.push $ Syntax.mkApp (mkIdent ``TemplateItem.str) #[Syntax.mkStrLit strLit]
      continue
    | none => -- noop
    
    match part with
    | .ident _ _ name _ =>
      items := items.push $ Syntax.mkApp (mkIdent ``TemplateItem.actor) #[mkIdent name]
      continue
    | _ => -- noop
    
    dbg_trace part
    
    dbg_trace ""

  let listSyntax <- `([$items,*])
  elabTerm listSyntax none -- TODO Fix expected type (last arg), TODO native Expr

#check uc!"{User}は画面を開く"
-- #check uc!"{User}は{LocalFile}をアップロードする"
-- #check uc!"{System}は{ServerFile}を削除する"
-- #check uc!"{System}は{LocalFile}を最大{5}回チェックする"
-- #check uc!"管理者はユーザーを削除する"

def uc1 : UseCase := {
  title := {actor := User, object := ServerFile},
  description := #[]
}

def main : IO Unit :=
  IO.println s!"Hello, World!"
