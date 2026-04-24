open util/integer

sig State {
  count: Int,
  next: lone State,
}

pred Next[s1, s2: State] {
  s2.count = add[s1.count, 1]
  s1.next = s2
}

fact StateConstraints {
  all s: State {
    s.count >= 0
    s !in s.^next
    all s2: State | Next[s, s2]
  }

  one start: State {
    start.count = 0
    no s2: State | start in s2.next
    // no s3: State - start, s4: State | s3 !in s4.next
  }
  
  one s: State | no s2: State | s2 in s.next

//  one start: State {
//    start.count = 0
//    no s2: State | s2 !in start.^next
//  }

//  one start: State {
//    start.count = 0
//    no s2: State | start in s2.next
//    State in start.*next
//  }
}

//assert Two {
//  #State >= 2 => some s: State | s.count = 1
//}
//
//check Two for 4

run {
  #State >=1
} for 16 but 3 int
