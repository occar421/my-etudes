package main

import (
	"image"
	"image/color"

	"golang.org/x/tour/pic"
)

type Image struct {
	w int
	h int
	v int
}

func (i Image) ColorModel() color.Model {
	return color.RGBAModel
}

func (i Image) Bounds() image.Rectangle {
	return image.Rect(0, 0, i.w, i.h)
}

func (i Image) At(x, y int) color.Color {
	return color.RGBA{uint8(i.v ^ x), uint8(i.v ^ y), 255, 255}
}

func main() {
	m := Image{w: 300, h: 300, v: 100}
	pic.ShowImage(m)
}
