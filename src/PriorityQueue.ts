interface IPriorityQueueNode {
  readonly data: any;
  readonly priority: number;
}

export class PriorityQueueNode implements IPriorityQueueNode {
  constructor(readonly data: any, readonly priority: number) {}
}

interface IPriorityQueue {
  queue: Array<PriorityQueueNode>;
  size: number;
  buildQueue(data: Array<any>): void;
  getIndexForSwap(leftIdx: number, rightIdx: number, valIdx: number): number;
  bubbleUp(idx: number, val: { data: any; priority: number }): void;
  bubbleDown(idx: number, val: { data: any; priority: number }): void;
  enqueue(data: PriorityQueueNode): any;
  getIndexForSwap(leftIdx: number, rightIdx: number, valIdx: number): number;
}

abstract class PriorityQueue implements IPriorityQueue {
  queue: Array<PriorityQueueNode> = [];
  size: number = 0;
  abstract bubbleUp(idx: number, val: { data: any; priority: number }): void;
  abstract bubbleDown(idx: number, val: { data: any; priority: number }): void;
  abstract getIndexForSwap(
    leftIdx: number,
    rightIdx: number,
    valIdx: number
  ): number;
  abstract clone(): any;

  asSortedArray(): Array<PriorityQueueNode> {
    const throwawayQueue = this.clone();
    const results = [];
    while (throwawayQueue.size !== 0) {
      results.push(throwawayQueue.dequeue());
    }

    return results;
  }

  getNode(idx: number): PriorityQueueNode {
    return this.queue[idx];
  }

  getLastNode(): PriorityQueueNode {
    return this.getNode(this.size - 1);
  }

  buildQueue(data: Array<PriorityQueueNode>) {
    data.forEach(data => {
      this.enqueue(data);
    });
  }

  enqueue(node: PriorityQueueNode) {
    if (this.size === 0) {
      this.queue.push(new PriorityQueueNode(node.data, node.priority));
      this.size++;
      return;
    }
    this.queue.push(new PriorityQueueNode(node.data, node.priority));
    this.size++;
    this.bubbleUp(this.size - 1, this.getLastNode());
  }

  dequeue() {
    if (this.size < 1) return undefined;
    if (this.size === 1) {
      this.size--;
      return this.queue.pop();
    }

    [this.queue[0], this.queue[this.size - 1]] = [
      this.queue[this.size - 1],
      this.queue[0]
    ];
    const val = this.queue.pop();
    this.size--;
    this.bubbleDown(0, this.getNode(0));
    return val;
  }

  peek() {
    return this.queue[0];
  }
}

export class PriorityQueueMax extends PriorityQueue {
  isMax: boolean = true;
  isMin: boolean = false;

  constructor(data: Array<PriorityQueueNode> = []) {
    super();
    const hasDataToBeProcessed =
      data !== undefined && Array.isArray(data) && data.length > 0;
    if (hasDataToBeProcessed) this.buildQueue(data);
  }

  clone() {
    return new PriorityQueueMax(this.queue.concat());
  }

  getIndexForSwap(leftIdx: number, rightIdx: number, valIdx: number) {
    const val = this.queue[valIdx];
    const left = this.queue[leftIdx];
    const right = this.queue[rightIdx];
    const leftVal = left ? left.priority : -Infinity;
    const rightVal = right ? right.priority : -Infinity;
    if (val.priority < leftVal && val.priority < rightVal)
      return leftVal > rightVal ? leftIdx : rightIdx;

    if (val.priority < leftVal && val.priority > rightVal) return leftIdx;

    return rightIdx;
  }

  bubbleUp(idx: number, val: { data: any; priority: number }): undefined {
    const parentIdx = Math.floor((idx - 1) / 2);
    if (idx === 0) return;
    if (val.priority > this.queue[parentIdx].priority) {
      [this.queue[idx], this.queue[parentIdx]] = [
        this.queue[parentIdx],
        this.queue[idx]
      ];
    }
    return this.bubbleUp(parentIdx, this.getNode(parentIdx));
  }

