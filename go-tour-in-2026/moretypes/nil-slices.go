package main

import "fmt"

func main() {
	var s []int
	fmt.Println(s, len(s), cap(s))
	//goland:noinspection GoDfaConstantCondition
	if s == nil {
		fmt.Println("nil!")
	}
}
