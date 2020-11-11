class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }
  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }
  inserAt(position, item) {
    if (position < 0) {
      throw new Error("position does not exist");
    }
    if (position === 0) {
      this.insertFirst(item);
    } else {
      const node = this.findNthElement(position - 1);
      const newNode = new _Node(item, null);
      newNode.next = node.next;
      node.next = newNode;
    }
  }
  moveHead(num) {
    let tempHead = this.head;
    this.head = this.head.next;
    this.inserAt(num, tempHead.value);
  }

  findNthElement(position) {
    let node = this.head;
    for (let i = 0; i < position; i++) {
      node = node.next;
    }
    return node;
  }
  insertBefore(item, prev) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = null;
      let previousNode = this.head;
      while (previousNode !== prev) {
        previousNode = previousNode.next;
        if (previousNode === null) {
          break;
        }
        tempNode = previousNode.next;
      }
      if (previousNode === null) {
        console.log("Item is not found");
        return;
      }
      previousNode.next = new _Node(item, tempNode);
    }
  }
  insertAfter(item, prev) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = null;
      let previousNode = this.head;
      while (previousNode !== prev) {
        previousNode = previousNode.next;
        if (previousNode === null) {
          break;
        }
        tempNode = previousNode.next;
      }
      if (previousNode === null) {
        console.log("Item is not found");
        return;
      }
      tempNode.next = new _Node(item, previousNode.next.next);
    }
  }
  find(item) {
    let currNode = this.head;

    if (!this.head) {
      return null;
    }
    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }
  findByValue(value) {
    let currNode = this.head;

    if (!this.head) {
      return null;
    }
    while (currNode.next.value !== value) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }
  remove(item) {
    if (!this.head) {
      return null;
    }
    let currNode = this.head;
    let previousNode = this.head;
    while (currNode !== null && currNode.value !== item) {
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log("Item not found");
      return;
    }

    previousNode.next = currNode.next;
  }

  display() {
    let thisNode = this.head;
    let output = [];
    while (thisNode !== null) {
      output.push(thisNode.value);
      thisNode = thisNode.next;
    }
    return output;
  }
  map(cb) {
    let node = this.head;
    let arr = [];
    while (node) {
      arr.push(cb(node));
      node = node.next;
    }
    return arr;
  }
}





module.exports = LinkedList;
