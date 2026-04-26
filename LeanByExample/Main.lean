import Lean
import Lean.Parser.Term

open Lean Elab Term Meta

structure Actor where
  name: String -- TODO 自動取得

instance : ToString Actor where
  toString a := a.name

-- TODO structure Action

structure Object where
  name: String -- TODO 自動取得

instance : ToString Object where
  toString o := o.name

def ActorAsObject(actor: Actor): Object := { name := actor.name }

/- Element Definition end -/

inductive UseCaseFragment where
  | str(s: String)
  | actor(a: Actor)
  | target(o: Object)

structure UseCase where
  body: Array UseCaseFragment

inductive UseCaseSentence where
  | body(_: UseCase)
  | reference(_: UseCaseSentence)

structure SystemUseCase where
  title: UseCase
  description: Array UseCaseSentence -- TODO index および 名前付き参照

elab:max "uc!" xs:interpolatedStr(term) : term => do
  let parts := xs.raw.getArgs
  let mut items := #[]
  
  for part in parts do
    match Syntax.isInterpolatedStrLit? part with
    | some "" => continue
    | some strLit =>
      items := items.push $ Syntax.mkApp (mkIdent ``UseCaseFragment.str) #[Syntax.mkStrLit strLit]
      continue
    | none => -- noop
    
    match part with
    | .ident _ _ name _ =>
      let typeExpr <- inferType (<- elabTerm part none)
      match typeExpr with
      | .const typeName _ =>
        match typeName.toString with
        | "Actor" => items := items.push $ Syntax.mkApp (mkIdent ``UseCaseFragment.actor) #[mkIdent name]
        | "Object" => items := items.push $ Syntax.mkApp (mkIdent ``UseCaseFragment.target) #[mkIdent name]
        | _ => Elab.throwUnsupportedSyntax
      | _ => Elab.throwUnsupportedSyntax
    | _ => -- noop
    
    match part with
    | `($actor as target) =>
      let inner := Syntax.mkApp (mkIdent ``ActorAsObject) #[actor]
      items := items.push $ Syntax.mkApp (mkIdent ``UseCaseFragment.target) #[inner]
    | _ => Elab.throwUnsupportedSyntax
    
  let listSyntax <- `(#[$items,*])
  let wrap := Syntax.mkApp (mkIdent ``UseCase.mk) #[listSyntax]
  elabTerm wrap none

/- UseCase Definition ends -/

def User: Actor := { name := "User" }

def System: Actor := { name := "System" }
 
inductive ServerFileAttribute(τ) where
  | loading
  | failed
  | loaded(value: τ)
  | userDefined(value: τ)

def ServerFile: Object := { name:= "ServerFile" } -- TODO use ServerFileAttribute

def LocalFile: Object := { name:= "LocalFile" }

-- #check uc!"{User}は画面を開く"
#check uc!"{User}は{LocalFile}をアップロードする"
#check uc!"{System}は{User as target}を削除する "
#check uc!"{System}は{ServerFile}を削除する"
-- #check uc!"{System}は{LocalFile}を最大{5}回チェックする" -- 不要？
#check uc!"管理者はユーザーを削除する"
-- TODO #check uc!"{System}は{ServerFile}を{Delete}する"

/-
def uc1 : SystemUseCase := {
  title := uc!"{User}は{LocalFile}をアップロードする"
  description := #[]
}
-/

def main : IO Unit :=
  IO.println s!"Hello, World!"
