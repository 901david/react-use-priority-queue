interface IPriorityQueueNode {
    readonly data: any;
    readonly priority: number;
}
export declare class PriorityQueueNode implements IPriorityQueueNode {
    readonly data: any;
    readonly priority: number;
    constructor(data: any, priority: number);
}
interface IPriorityQueue {
    queue: Array<PriorityQueueNode>;
    size: number;
    buildQueue(data: Array<any>): void;
    getIndexForSwap(leftIdx: number, rightIdx: number, valIdx: number): number;
    bubbleUp(idx: number, val: {
        data: any;
        priority: number;
    }): void;
    bubbleDown(idx: number, val: {
        data: any;
        priority: number;
    }): void;
    enqueue(data: PriorityQueueNode): any;
    getIndexForSwap(leftIdx: number, rightIdx: number, valIdx: number): number;
}
declare abstract class PriorityQueue implements IPriorityQueue {
    queue: Array<PriorityQueueNode>;
    size: number;
    abstract bubbleUp(idx: number, val: {
        data: any;
        priority: number;
    }): void;
    abstract bubbleDown(idx: number, val: {
        data: any;
        priority: number;
    }): void;
    abstract getIndexForSwap(leftIdx: number, rightIdx: number, valIdx: number): number;
    abstract clone(): any;
    getNode(idx: number): PriorityQueueNode;
    getLastNode(): PriorityQueueNode;
    buildQueue(data: Array<PriorityQueueNode>): void;
    enqueue(node: PriorityQueueNode): this | undefined;
    dequeue(): PriorityQueueNode | undefined;
    peek(): PriorityQueueNode;
}
export declare class PriorityQueueMax extends PriorityQueue {
    isMax: boolean;
    isMin: boolean;
    constructor(data?: Array<PriorityQueueNode>);
    clone(): PriorityQueueMax;
    getIndexForSwap(leftIdx: number, rightIdx: number, valIdx: number): number;
    bubbleUp(idx: number, val: {
        data: any;
        priority: number;
    }): undefined;
    bubbleDown(idx: number, val: {
        data: any;
        priority: number;
    }): undefined;
}
export declare class PriorityQueueMin extends PriorityQueue {
    isMax: boolean;
    isMin: boolean;
    constructor(data?: Array<PriorityQueueNode>);
    clone(): PriorityQueueMin;
    getIndexForSwap(leftIdx: number, rightIdx: number, valIdx: number): number;
    bubbleUp(idx: number, val: {
        data: any;
        priority: number;
    }): undefined;
    bubbleDown(idx: number, val: {
        data: any;
        priority: number;
    }): undefined;
}
export {};
