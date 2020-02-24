import * as React from "react";
import {
  PriorityQueueNode,
  PriorityQueueMax,
  PriorityQueueMin
} from "./PriorityQueue";

export interface PriorityQueueEntry {
  data: any;
  priority: number;
}

export type PriorityQueueReturnValues = [
  Array<PriorityQueueNode>,
  (data: any, priority: number) => void,
  () => PriorityQueueNode | undefined
];

export type QueueType = "MAX" | "MIN";

export class MappedPriorityQueue {
  priorityQueue: PriorityQueueMax | PriorityQueueMin;
  managedState: [any, React.Dispatch<any>] | undefined = undefined;

  constructor(queueType: QueueType, data: Array<PriorityQueueEntry> = []) {
    let priorityQueueBase;
    if (queueType === "MAX") priorityQueueBase = new PriorityQueueMax(data);
    else if (queueType === "MIN")
      priorityQueueBase = new PriorityQueueMin(data);
    else throw new Error("The queue type entered is not currently supported");

    this.priorityQueue = priorityQueueBase;
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.managedState = React.useState(this.priorityQueue);
  }

  getReturnValues(): PriorityQueueReturnValues {
    const [priorityQueue] = this.managedState;
    return [
      priorityQueue ? priorityQueue.asSortedArray() : [],
      this.add,
      this.remove
    ];
  }

  add(data: any, priority: number) {
    const [priorityQueue, setQueue] = this.managedState;
    const newQueue = priorityQueue.clone();
    newQueue.enqueue({ data, priority });
    setQueue(newQueue);
  }

  remove() {
    const [priorityQueue, setQueue] = this.managedState;
    const newQueue = priorityQueue.clone();
    const value = newQueue.dequeue();
    setQueue(newQueue);
    return value;
  }
}
