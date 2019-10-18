const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
    this.maxSize = 30;
    if (maxSize!==undefined){
      this.maxSize = maxSize;
    }
    this.heap = new MaxHeap();
	}

	push(data, priority) {
    if (this.heap.size() >= this.maxSize){
      throw new Error('Heap overflow');
    }
    this.heap.push(data,priority);
	}

	shift() {
    let data = this.heap.pop();
    if (data === undefined){
      throw new Error('Heap is empty');
    }
    return data;
	}

	size() {
    return this.heap.size();
	}

	isEmpty() {
		return (this.size()==0);
	}
}

module.exports = PriorityQueue;
