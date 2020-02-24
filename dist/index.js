'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

var PriorityQueueNode = /** @class */ (function () {
    function PriorityQueueNode(data, priority) {
        this.data = data;
        this.priority = priority;
    }
    return PriorityQueueNode;
}());
var PriorityQueue = /** @class */ (function () {
    function PriorityQueue() {
        this.queue = [];
        this.size = 0;
    }
    PriorityQueue.prototype.asSortedArray = function () {
        var throwawayQueue = this.clone();
        var results = [];
        while (throwawayQueue.size !== 0) {
            results.push(throwawayQueue.dequeue());
        }
        return results;
    };
    PriorityQueue.prototype.getNode = function (idx) {
        return this.queue[idx];
    };
    PriorityQueue.prototype.getLastNode = function () {
        return this.getNode(this.size - 1);
    };
    PriorityQueue.prototype.buildQueue = function (data) {
        var _this = this;
        data.forEach(function (data) {
            _this.enqueue(data);
        });
    };
    PriorityQueue.prototype.enqueue = function (node) {
        if (this.size === 0) {
            this.queue.push(new PriorityQueueNode(node.data, node.priority));
            this.size++;
            return;
        }
        this.queue.push(new PriorityQueueNode(node.data, node.priority));
        this.size++;
        this.bubbleUp(this.size - 1, this.getLastNode());
    };
    PriorityQueue.prototype.dequeue = function () {
        var _a;
        if (this.size < 1)
            return undefined;
        if (this.size === 1) {
            this.size--;
            return this.queue.pop();
        }
        _a = __read([
            this.queue[this.size - 1],
            this.queue[0]
        ], 2), this.queue[0] = _a[0], this.queue[this.size - 1] = _a[1];
        var val = this.queue.pop();
        this.size--;
        this.bubbleDown(0, this.getNode(0));
        return val;
    };
    PriorityQueue.prototype.peek = function () {
        return this.queue[0];
    };
    return PriorityQueue;
}());
var PriorityQueueMax = /** @class */ (function (_super) {
    __extends(PriorityQueueMax, _super);
    function PriorityQueueMax(data) {
        if (data === void 0) { data = []; }
        var _this = _super.call(this) || this;
        _this.isMax = true;
        _this.isMin = false;
        var hasDataToBeProcessed = data !== undefined && Array.isArray(data) && data.length > 0;
        if (hasDataToBeProcessed)
            _this.buildQueue(data);
        return _this;
    }
    PriorityQueueMax.prototype.clone = function () {
        return new PriorityQueueMax(this.queue.concat());
    };
    PriorityQueueMax.prototype.getIndexForSwap = function (leftIdx, rightIdx, valIdx) {
        var val = this.queue[valIdx];
        var left = this.queue[leftIdx];
        var right = this.queue[rightIdx];
        var leftVal = left ? left.priority : -Infinity;
        var rightVal = right ? right.priority : -Infinity;
        if (val.priority < leftVal && val.priority < rightVal)
            return leftVal > rightVal ? leftIdx : rightIdx;
        if (val.priority < leftVal && val.priority > rightVal)
            return leftIdx;
        return rightIdx;
    };
    PriorityQueueMax.prototype.bubbleUp = function (idx, val) {
        var _a;
        var parentIdx = Math.floor((idx - 1) / 2);
        if (idx === 0)
            return;
        if (val.priority > this.queue[parentIdx].priority) {
            _a = __read([
                this.queue[parentIdx],
                this.queue[idx]
            ], 2), this.queue[idx] = _a[0], this.queue[parentIdx] = _a[1];
        }
        return this.bubbleUp(parentIdx, this.getNode(parentIdx));
    };
    PriorityQueueMax.prototype.bubbleDown = function (idx, val) {
        var _a;
        var baseSibIdx = idx * 2;
        var leftSibIdx = baseSibIdx + 1;
        var rightSibIdx = baseSibIdx + 2;
        var leftChildExists = this.getNode(leftSibIdx) !== undefined;
        var rightChildExists = this.getNode(rightSibIdx) !== undefined;
        var leftChild = leftChildExists ? this.getNode(leftSibIdx) : undefined;
        var rightChild = rightChildExists ? this.getNode(rightSibIdx) : undefined;
        if (!leftChildExists && !rightChildExists)
            return;
        if (!leftChildExists &&
            rightChildExists &&
            val.priority >= rightChild.priority)
            return;
        if (!rightChildExists &&
            leftChildExists &&
            val.priority >= leftChild.priority)
            return;
        var swapIdx = this.getIndexForSwap(leftSibIdx, rightSibIdx, idx);
        _a = __read([
            this.queue[swapIdx],
            this.queue[idx]
        ], 2), this.queue[idx] = _a[0], this.queue[swapIdx] = _a[1];
        return this.bubbleDown(swapIdx, val);
    };
    return PriorityQueueMax;
}(PriorityQueue));
var PriorityQueueMin = /** @class */ (function (_super) {
    __extends(PriorityQueueMin, _super);
    function PriorityQueueMin(data) {
        if (data === void 0) { data = []; }
        var _this = _super.call(this) || this;
        _this.isMax = false;
        _this.isMin = true;
        var hasDataToBeProcessed = data !== undefined && Array.isArray(data) && data.length > 0;
        if (hasDataToBeProcessed)
            _this.buildQueue(data);
        return _this;
    }
    PriorityQueueMin.prototype.clone = function () {
        return new PriorityQueueMin(this.queue.concat());
    };
    PriorityQueueMin.prototype.getIndexForSwap = function (leftIdx, rightIdx, valIdx) {
        var val = this.queue[valIdx];
        var left = this.queue[leftIdx];
        var right = this.queue[rightIdx];
        var leftVal = left ? left.priority : Infinity;
        var rightVal = right ? right.priority : Infinity;
        if (val.priority > leftVal && val.priority > rightVal)
            return leftVal < rightVal ? leftIdx : rightIdx;
        if (val.priority > leftVal && val.priority < rightVal)
            return leftIdx;
        return rightIdx;
    };
    PriorityQueueMin.prototype.bubbleUp = function (idx, val) {
        var _a;
        var parentIdx = Math.floor((idx - 1) / 2);
        if (idx === 0)
            return;
        if (val.priority < this.queue[parentIdx].priority) {
            _a = __read([
                this.queue[parentIdx],
                this.queue[idx]
            ], 2), this.queue[idx] = _a[0], this.queue[parentIdx] = _a[1];
        }
        return this.bubbleUp(parentIdx, this.getNode(parentIdx));
    };
    PriorityQueueMin.prototype.bubbleDown = function (idx, val) {
        var _a;
        var baseSibIdx = idx * 2;
        var leftSibIdx = baseSibIdx + 1;
        var rightSibIdx = baseSibIdx + 2;
        var leftChildExists = this.queue[leftSibIdx] !== undefined;
        var rightChildExists = this.queue[rightSibIdx] !== undefined;
        var leftChild = leftChildExists ? this.queue[leftSibIdx] : undefined;
        var rightChild = rightChildExists ? this.queue[rightSibIdx] : undefined;
        if (!leftChildExists && !rightChildExists)
            return;
        if (!leftChildExists &&
            rightChildExists &&
            rightChild.priority >= val.priority)
            return;
        if (!rightChildExists &&
            leftChildExists &&
            leftChild.priority >= val.priority)
            return;
        var swapIdx = this.getIndexForSwap(leftSibIdx, rightSibIdx, idx);
        _a = __read([
            this.queue[swapIdx],
            this.queue[idx]
        ], 2), this.queue[idx] = _a[0], this.queue[swapIdx] = _a[1];
        return this.bubbleDown(swapIdx, val);
    };
    return PriorityQueueMin;
}(PriorityQueue));

