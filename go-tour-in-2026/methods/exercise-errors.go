package main

import (
	"fmt"
	"math"
)

func Sqrt(x float64) (float64, error) {
	if x < 0.0 {
		return 0.0, ErrNegativeSqrt(x)
	}

	z := 1.0
	dz := z*z - x
	for math.Abs(dz) > 0.00000000001 {
		z -= dz / (2 * z)
		dz = z*z - x
	}

	return z, nil
}

type ErrNegativeSqrt float64

func (e ErrNegativeSqrt) Error() string {
	return fmt.Sprintf("cannot Sqrt negative number: %v", float64(e))
}

func main() {
	fmt.Println(Sqrt(2))
	fmt.Println(Sqrt(-2))
}
