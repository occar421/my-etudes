package main

import (
	"fmt"
	"math/rand"
)

func main() {
	fmt.Println("My favorite number is", rand.Intn(10))

	//source := rand.NewSource(1)
	//
	//fmt.Println("My favorite number is", source.Int63())
}
