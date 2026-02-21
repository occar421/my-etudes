package main

import (
	"fmt"
	"math"
)

func Sqrt(x float64) float64 {
	z := 1.0
	dz := z*z - x
	for math.Abs(dz) > 0.00000000001 {
		z -= dz / (2 * z)
		fmt.Println(z)
		dz = z*z - x
	}
	return z
}

func main() {
	fmt.Println(Sqrt(2))
}
