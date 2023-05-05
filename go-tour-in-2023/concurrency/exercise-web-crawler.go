package main

import (
	"fmt"
	"sync"
	"time"
)

type Fetcher interface {
	// Fetch returns the body of URL and
	// a slice of URLs found on that page.
	Fetch(url string) (body string, urls []string, err error)
}

type Crawler struct {
	ch    chan int
	mutex sync.Mutex
	cache map[string]string
}

// Crawl uses fetcher to recursively crawl
// pages starting with url, to a maximum of depth.
func (c *Crawler) Crawl(url string, depth int, fetcher Fetcher) {
	finish := make(chan int)
	go c.crawl(url, depth, fetcher, finish)
	<-finish
}

func (c *Crawler) crawl(url string, depth int, fetcher Fetcher, finish chan int) {
	defer func() {
		finish <- 0
	}()

	// This implementation doesn't do either:
	if depth <= 0 {
		return
	}

	c.mutex.Lock()
	body, ok := c.cache[url]
	c.mutex.Unlock()
	if ok {
		fmt.Printf("cache hit: %s %q\n", url, body)
		return
	}

	body, urls, err := fetcher.Fetch(url)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("found: %s %q\n", url, body)
	c.mutex.Lock()
	c.cache[url] = body
	c.mutex.Unlock()

	subCh := make(chan int)
	for _, u := range urls {
		go c.crawl(u, depth-1, fetcher, subCh)
	}
	for i := 0; i < len(urls); i++ {
		<-subCh
	}
	return
}

func main() {
	c := Crawler{cache: make(map[string]string)}
	c.Crawl("https://golang.org/", 4, fetcher)
}

// fakeFetcher is Fetcher that returns canned results.
type fakeFetcher map[string]*fakeResult

type fakeResult struct {
	body string
	urls []string
}

func (f fakeFetcher) Fetch(url string) (string, []string, error) {
	time.Sleep(1 * time.Second)
	if res, ok := f[url]; ok {
		return res.body, res.urls, nil
	}
	return "", nil, fmt.Errorf("not found: %s", url)
}

// fetcher is a populated fakeFetcher.
var fetcher = fakeFetcher{
	"https://golang.org/": &fakeResult{
		"The Go Programming Language",
		[]string{
			"https://golang.org/pkg/",
			"https://golang.org/cmd/",
		},
	},
	"https://golang.org/pkg/": &fakeResult{
		"Packages",
		[]string{
			"https://golang.org/",
			"https://golang.org/cmd/",
			"https://golang.org/pkg/fmt/",
			"https://golang.org/pkg/os/",
		},
	},
	"https://golang.org/pkg/fmt/": &fakeResult{
		"Package fmt",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
	"https://golang.org/pkg/os/": &fakeResult{
		"Package os",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
}
