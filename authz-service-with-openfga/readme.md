# AuthZ Service with OpenFGA

## Spec

Assuming its like Google services.

### Entities

* (nested) Folder
* Document (with versions)
* Project
* User
* (nested) Team

```mermaid
classDiagram
    class Folder
    class Document
    class Project
    class User
    class Team
    Folder --o Folder
    Folder --o Document
    Folder --o Project
    Team --o Team
    Team --o User
```
