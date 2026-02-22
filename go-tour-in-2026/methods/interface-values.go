package main

import (
	"fmt"
	"math"
)

type I_ interface {
	M()
}

type T_ struct {
	S string
}

func (t *T_) M() {
	fmt.Println(t.S)
}

type F float64

func (f F) M() {
	fmt.Println(f)
}

func main() {
	var i I_

	i = &T_{"hello"}
	describe(i)
	i.M()

	i = F(math.Pi)
	describe(i)
	i.M()
}

func describe(i I_) {
	fmt.Printf("(%v, %T)\n", i, i)
}
