package main

import "fmt"

type Vertex__ struct {
	X int
	Y int
}

func main() {
	v := Vertex__{1, 2}
	p := &v
	p.X = 1e9
	fmt.Println(v)
}
