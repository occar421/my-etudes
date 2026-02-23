package main

import (
	"io"
	"os"
	"strings"
)

type rot13Reader struct {
	r io.Reader
}

func (r rot13Reader) Read(b []byte) (n int, err error) {
	n, err = r.r.Read(b)
	for i := 0; i < n; i++ {
		var base byte
		switch {
		case 'A' <= b[i] && b[i] <= 'Z':
			base = 'A'
		case 'a' <= b[i] && b[i] <= 'z':
			base = 'a'
		default:
			continue
		}

		index := b[i] - base
		index += 13
		index %= 26
		b[i] = base + index
	}
	return
}

func main() {
	s := strings.NewReader("Lbh penpxrq gur pbqr!")
	r := rot13Reader{s}
	io.Copy(os.Stdout, &r)
}
