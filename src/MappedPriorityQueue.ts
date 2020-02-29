import * as React from "react";
import { useMappedState } from "react-use-mapped-state";

import {
  PriorityQueueNode,
  PriorityQueueMax,
  PriorityQueueMin
} from "./PriorityQueue";

type valueSetter = (reference: string | string[], value: any | any[]) => void;
type MappedReturnValues = [any, valueSetter];
type ComplexMappedReturnedValues = [
  (key: any) => Map<any, any>,
  (keys: any, vals: any) => void
];

export interface PriorityQueueEntry {
  data: any;
  priority: number;
}

export type PriorityQueueReturnValues = [
  {
    priorityQueue: Array<PriorityQueueNode>;
    lastDequeuedItem: PriorityQueueNode | undefined;
  },
  (data: any, priority: number) => void,
  () => void
];

export type QueueType = "MAX" | "MIN";

export class MappedPriorityQueue {
  priorityQueue: PriorityQueueMax | PriorityQueueMin;
  managedState: MappedReturnValues | ComplexMappedReturnedValues;

  constructor(queueType: QueueType, data: Array<PriorityQueueEntry> = []) {
    let priorityQueueBase;
    if (queueType === "MAX") priorityQueueBase = new PriorityQueueMax(data);
    else if (queueType === "MIN")
      priorityQueueBase = new PriorityQueueMin(data);
    else throw new Error("The queue type entered is not currently supported");

    this.priorityQueue = priorityQueueBase;
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.managedState = useMappedState({
      priorityQueue: this.priorityQueue,
      lastDequeuedItem: undefined
    });
  }

  getReturnValues(): PriorityQueueReturnValues {
    const [{ priorityQueue, lastDequeuedItem }] = this.managedState;
    return [
      {
        priorityQueue: priorityQueue ? priorityQueue.asSortedArray() : [],
        lastDequeuedItem
      },
      this.add,
      this.remove
    ];
  }

  add(data: any, priority: number) {
    const [{ priorityQueue }, valueSetter] = this.managedState;
    const newQueue = priorityQueue.clone();
    newQueue.enqueue({ data, priority });
    valueSetter("priorityQueue", newQueue);
  }

  remove() {
    const [{ priorityQueue }, valueSetter] = this.managedState;
    const newQueue = priorityQueue.clone();
    const value = newQueue.dequeue();
    valueSetter(["priorityQueue", "lastDequeuedItem"], [newQueue, value]);
  }
}
