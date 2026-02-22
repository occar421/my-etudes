package main

import (
	"strings"

	"golang.org/x/tour/wc"
)

func WordCount(s string) (result map[string]int) {
	fields := strings.Fields(s)

	result = make(map[string]int)
	for _, field := range fields {
		result[field]++
	}
	return result
}

func main() {
	wc.Test(WordCount)
}
