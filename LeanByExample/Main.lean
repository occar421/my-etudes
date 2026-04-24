import Lean

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

syntax:max "uc!" interpolatedStr(term) : term

-- 3. マクロによる展開ルールの定義
macro_rules
  | `(uc! $interpStr) => do
    let parts := interpStr.raw.getArgs
    let mut items := #[]
    
    for part in parts do
      -- if part.isStrLit? then
        items := items.push (← `(TemplateItem.str part))
      -- else
        items := items.push (← `(TemplateItem.str part))
    
    `( $(quote items[0]!) )
    -- let a := 12
    -- `( $(quote a) )
    -- `(11)
    -- interpStr.expandInterpolatedStr (← `(String)) (← `(toString))

#check uc!"{User}は{LocalFile}をアップロードする"
#eval uc!"{System}は{ServerFile}を削除する"

def uc1 : UseCase := {
  title := {actor := User, object := ServerFile},
  description := #[]
}

def main : IO Unit :=
  IO.println s!"Hello, World!"
