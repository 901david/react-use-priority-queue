import * as React from "react";
import { PriorityQueueNode, PriorityQueueMax, PriorityQueueMin } from "./PriorityQueue";
export interface PriorityQueueEntry {
    data: any;
    priority: number;
}
export declare type PriorityQueueReturnValues = [Array<PriorityQueueNode>, (data: any, priority: number) => void, () => PriorityQueueNode | undefined];
export declare type QueueType = "MAX" | "MIN";
export declare class MappedPriorityQueue {
    priorityQueue: PriorityQueueMax | PriorityQueueMin;
    managedState: [any, React.Dispatch<any>] | undefined;
    constructor(queueType: QueueType, data?: Array<PriorityQueueEntry>);
    getReturnValues(): PriorityQueueReturnValues;
    add(data: any, priority: number): void;
    remove(): any;
}
