structure Actor

-- structure Action

structure Object

structure UseCaseAtom where
  actor: Actor
  -- action: Action -- TODO ここは個別の関数になるかもしれない？ユビキタス言語の可能性も？
  object: Object

inductive UseCaseSentence where
  | atom(_: UseCaseAtom)
  | invoke(_: UseCaseSentence)

structure UseCase where
  title: UseCaseAtom
  description: Array UseCaseSentence

-- Definition ends

def User: Actor := Actor.mk

def System: Actor := Actor.mk
 
inductive FileAttribute(τ) where
  | loading
  | failed
  | loaded(value: τ)
  | userDefined(value: τ)

def File: Object := Object.mk

def uc1 : UseCase := {
  title := {actor := User, object := File},
  description := #[]
}

def main : IO Unit :=
  IO.println s!"Hello, World!"
