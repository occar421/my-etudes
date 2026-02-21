package main

import "fmt"

type Vertex___ struct {
	X, Y int
}

var (
	v1 = Vertex___{1, 2}
	v2 = Vertex___{X: 1}
	v3 = Vertex___{}
	p  = &Vertex___{1, 2}
)

func main() {
	fmt.Println(v1, p, v2, v3)
}
