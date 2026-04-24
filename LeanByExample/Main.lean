structure Actor

-- structure Action

structure Object

structure UseCaseAtom where
  actor: Actor
  -- action: Action -- TODO ここは個別の関数になるかもしれない？ユビキタス言語の可能性も？
  object: Object

structure UseCase where
  title: UseCaseAtom
  description: Array UseCaseAtom

-- Definition ends

structure User extends Actor

instance : Coe User Actor where
  coe _ := {}

structure System extends Actor
 
inductive FileAttribute(τ) where
  | loading
  | failed
  | loaded(value: τ)
  | userDefined(value: τ)

structure File extends Object where
  content: FileAttribute String

def uc1 : UseCase := {
  title := {actor := User, object := Object},
  description := #[]
}

def main : IO Unit :=
  IO.println s!"Hello, World!"
