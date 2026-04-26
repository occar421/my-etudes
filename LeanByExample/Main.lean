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
    -- dbg_trace part
    match Syntax.isInterpolatedStrLit? part with
    | some "" => continue
    | some strLit => items := items.push (<- `( $(Lean.Quote.quote strLit) )); continue
    | none => dbg_trace "not interpolatedStrLit"
    
    dbg_trace ""
    
    -- match part with
    -- | `(interpolatedStrLitKind $a) => dbg_trace a
    -- | _ => dbg_trace "not interpolatedStrLitKind"
    -- dbg_trace ""
 
/-     match part with
    | .node _ k a =>
      match k with
      | .str _ "interpolatedStrLitKind" =>
        let a0 := a[0]!
        let lit <- `(a0) -- Type mismatch `a0 has type Name but is expected to have type TermElabM ?m.53 Lean 
        -- let lit <- `(a0) -- Unknown identifier `a0✝`
        -- let lit <- `("a") -- OK but not intended(fixed value)
        items := items.push (<- `(TemplateItem.str $lit)) 
      | _ => Elab.throwUnsupportedSyntax
    | .ident _ _ n _ =>
      dbg_trace part
      items := items.push (<- `(TemplateItem.str "b"))
    | _ => Elab.throwUnsupportedSyntax -/
    

  
  let listExpr <- `([$items,*])
  -- let listExpr <- `([])
  elabTerm listExpr none -- TODO Fix expected type (last arg)
  -- return `( $(quote parts[0]!) )

-- macro_rules
   --  | `(uc! $interpStr) => do
   --    let parts := interpStr.raw.getArgs
   --    let mut items := #[]
   --    
   --    for part in parts do
   --      -- if part.isStrLit? then
   --        items := items.push (← `(TemplateItem.str part))
   --      -- else
   --        items := items.push (← `(TemplateItem.str part))
   --    
   --    `( $(quote items[0]!) )
   --    -- let a := 12
   --    -- `( $(quote a) )
   --    -- `(11)
   --    -- interpStr.expandInterpolatedStr (← `(String)) (← `(toString))

#check uc!"{User}は{LocalFile}をアップロードする"
-- #check uc!"{System}は{ServerFile}を削除する"
-- #check uc!"管理者はユーザーを削除する"

def uc1 : UseCase := {
  title := {actor := User, object := ServerFile},
  description := #[]
}

def main : IO Unit :=
  IO.println s!"Hello, World!"
