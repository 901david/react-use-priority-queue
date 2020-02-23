import { PriorityQueueNode, PriorityQueueMax, PriorityQueueMin } from "./PriorityQueue";
export interface PriorityQueueEntry {
    data: any;
    priority: number;
}
export declare type PriorityQueueReturnValues = [PriorityQueueMax | PriorityQueueMin, (data: any, priority: number) => void, () => PriorityQueueNode | undefined];
export declare type QueueType = "MAX" | "MIN";
export declare class MappedPriorityQueue {
    priorityQueue: PriorityQueueMax | PriorityQueueMin;
    priorityQueueStateSetter: (key: string, val: any) => void;
    constructor(queueType: QueueType, data?: Array<PriorityQueueEntry>);
    getReturnValues(): PriorityQueueReturnValues;
    enqueue(data: any, priority: number): void;
    dequeue(): PriorityQueueNode | undefined;
}
