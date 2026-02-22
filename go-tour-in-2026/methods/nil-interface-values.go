package main

import "fmt"

type I___ interface {
	M()
}

func main() {
	var i I___
	describe__(i)
	i.M()
}

func describe__(i I___) {
	fmt.Printf("(%v, %T)\n", i, i)
}
