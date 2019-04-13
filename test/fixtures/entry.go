package main

import (
	"./bar"
	_ "./foo"
)

func main() {
	bar.Quux()
}
