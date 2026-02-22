package main

import "fmt"

type Test interface {
	V()
}

func do(i interface{}) {
	switch v := i.(type) {
	case int:
		fmt.Printf("Twice %v is %v\n", v, v*2)
	case string:
		fmt.Printf("%q is %v bytes long\n", v, len(v))
	case Test: // `i` が満たす Interface でもマッチする
		fmt.Println("Received Test interface")
	case nil:
		fmt.Println("Received nil value")
	default:
		fmt.Printf("I don't know about type %T!\n", v)
	}
}

type Hoge struct {
	X int
}

func (h Hoge) V() {
	fmt.Println("V")
}

func main() {
	do(21)
	do("hello")
	do(true)

	var test Test
	do(test)

	var test2 Test = Hoge{1}
	do(test2)
}
