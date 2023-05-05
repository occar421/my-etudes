package main

import (
	"io"
	"os"
	"strings"
)

type rot13Reader struct {
	r io.Reader
}

func (r rot13Reader) Read(b []byte) (int, error) {
	buffer := make([]byte, 8)

	n, err := r.r.Read(buffer)
	if err != nil {
		return 0, err
	}

	for i := 0; i < n; i++ {
		x := buffer[i]
		switch {
		case 'A' <= x && x <= 'Z':
			b[i] = (x-'A'+13)%26 + 'A'
		case 'a' <= x && x <= 'z':
			b[i] = (x-'a'+13)%26 + 'a'
		default:
			b[i] = x
		}
	}
	return n, nil
}

func main() {
	s := strings.NewReader("Lbh penpxrq gur pbqr!")
	r := rot13Reader{s}
	io.Copy(os.Stdout, &r)
}
