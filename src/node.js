class Node {
	constructor(data, priority) {
    this.data = data;
    this.priority = priority;
    this.parent = null;
    this.left = null;
    this.right = null;
	}

	appendChild(node) {
    if (this.left===null) {
      this.left = node;
      node.parent = this;
      return;
    }
    if (this.right === null) {
      this.right = node;
      node.parent = this;
      return;
    }
	}

	removeChild(node) {
    if (this.left === node) {
      node.parent = null;
      this.left = null;
      return;
    }
    if (this.right === node) {
      node.parent = null;
      this.right = null;
      return;
    }
    throw new Error('Not a child');
	}

	remove() {
    if (this.parent===null){
      return;
    }
    this.parent.removeChild(this);
	}

	swapWithParent() {
    let left = this.left;
    let right = this.right;
    let parent = this.parent;
    if (parent===null){
      return;
    }
    let pLeft = parent.left;
    let pRight = parent.right;
    let grandParent = parent.parent;

    /* switch this and parent links */
    parent.parent = this;
    this.parent = grandParent;
    /* update this children */
    if (this === pLeft) {
      this.left = parent;
      this.right = pRight;
      if (pRight!==null) {
        pRight.parent = this;
      }
    } else {
      this.left = pLeft;
      if (pLeft!==null) {
        pLeft.parent = this;
      }
      this.right = parent;
    }
    /* update parent's children */
    parent.left = left;
    if (left!=null) {
      left.parent = parent;
    }
    parent.right = right;
    if(right!==null) {
      right.parent = parent;
    }

    /* update grandParent links */
    if (grandParent !== null) {
      let gpLeft = grandParent.left;
      if(gpLeft === parent) {
        grandParent.left = this;
      } else {
        grandParent.right = this;
      }
    }

	}
}

module.exports = Node;
