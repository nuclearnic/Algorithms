package main

import (
	"fmt"
	"math"
)

type list struct {
	start      *node
	lr         [2]int
	longestSeq int
}

type node struct {
	value int
	next  *node
	len   int
}

func (l *list) append(newVal int) {
	newNode := &node{value: newVal}

	if l.start == nil {
		l.start = newNode
	} else {
		currentNode := l.start
		for currentNode.next != nil {
			currentNode = currentNode.next
		}
		currentNode.next = newNode
	}
}

func (l *list) insertInOrder(newVal int) {
	newNode := &node{value: newVal, len: 1}
	curNode := l.start

	if curNode == nil {
		l.start = newNode
	} else if l.start.value > newNode.value {
		l.start = newNode
		newNode.next = curNode
	} else {
		for {
			nextNode := curNode.next
			if nextNode == nil {
				curNode.next = newNode
				break
			} else if nextNode.value > newNode.value {
				curNode.next = newNode
				newNode.next = nextNode
				break
			}
			curNode = nextNode
		}
	}
}

func buildOrderedLinkedList(input []int) *list {
	l := &list{}
	for _, val := range input {
		l.insertInOrder(val)
	}
	return l
}

func (l *list) print(n *node) {
	if n.next != nil {
		fmt.Printf("{ value: %v,\t next:%v,\t len: %v }\n", n.value, n.next, n.len)
		l.print(n.next)
	}
}

func largestRange(l *list) int {

	compress := func(l *list) int {
		n := l.start
		for n.next != nil {
			len := 0
			d := math.Abs(float64(n.value - n.next.value))
			if d == 1 {
				len = n.len + n.next.len
				n.next.len = len
			}
			n = n.next
			if len > l.longestSeq {
				l.longestSeq = len
			}
		}
		return l.longestSeq
	}

	ls := compress(l)
	l.longestSeq = ls

	return ls
}

func main() {
	input := []int{1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6}
	l := &list{lr: [2]int{0, 0}, longestSeq: 0}
	l = buildOrderedLinkedList(input)
	l.print(l.start)
	fmt.Printf("Largest Range: %v\n", largestRange(l))
}
