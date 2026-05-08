import Lean

open Lean

abbrev GherkinFeature := String

initialize featureExt : SimplePersistentEnvExtension GherkinFeature (Array GherkinFeature) <-
  registerSimplePersistentEnvExtension {
     name := `featureExt
     addEntryFn := fun features feature => features.push feature
     addImportedFn := fun imported => imported.foldl (· ++ ·) #[]
   }

def addFeature (env : Environment) (feature : GherkinFeature) : Environment :=
  featureExt.addEntry env feature

def getFeatures (env : Environment) : Array GherkinFeature :=
  featureExt.getState env
