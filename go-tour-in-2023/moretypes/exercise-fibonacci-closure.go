package main

import "fmt"

// fibonacci is a function that returns
// a function that returns an int.
func fibonacci() func() int {
	a0 := 0
	a1 := 1
	return func() (result int) {
		result = a0 + a1

		a0 = a1
		a1 = result

		return
	}
}

func main() {
	f := fibonacci()
	for i := 0; i < 10; i++ {
		fmt.Println(f())
	}
}
