import Lean
import Lean.Parser.Term
import EnvExt.EnvExt

open Lean Elab Term Meta Command Parser PrettyPrinter

structure Actor where
  name: String -- TODO 自動取得
  -- TODO attribute: α

instance : ToString Actor where
  toString a := a.name

-- TODO structure Action

structure Object where
  name: String -- TODO 自動取得
  -- TODO attribute: α

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

def UseCase.toReadableString(uc:UseCase): String :=
  uc.body.foldl (init := "") (fun acc f => acc ++ match f with | .str s => s | .actor a => a.name | .target o => o.name)

inductive UseCaseSentence where
  | body(_: UseCase)
  | reference(_: UseCaseSentence)

structure SystemUseCase where
  title: UseCase
  description: Array UseCaseSentence -- TODO index および 名前付き参照, 詳細分岐記法

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
#check uc!"{System}は{User as target}を削除する"
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

/- TODO 以下の実現
description: description!
  uc!"{System}は{ServerFile}を{Display}する" where
    Display ServerFile with -- これが無いとコンパイルエラー（todo/wip/tbd/sorry/noop は可能） （外部参照や切り出して書くことも可能にしたい）
    | loading => `"Loading" と表示する`
    | loaded _ => "値を表示する"
    | _ => noop
    Sort ServerFile with
    | _ => -- 略
    -- ( Actor x Action x Target)
  uc!"~~~"

-- trailing comma は勝手にできるかもしれないが…
-/

def rawTextUntilLineEnd : Parser := 
  { fn := fun c s =>
      let startPos := s.pos
      -- 改行に当たるまで位置を進める
      let s := takeUntilFn (fun c => c == '\n') c s
      let str := startPos.extract c.inputString s.pos
      -- 抽出した文字列を「アトム」としてスタックに積む
      s.pushSyntax (Syntax.atom SourceInfo.none str)
  }

@[combinator_formatter rawTextUntilLineEnd]
def rawTextUntilLineEnd.formatter : Formatter := Formatter.visitAtom Name.anonymous

@[combinator_parenthesizer rawTextUntilLineEnd]
def rawTextUntilLineEnd.parenthesizer : Parenthesizer := Parenthesizer.visitToken

elab "Feature:" txt:rawTextUntilLineEnd : command => do
  let str := txt.raw.getAtomVal -- .trim
  modifyEnv fun env => addFeature env str

Feature: あいうえお
Feature: 1 + 2 = 3

-- 外部ファイルを読み込んで実行するコマンドの例
syntax (name := loadLean) "load_gherkin_files " str : command

@[command_elab loadLean]
def elabLoadLean : CommandElab := fun stx => do
  let `(command| load_gherkin_files $pathStx) := stx | throwUnsupportedSyntax
  let path := pathStx.getString
  let paths ← liftIO <| do
    let path := System.FilePath.mk path
    if ← path.isDir then
      let entries ← path.readDir
      pure <| entries.filterMap fun entry =>
        let p := entry.path
        if p.extension == some "feature" then some p else none
    else
      pure #[path]
  for path in paths do
    let content ← liftIO <| IO.FS.readFile path
    let env ← getEnv
    match Parser.runParserCategory env `command content with
    | Except.ok stx => elabCommand stx
    | Except.error err => throwError (m!"Error in {path}: {err}")

syntax (name := printFeatures) "#print_features" : command

@[command_elab printFeatures]
def elabPrintFeatures : CommandElab := fun _ => do
  let features := getFeatures (← getEnv)
  if features.isEmpty then
    logInfo "no registered features"
  else
    logInfo <| String.intercalate "\n\n" features.toList

-- 使い方 (my_script.txt の中身が Lean コードであれば実行される)
load_gherkin_files "./features"

def main : IO Unit := do
  IO.println s!"Hello, World!"
  IO.println uc!"{System}は{User as target}を削除する".toReadableString

#print_features
