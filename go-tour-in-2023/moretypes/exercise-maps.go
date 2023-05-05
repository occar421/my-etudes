package main

import (
	"golang.org/x/tour/wc"
	"strings"
)

func WordCount(s string) map[string]int {
	result := make(map[string]int)

	fields := strings.Fields(s)
	for _, field := range fields {
		result[field] = result[field] + 1
	}

	return result
}

func main() {
	wc.Test(WordCount)
}
