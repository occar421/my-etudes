package main

import "fmt"

func add_(x, y int) int {
	return x + y
}

func main() {
	fmt.Println(add_(42, 13))
}
