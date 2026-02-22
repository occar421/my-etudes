package main

import "fmt"

type Vertex____ struct {
	Lat, Long float64
}

var m map[string]Vertex____

func main() {
	m = make(map[string]Vertex____)
	m["Bell Labs"] = Vertex____{
		40.68433, -74.39967,
	}
	fmt.Println(m["Bell Labs"])
}
