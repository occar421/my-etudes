package main

import "fmt"

type Vertex____ struct {
	X, Y float64
}

func (v *Vertex____) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func ScaleFunc(v *Vertex____, f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
	v := Vertex____{3, 4}
	v.Scale(2)
	ScaleFunc(&v, 10)

	p := &Vertex____{4, 3}
	p.Scale(3)
	ScaleFunc(p, 8)

	fmt.Println(v, p)
}
