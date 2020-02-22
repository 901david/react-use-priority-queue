const Queue = require("./Queue");

describe("Queue class", () => {
  describe("Enqueue method", () => {
    test("should  add an item to the queue", () => {
      const myQueue = new Queue();
      myQueue.enqueue(5);
      expect(myQueue.queue[0]).toEqual(5);
    });

    test("should  add an items to the queue", () => {
      const myQueue = new Queue();
      myQueue.enqueue(5);
      myQueue.enqueue(6);
      myQueue.enqueue(5);
      myQueue.enqueue(10);
      expect(myQueue.queue[0]).toEqual(10);
      expect(myQueue.queue[3]).toEqual(5);
      expect(myQueue.size).toEqual(4);
    });
  });

  describe("Dequeue method", () => {
    test("should  remove an item to the queue", () => {
      const myQueue = new Queue();
      myQueue.enqueue(5);
      const val = myQueue.dequeue();
      expect(myQueue.queue[0]).toEqual(undefined);
      expect(myQueue.size).toEqual(0);
      expect(val).toEqual(5);
    });

    test("should  remove multiple items to the queue", () => {
      const myQueue = new Queue();
      myQueue.enqueue(5);
      myQueue.enqueue(6);
      myQueue.enqueue(5);
      const val = myQueue.dequeue();
      expect(myQueue.queue[myQueue.size - 1]).toEqual(6);
      expect(myQueue.queue[0]).toEqual(5);
      expect(myQueue.size).toEqual(2);
    });

    test("should  return undefined when no items in queue", () => {
      const myQueue = new Queue();
      const val = myQueue.dequeue();
      expect(myQueue.queue[0]).toEqual(undefined);
      expect(myQueue.size).toEqual(0);
      expect(val).toEqual(undefined);
    });
  });
});
