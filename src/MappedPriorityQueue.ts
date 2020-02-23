import * as React from "react";
import { useMappedState } from "react-use-mapped-state";
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
  PriorityQueueMax | PriorityQueueMin,
  (data: any, priority: number) => void,
  () => PriorityQueueNode | undefined
];

export type QueueType = "MAX" | "MIN";

export class MappedPriorityQueue {
  priorityQueue: PriorityQueueMax | PriorityQueueMin;
  priorityQueueStateSetter: (key: string, val: any) => void;

  constructor(queueType: QueueType, data: Array<PriorityQueueEntry> = []) {
    let priorityQueueBase;
    if (queueType === "MAX") priorityQueueBase = new PriorityQueueMax(data);
    else if (queueType === "MIN")
      priorityQueueBase = new PriorityQueueMin(data);
    else throw new Error("The queue type entered is not currently supported");
    const [{ priorityQueue }, priorityQueueStateSetter] = useMappedState({
      priorityQueue: priorityQueueBase
    });
    this.priorityQueue = priorityQueue;
    this.priorityQueueStateSetter = priorityQueueStateSetter;
  }

  getReturnValues(): PriorityQueueReturnValues {
    return [this.priorityQueue, this.enqueue, this.dequeue];
  }

  enqueue(data: any, priority: number) {
    const newQueue = this.priorityQueue.clone();
    newQueue.enqueue({ data, priority });
    this.priorityQueueStateSetter("priorityQueue", newQueue);
  }

  dequeue() {
    const newQueue = this.priorityQueue.clone();
    const newVal = newQueue.dequeue();
    this.priorityQueueStateSetter("priorityQueue", newQueue);
    return newVal;
  }
}
