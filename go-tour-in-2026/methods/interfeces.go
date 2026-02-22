package main

import (
	"fmt"
	"math"
)

type Abser interface {
	Abs() float64
}

func main() {
	var a Abser
	f := MyFloat_(-math.Sqrt2)
	v := Vertex_______{3, 4}

	a = f
	a = &v

	//a = v

	fmt.Println(a.Abs())
}

type MyFloat_ float64

func (f MyFloat_) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

type Vertex_______ struct {
	X, Y float64
}

func (v *Vertex_______) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}
