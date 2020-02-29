import { PriorityQueueNode, PriorityQueueMax, PriorityQueueMin } from "./PriorityQueue";
export interface PriorityQueueEntry {
    data: any;
    priority: number;
}
export declare type PriorityQueueReturnValues = [{
    priorityQueue: Array<PriorityQueueNode>;
    lastDequeuedItem: PriorityQueueNode | undefined;
}, (data: any, priority: number) => void, () => void];
export declare type QueueType = "MAX" | "MIN";
export declare class MappedPriorityQueue {
    priorityQueue: PriorityQueueMax | PriorityQueueMin;
    managedState: any;
    constructor(queueType: QueueType, data?: Array<PriorityQueueEntry>);
    getReturnValues(): PriorityQueueReturnValues;
    add(data: any, priority: number): void;
    remove(): void;
}
