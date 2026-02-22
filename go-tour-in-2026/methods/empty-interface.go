package main

import "fmt"

func main() {
	var i interface{}
	describe___(i)

	i = 42
	describe___(i)

	i = "hello"
	describe___(i)
}

func describe___(i interface{}) {
	fmt.Printf("(%v, %T)\n", i, i)
}
