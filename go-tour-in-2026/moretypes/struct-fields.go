package main

import "fmt"

type Vertex_ struct {
	X int
	Y int
}

func main() {
	v := Vertex_{}
	v.X = 4
	fmt.Println(v.X)
}
