package main

import "golang.org/x/tour/pic"

func Pic(dx, dy int) [][]uint8 {
	result := make([][]uint8, dx)
	for i := 0; i < dx; i++ {
		result[i] = make([]uint8, dy)
		for j := 0; j < dy; j++ {
			result[i][j] = uint8((i * i / dx) ^ (j * j / dy))
		}
	}
	return result
}

func main() {
	pic.Show(Pic)
}
