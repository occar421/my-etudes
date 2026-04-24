sig Person {
  friends: set Person
}

fact BasicConstraints {
  all x: Person | {
    x !in x.friends
  }
  friends = ~friends
}

run {
  some p: Person | #p.friends = 0
  some p: Person | #p.friends >= 2
  #friends >= 8
  #Person >= 8
} for 10 but 8 int
