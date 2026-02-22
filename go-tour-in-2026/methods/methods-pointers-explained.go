package main

import (
	"fmt"
	"math"
)

type Vertex___ struct {
	X, Y float64
}

func Abs_(v Vertex___) float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func Scale_(v *Vertex___, f float64) {
	v.X *= f
	v.Y *= f
}

func main() {
	v := Vertex___{3, 4}
	Scale_(&v, 10)
	fmt.Println(Abs_(v))
}
