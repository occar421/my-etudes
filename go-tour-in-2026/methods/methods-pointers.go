package main

import (
	"fmt"
	"math"
)

type Vertex__ struct {
	X, Y float64
}

func (v Vertex__) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func (v *Vertex__) Scale(f float64) {
	v.X *= f
	v.Y *= f
}

func main() {
	v := Vertex__{3, 4}
	v.Scale(10)
	fmt.Println(v.Abs())
}
