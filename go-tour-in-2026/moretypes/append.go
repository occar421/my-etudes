package main

import "fmt"

func main() {
	var s []int
	printSlice__(s)

	s = append(s, 0)
	printSlice__(s)

	s = append(s, 1)
	printSlice__(s)

	s = append(s, 2, 3, 4)
	printSlice__(s)
}

func printSlice__(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
