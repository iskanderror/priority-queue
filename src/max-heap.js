const Node = require('./node');

class MaxHeap {
	constructor() {
    this.root = null;
    this.parentNodes = [];
    this.count=0;
	}

	push(data, priority) {
    let node = new Node(data,priority);
    this.insertNode(node);
    this.shiftNodeUp(node);
	}

	pop() {
    if (this.count==0) {
      return;
    }
    let rootNode = this.detachRoot();
    this.restoreRootFromLastInsertedNode(rootNode);
    this.shiftNodeDown(this.root);
    return rootNode.data;
	}

	detachRoot() {
    let rootNode = this.root;
    let rootNodeIndex = this.parentNodes.indexOf(rootNode);
    if (rootNodeIndex >= 0) {
      this.parentNodes.splice(rootNodeIndex,1);
    }
    this.root = null;
    this.count--;
    return rootNode;
	}

	restoreRootFromLastInsertedNode(detached) {
    if (this.count===0) {
      return;
    }
    let lastInsertedNode = this.parentNodes.pop();
    
    lastInsertedNode.left = detached.left;
    if(lastInsertedNode.left != null) {
      lastInsertedNode.left.parent = lastInsertedNode;
    }
    
    lastInsertedNode.right = detached.right;
    if(lastInsertedNode.right != null) {
      lastInsertedNode.right.parent = lastInsertedNode;
    }

    if(lastInsertedNode.parent !== null) {
      if (lastInsertedNode.parent.left === lastInsertedNode) {
        lastInsertedNode.parent.left = null;
      }
      if (lastInsertedNode.parent.right === lastInsertedNode) {
        lastInsertedNode.parent.right = null;
        this.parentNodes.unshift(lastInsertedNode.parent);
      }
    }
    this.root = lastInsertedNode;
    this.root.parent = null;
	}

	size() {
		return this.count;
  }

	isEmpty() {
    return (this.count == 0);
	}

	clear() {
    this.root = null;
    this.parentNodes.length = 0;
    this.count = 0;
	}

	insertNode(node) {
		if (this.count == 0) {
      this.root = node;
    } else {
      let firstParent = this.parentNodes[0];
      firstParent.appendChild(node);
      if ( (firstParent.left !=null) && (firstParent.right !== null)) {
        this.parentNodes.shift();
      }
    }
    this.parentNodes.push(node);
    this.count++;
	}

	shiftNodeUp(node) {
    if (node.parent === null )
    {
      this.root = node;
      return;
    }
    if(node.parent.priority >= node.priority) {
      return;
    } else {
      let parentNode = node.parent;
      node.swapWithParent();
      /* update parent nodes array*/
      let parentIndex = this.parentNodes.indexOf(parentNode);
      let nodeIndex = this.parentNodes.indexOf(node);
      if (parentIndex >= 0) {
        this.parentNodes.splice(parentIndex,1,node);
      }
      if (nodeIndex >=0) {
        this.parentNodes.splice(nodeIndex,1,parentNode);
      }
      this.shiftNodeUp(node);
    }
  }
  
	shiftNodeDown(node) {
    if (node === null){
      return;
    }
    let childNode = node.left;
    if ( childNode != null && node.right!=null && node.right.priority > childNode.priority) {
      childNode = node.right;
    }
    if (childNode == null || node.priority >= childNode.priority)
    {
      if (this.root === node){
        while (this.root.parent !== null) {
          this.root = this.root.parent;
        }
      }
      return;
    } else {
      childNode.swapWithParent();
      /* update parent nodes array*/
      let childIndex = this.parentNodes.indexOf(childNode);
      let nodeIndex = this.parentNodes.indexOf(node);
      if (childIndex >= 0) {
        this.parentNodes.splice(childIndex,1,node);
      }
      if (nodeIndex >=0) {
        this.parentNodes.splice(nodeIndex,1,childNode);
      }
      this.shiftNodeDown(node);
    }
	}
}

module.exports = MaxHeap;
