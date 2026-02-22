package main

import (
	"fmt"
	"math"
)

type Vertex_____ struct {
	X, Y float64
}

func (v Vertex_____) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func AbsFunc(v Vertex_____) float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex_____{3, 4}
	fmt.Println(v.Abs())
	fmt.Println(AbsFunc(v))

	p := &Vertex_____{4, 3}
	fmt.Println(p.Abs())
	fmt.Println(AbsFunc(*p))
}
