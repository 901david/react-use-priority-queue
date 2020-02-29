import { PriorityQueueNode, PriorityQueueMax, PriorityQueueMin } from "./PriorityQueue";
declare type valueSetter = (reference: string | string[], value: any | any[]) => void;
declare type MappedReturnValues = [any, valueSetter];
declare type ComplexMappedReturnedValues = [(key: any) => Map<any, any>, (keys: any, vals: any) => void];
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
    managedState: MappedReturnValues | ComplexMappedReturnedValues;
    constructor(queueType: QueueType, data?: Array<PriorityQueueEntry>);
    getReturnValues(): PriorityQueueReturnValues;
    add(data: any, priority: number): void;
    remove(): void;
}
export {};