var MappedPriorityQueue = /** @class */ (function () {
    function MappedPriorityQueue(queueType, data) {
        if (data === void 0) { data = []; }
        this.managedState = undefined;
        var priorityQueueBase;
        if (queueType === "MAX")
            priorityQueueBase = new PriorityQueueMax(data);
        else if (queueType === "MIN")
            priorityQueueBase = new PriorityQueueMin(data);
        else
            throw new Error("The queue type entered is not currently supported");
        this.priorityQueue = priorityQueueBase;
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.managedState = React.useState(this.priorityQueue);
    }
    MappedPriorityQueue.prototype.getReturnValues = function () {
        var _a = __read(this.managedState, 1), priorityQueue = _a[0];
        return [
            priorityQueue ? priorityQueue.asSortedArray() : [],
            this.add,
            this.remove
        ];
    };
    MappedPriorityQueue.prototype.add = function (data, priority) {
        var _a = __read(this.managedState, 2), priorityQueue = _a[0], setQueue = _a[1];
        var newQueue = priorityQueue.clone();
        newQueue.enqueue({ data: data, priority: priority });
        setQueue(newQueue);
    };
    MappedPriorityQueue.prototype.remove = function () {
        var _a = __read(this.managedState, 2), priorityQueue = _a[0], setQueue = _a[1];
        var newQueue = priorityQueue.clone();
        var value = newQueue.dequeue();
        setQueue(newQueue);
        return value;
    };
    return MappedPriorityQueue;
}());

var usePriorityQueue = function (queueType, data) {
    var queue = new MappedPriorityQueue(queueType, data);
    return queue.getReturnValues();
};

exports.usePriorityQueue = usePriorityQueue;
//# sourceMappingURL=index.js.map
