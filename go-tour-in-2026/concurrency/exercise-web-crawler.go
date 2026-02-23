package main

import (
	"fmt"
	"sync"
)

type Fetcher interface {
	// Fetch returns the body of URL and
	// a slice of URLs found on that page.
	Fetch(url string) (body string, urls []string, err error)
}

type Url string

type Body string

// Crawl uses fetcher to recursively crawl
// pages starting with url, to a maximum of depth.
func Crawl(url string, depth int, fetcher Fetcher) {
	ch := make(chan Body)
	cache := make(map[Url]Body)
	mutex := sync.Mutex{}

	go crawl(Url(url), depth, fetcher, ch, &mutex, &cache)

	for body := range ch {
		fmt.Printf("found: %s %q\n", url, string(body))
	}
}

func crawl(url Url, depth int, fetcher Fetcher, parentCh chan Body, mutex *sync.Mutex, cache *map[Url]Body) {
	defer close(parentCh)

	if depth <= 0 {
		return
	}

	mutex.Lock()
	body, ok := (*cache)[url]
	mutex.Unlock()
	if ok {
		if body == "" {
			return
		}
		parentCh <- body
		return
	}

	body_, urls, err := fetcher.Fetch(string(url))
	if err != nil {
		fmt.Println(err)
		mutex.Lock()
		(*cache)[url] = ""
		mutex.Unlock()
		return
	}
	body = Body(body_)

	mutex.Lock()
	(*cache)[url] = body
	mutex.Unlock()
	parentCh <- body

	childrenCh := make([]chan Body, len(urls))
	for i, u := range urls {
		childrenCh[i] = make(chan Body)
		go crawl(Url(u), depth-1, fetcher, childrenCh[i], mutex, cache)
	}
	for _, ch := range childrenCh {
		for body := range ch {
			parentCh <- body
		}
	}
	return
}

func main() {
	Crawl("https://golang.org/", 4, fetcher)
}

// fakeFetcher is Fetcher that returns canned results.
type fakeFetcher map[string]*fakeResult

type fakeResult struct {
	body string
	urls []string
}

func (f fakeFetcher) Fetch(url string) (string, []string, error) {
	fmt.Println("fetching", url)
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
