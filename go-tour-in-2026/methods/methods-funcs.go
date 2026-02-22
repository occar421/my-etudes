package main

import (
	"fmt"
	"math"
)

type Vertex_ struct {
	X, Y float64
}

func Abs(v Vertex_) float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex_{3, 4}
	fmt.Println(Abs(v))
}
