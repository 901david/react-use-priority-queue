interface IQueue {
  queue: Array<any>;
  size: Number;
}

export class Queue implements IQueue {
  queue: Array<any> = [];
  size: number = 0;

  constructor() {}

  enqueue(val: any): void {
    this.queue.unshift(val);
    this.size++;
  }

  dequeue(): any {
    if (this.size === 0) return undefined;
    this.size--;
    return this.queue.pop();
  }
}
