package main

import "fmt"

type Vertex_____ struct {
	Lat, Long float64
}

var m_ = map[string]Vertex_____{
	"Bell Labs": Vertex_____{
		40.68433, -74.39967,
	},
	"Google": Vertex_____{
		37.42202, -122.08408,
	},
}

func main() {
	fmt.Println(m_)
}
