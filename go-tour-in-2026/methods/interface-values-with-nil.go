package main

import "fmt"

type I__ interface {
	M()
}

type T__ struct {
	S string
}

func (t *T__) M() {
	if t == nil {
		fmt.Println("<nil>")
		return
	}
	fmt.Println(t.S)
}

func main() {
	var i I__

	var t *T__
	i = t
	describe_(i)
	i.M()

	i = &T__{"hello"}
	describe_(i)
	i.M()
}

func describe_(i I__) {
	fmt.Printf("(%v, %T)\n", i, i)
}
