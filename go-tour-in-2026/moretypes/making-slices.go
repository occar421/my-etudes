package main

import "fmt"

func main() {
	a := make([]int, 5)
	printSlice_("a", a)

	b := make([]int, 0, 5)
	printSlice_("b", b)

	c := b[:2]
	printSlice_("c", c)

	d := c[2:5]
	printSlice_("d", d)
}

func printSlice_(s string, x []int) {
	fmt.Printf("%s len=%d cap=%d %v\n", s, len(x), cap(x), x)
}