  bubbleDown(idx: number, val: { data: any; priority: number }): undefined {
    const baseSibIdx = idx * 2;
    const leftSibIdx = baseSibIdx + 1;
    const rightSibIdx = baseSibIdx + 2;

    const leftChildExists = this.getNode(leftSibIdx) !== undefined;
    const rightChildExists = this.getNode(rightSibIdx) !== undefined;
    const leftChild = leftChildExists ? this.getNode(leftSibIdx) : undefined;
    const rightChild = rightChildExists ? this.getNode(rightSibIdx) : undefined;
    if (!leftChildExists && !rightChildExists) return;

    if (
      !leftChildExists &&
      rightChildExists &&
      val.priority >= rightChild!.priority
    )
      return;
    if (
      !rightChildExists &&
      leftChildExists &&
      val.priority >= leftChild!.priority
    )
      return;

    const swapIdx = this.getIndexForSwap(leftSibIdx, rightSibIdx, idx);

    [this.queue[idx], this.queue[swapIdx]] = [
      this.queue[swapIdx],
      this.queue[idx]
    ];
    return this.bubbleDown(swapIdx, val);
  }
}

export class PriorityQueueMin extends PriorityQueue {
  isMax: boolean = false;
  isMin: boolean = true;

  constructor(data: Array<PriorityQueueNode> = []) {
    super();
    const hasDataToBeProcessed =
      data !== undefined && Array.isArray(data) && data.length > 0;
    if (hasDataToBeProcessed) this.buildQueue(data);
  }

  clone() {
    return new PriorityQueueMin(this.queue.concat());
  }

  getIndexForSwap(leftIdx: number, rightIdx: number, valIdx: number) {
    const val = this.queue[valIdx];
    const left = this.queue[leftIdx];
    const right = this.queue[rightIdx];
    const leftVal = left ? left.priority : Infinity;
    const rightVal = right ? right.priority : Infinity;
    if (val.priority > leftVal && val.priority > rightVal)
      return leftVal < rightVal ? leftIdx : rightIdx;

    if (val.priority > leftVal && val.priority < rightVal) return leftIdx;

    return rightIdx;
  }

  bubbleUp(idx: number, val: { data: any; priority: number }): undefined {
    const parentIdx = Math.floor((idx - 1) / 2);
    if (idx === 0) return;
    if (val.priority < this.queue[parentIdx].priority) {
      [this.queue[idx], this.queue[parentIdx]] = [
        this.queue[parentIdx],
        this.queue[idx]
      ];
    }
    return this.bubbleUp(parentIdx, this.getNode(parentIdx));
  }

  bubbleDown(idx: number, val: { data: any; priority: number }): undefined {
    const baseSibIdx = idx * 2;
    const leftSibIdx = baseSibIdx + 1;
    const rightSibIdx = baseSibIdx + 2;

    const leftChildExists = this.queue[leftSibIdx] !== undefined;
    const rightChildExists = this.queue[rightSibIdx] !== undefined;
    const leftChild = leftChildExists ? this.queue[leftSibIdx] : undefined;
    const rightChild = rightChildExists ? this.queue[rightSibIdx] : undefined;
    if (!leftChildExists && !rightChildExists) return;

    if (
      !leftChildExists &&
      rightChildExists &&
      rightChild!.priority >= val.priority
    )
      return;
    if (
      !rightChildExists &&
      leftChildExists &&
      leftChild!.priority >= val.priority
    )
      return;

    const swapIdx = this.getIndexForSwap(leftSibIdx, rightSibIdx, idx);

    [this.queue[idx], this.queue[swapIdx]] = [
      this.queue[swapIdx],
      this.queue[idx]
    ];
    return this.bubbleDown(swapIdx, val);
  }
}
