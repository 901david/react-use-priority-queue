const { PriorityQueueMax, PriorityQueueMin } = require("./priority-queue");

describe("Priority Queue Max", () => {
  test("should instantiate priority queue with blank array", () => {
    const pq = new PriorityQueueMax();
    expect(pq.size).toEqual(0);
    expect(pq.queue.length).toEqual(0);
  });
  describe("Enqueue", () => {
    test("should correctly enque an element when no elements present", () => {
      const pq = new PriorityQueueMax();
      const data = { data: "Helloo World", priority: 3 };
      pq.enqueue(data);
      expect(pq.size).toEqual(1);
      expect(pq.queue.length).toEqual(1);
      expect(pq.queue[0].data).toEqual("Helloo World");
    });
    test("should correctly enque an element when multiple elements present", () => {
      const pq = new PriorityQueueMax();
      const dataOne = { data: "Helloo World", priority: 3 };
      const dataTwo = { data: "test", priority: 1 };
      const dataThree = { data: "test beginning", priority: 5 };
      pq.enqueue(dataOne);
      pq.enqueue(dataTwo);
      pq.enqueue(dataThree);
      expect(pq.size).toEqual(3);
      expect(pq.queue.length).toEqual(3);
      expect(pq.queue[0].priority).toEqual(5);
      expect(pq.queue[1].priority).toEqual(1);
      expect(pq.queue[2].priority).toEqual(3);
    });

    test("should correctly enque an element when multiple elements present in a more complicated example", () => {
      const pq = new PriorityQueueMax();
      const dataOne = { data: "test 3", priority: 3 };
      const dataTwo = { data: "test 1", priority: 1 };
      const dataThree = { data: "test 5", priority: 5 };
      const dataFour = { data: "test 7", priority: 7 };
      const dataFive = { data: "test 2", priority: 2 };
      pq.enqueue(dataOne);
      pq.enqueue(dataTwo);
      pq.enqueue(dataThree);
      pq.enqueue(dataFour);
      pq.enqueue(dataFive);
      expect(pq.size).toEqual(5);
      expect(pq.queue.length).toEqual(5);
      expect(pq.queue[0].priority).toEqual(7);
      expect(pq.queue[1].priority).toEqual(5);
      expect(pq.queue[2].priority).toEqual(3);
      expect(pq.queue[3].priority).toEqual(1);
      expect(pq.queue[4].priority).toEqual(2);
    });
  });

  describe("Dequeue", () => {
    test("should correctly dequeue an element when 1 element present", () => {
      const pq = new PriorityQueueMax();
      const data = { data: "Helloo World", priority: 3 };
      pq.enqueue(data);
      expect(pq.size).toEqual(1);
      expect(pq.queue.length).toEqual(1);
      const result = pq.dequeue();
      expect(result.priority).toEqual(3);
      expect(pq.size).toEqual(0);
      expect(pq.queue.length).toEqual(0);
    });
    test("should correctly dequeue an element when multiple elements present and maintain list", () => {
      const pq = new PriorityQueueMax();
      const dataOne = { data: "Helloo World", priority: 3 };
      const dataTwo = { data: "test", priority: 1 };
      const dataThree = { data: "test beginning", priority: 5 };
      pq.enqueue(dataOne);
      pq.enqueue(dataTwo);
      pq.enqueue(dataThree);
      expect(pq.size).toEqual(3);
      expect(pq.queue.length).toEqual(3);
      const result = pq.dequeue();
      expect(pq.size).toEqual(2);
      expect(pq.queue.length).toEqual(2);
      expect(result.priority).toEqual(5);
      expect(pq.queue[0].priority).toEqual(3);
      const resultTwo = pq.dequeue();
      expect(pq.size).toEqual(1);
      expect(pq.queue.length).toEqual(1);
      expect(resultTwo.priority).toEqual(3);
      expect(pq.queue[0].priority).toEqual(1);
    });

    test("should correctly dequeue an element when called repeatedly with no items in queue", () => {
      const pq = new PriorityQueueMax();
      const dataOne = { data: "Helloo World", priority: 3 };
      pq.enqueue(dataOne);
      expect(pq.size).toEqual(1);
      expect(pq.queue.length).toEqual(1);
      const result = pq.dequeue();
      expect(pq.size).toEqual(0);
      expect(pq.queue.length).toEqual(0);
      expect(result.priority).toEqual(3);
      expect(pq.queue[0]).toEqual(undefined);
      const resultTwo = pq.dequeue();
      expect(pq.size).toEqual(0);
      expect(pq.queue.length).toEqual(0);
      expect(resultTwo).toEqual(undefined);
      expect(pq.queue[0]).toEqual(undefined);
    });

    test("should correctly dequeue when threee elements", () => {
      const pq = new PriorityQueueMax();
      const dataOne = { data: "test 3", priority: 3 };
      const dataFive = { data: "test 2", priority: 2 };
      const dataTwo = { data: "test 1", priority: 1 };
      pq.enqueue(dataOne);
      pq.enqueue(dataFive);
      pq.enqueue(dataTwo);
      expect(pq.size).toEqual(3);
      expect(pq.queue[0].priority).toEqual(3);
      expect(pq.queue[1].priority).toEqual(2);
      expect(pq.queue[2].priority).toEqual(1);

      let result = pq.dequeue();
      expect(pq.size).toEqual(2);
      expect(result.priority).toEqual(3);
      expect(pq.queue[0].priority).toEqual(2);
      result = pq.dequeue();
      expect(pq.size).toEqual(1);
      expect(result.priority).toEqual(2);
      expect(pq.queue[0].priority).toEqual(1);
      result = pq.dequeue();
      expect(pq.size).toEqual(0);
      expect(result.priority).toEqual(1);
      expect(pq.queue[0]).toEqual(undefined);
      result = pq.dequeue();
      expect(pq.size).toEqual(0);
      expect(result).toEqual(undefined);
      expect(pq.queue[0]).toEqual(undefined);
    });

    test("should correctly enque an element when multiple elements present in a more complicated example", () => {
      const pq = new PriorityQueueMax();
      const dataOne = { data: "test 3", priority: 3 };
      const dataTwo = { data: "test 1", priority: 1 };
      const dataThree = { data: "test 5", priority: 5 };
      const dataFour = { data: "test 7", priority: 7 };
      const dataFive = { data: "test 2", priority: 2 };
      pq.enqueue(dataOne);
      pq.enqueue(dataTwo);
      pq.enqueue(dataThree);
      pq.enqueue(dataFour);
      pq.enqueue(dataFive);
      expect(pq.size).toEqual(5);
      expect(pq.queue[0].priority).toEqual(7);
      expect(pq.queue[1].priority).toEqual(5);
      expect(pq.queue[2].priority).toEqual(3);
      expect(pq.queue[3].priority).toEqual(1);
      expect(pq.queue[4].priority).toEqual(2);

      let result = pq.dequeue();
      expect(pq.size).toEqual(4);
      expect(result.priority).toEqual(7);
      expect(pq.queue[0].priority).toEqual(5);
      expect(pq.queue[1].priority).toEqual(2);
      expect(pq.queue[2].priority).toEqual(3);
      expect(pq.queue[3].priority).toEqual(1);

      result = pq.dequeue();
      expect(pq.size).toEqual(3);
      expect(result.priority).toEqual(5);
      expect(pq.queue[0].priority).toEqual(3);
      expect(pq.queue[1].priority).toEqual(2);
      expect(pq.queue[2].priority).toEqual(1);

      result = pq.dequeue();
      expect(pq.size).toEqual(2);
      expect(result.priority).toEqual(3);
      expect(pq.queue[0].priority).toEqual(2);
      expect(pq.queue[1].priority).toEqual(1);

      result = pq.dequeue();
      expect(pq.size).toEqual(1);
      expect(result.priority).toEqual(2);
      expect(pq.queue[0].priority).toEqual(1);

      result = pq.dequeue();
      expect(pq.size).toEqual(0);
      expect(result.priority).toEqual(1);
      expect(pq.queue[0]).toEqual(undefined);

      result = pq.dequeue();
      expect(pq.size).toEqual(0);
      expect(result).toEqual(undefined);
      expect(pq.queue[0]).toEqual(undefined);
    });
  });
});

describe("Priority Queue Min", () => {
  test("should instantiate priority queue with blank array", () => {
    const pq = new PriorityQueueMin();
    expect(pq.size).toEqual(0);
    expect(pq.queue.length).toEqual(0);
  });
  describe("Enqueue", () => {
    test("should correctly enque an element when no elements present", () => {
      const pq = new PriorityQueueMin();
      const data = { data: "Helloo World", priority: 3 };
      pq.enqueue(data);
      expect(pq.size).toEqual(1);
      expect(pq.queue.length).toEqual(1);
      expect(pq.queue[0].data).toEqual("Helloo World");
    });
    test("should correctly enque an element when multiple elements present", () => {
      const pq = new PriorityQueueMin();
      const dataOne = { data: "Helloo World", priority: 3 };
      const dataTwo = { data: "test", priority: 1 };
      const dataThree = { data: "test beginning", priority: 5 };
      pq.enqueue(dataOne);
      pq.enqueue(dataTwo);
      pq.enqueue(dataThree);
      expect(pq.size).toEqual(3);
      expect(pq.queue.length).toEqual(3);
      expect(pq.queue[0].priority).toEqual(1);
      expect(pq.queue[1].priority).toEqual(3);
      expect(pq.queue[2].priority).toEqual(5);
    });

    test("should correctly enque an element when multiple elements present in a more complicated example", () => {
      const pq = new PriorityQueueMin();
      const dataOne = { data: "test 3", priority: 3 };
      const dataTwo = { data: "test 1", priority: 1 };
      const dataThree = { data: "test 5", priority: 5 };
      const dataFour = { data: "test 7", priority: 7 };
      const dataFive = { data: "test 2", priority: 2 };
      pq.enqueue(dataOne);
      pq.enqueue(dataTwo);
      pq.enqueue(dataThree);
      pq.enqueue(dataFour);
      pq.enqueue(dataFive);
      expect(pq.size).toEqual(5);
      expect(pq.queue.length).toEqual(5);
      expect(pq.queue[0].priority).toEqual(1);
      expect(pq.queue[1].priority).toEqual(2);
      expect(pq.queue[2].priority).toEqual(5);
      expect(pq.queue[3].priority).toEqual(7);
      expect(pq.queue[4].priority).toEqual(3);
    });
  });
  describe("Dequeue", () => {
    test("should correctly dequeue an element when 1 element present", () => {
      const pq = new PriorityQueueMin();
      const data = { data: "Helloo World", priority: 3 };
      pq.enqueue(data);
      expect(pq.size).toEqual(1);
      expect(pq.queue.length).toEqual(1);
      const result = pq.dequeue();
      expect(result.priority).toEqual(3);
      expect(pq.size).toEqual(0);
      expect(pq.queue.length).toEqual(0);
    });
    test("should correctly dequeue an element when multiple elements present and maintain list", () => {
      const pq = new PriorityQueueMin();
      const dataOne = { data: "Helloo World", priority: 3 };
      const dataTwo = { data: "test", priority: 1 };
      const dataThree = { data: "test beginning", priority: 5 };
      pq.enqueue(dataOne);
      pq.enqueue(dataTwo);
      pq.enqueue(dataThree);
      expect(pq.size).toEqual(3);
      expect(pq.queue.length).toEqual(3);
      const result = pq.dequeue();
      expect(pq.size).toEqual(2);
      expect(pq.queue.length).toEqual(2);
      expect(result.priority).toEqual(1);
      expect(pq.queue[0].priority).toEqual(3);
      const resultTwo = pq.dequeue();
      expect(pq.size).toEqual(1);
      expect(pq.queue.length).toEqual(1);
      expect(resultTwo.priority).toEqual(3);
      expect(pq.queue[0].priority).toEqual(5);
    });

    test("should correctly dequeue an element when called repeatedly with no items in queue", () => {
      const pq = new PriorityQueueMin();
      const dataOne = { data: "Helloo World", priority: 3 };
      pq.enqueue(dataOne);
      expect(pq.size).toEqual(1);
      expect(pq.queue.length).toEqual(1);
      const result = pq.dequeue();
      expect(pq.size).toEqual(0);
      expect(pq.queue.length).toEqual(0);
      expect(result.priority).toEqual(3);
      expect(pq.queue[0]).toEqual(undefined);
      const resultTwo = pq.dequeue();
      expect(pq.size).toEqual(0);
      expect(pq.queue.length).toEqual(0);
      expect(resultTwo).toEqual(undefined);
      expect(pq.queue[0]).toEqual(undefined);
    });

    test("should correctly dequeue when threee elements", () => {
      const pq = new PriorityQueueMin();
      const dataOne = { data: "test 3", priority: 3 };
      const dataFive = { data: "test 2", priority: 2 };
      const dataTwo = { data: "test 1", priority: 1 };
      pq.enqueue(dataOne);
      pq.enqueue(dataFive);
      pq.enqueue(dataTwo);
      expect(pq.size).toEqual(3);
      expect(pq.queue[0].priority).toEqual(1);
      expect(pq.queue[1].priority).toEqual(3);
      expect(pq.queue[2].priority).toEqual(2);

      let result = pq.dequeue();
      expect(pq.size).toEqual(2);
      expect(result.priority).toEqual(1);
      expect(pq.queue[0].priority).toEqual(2);
      result = pq.dequeue();
      expect(pq.size).toEqual(1);
      expect(result.priority).toEqual(2);
      expect(pq.queue[0].priority).toEqual(3);
      result = pq.dequeue();
      expect(pq.size).toEqual(0);
      expect(result.priority).toEqual(3);
      expect(pq.queue[0]).toEqual(undefined);
      result = pq.dequeue();
      expect(pq.size).toEqual(0);
      expect(result).toEqual(undefined);
      expect(pq.queue[0]).toEqual(undefined);
    });

    test("should correctly enque an element when multiple elements present in a more complicated example", () => {
      const pq = new PriorityQueueMin();
      const dataOne = { data: "test 3", priority: 3 };
      const dataTwo = { data: "test 1", priority: 1 };
      const dataThree = { data: "test 5", priority: 5 };
      const dataFour = { data: "test 7", priority: 7 };
      const dataFive = { data: "test 2", priority: 2 };
      pq.enqueue(dataOne);
      pq.enqueue(dataTwo);
      pq.enqueue(dataThree);
      pq.enqueue(dataFour);
      pq.enqueue(dataFive);
      expect(pq.size).toEqual(5);
      expect(pq.queue[0].priority).toEqual(1);
      expect(pq.queue[1].priority).toEqual(2);
      expect(pq.queue[2].priority).toEqual(5);
      expect(pq.queue[3].priority).toEqual(7);
      expect(pq.queue[4].priority).toEqual(3);

      let result = pq.dequeue();
      expect(pq.size).toEqual(4);
      expect(result.priority).toEqual(1);
      expect(pq.queue[0].priority).toEqual(2);
      expect(pq.queue[1].priority).toEqual(3);
      expect(pq.queue[2].priority).toEqual(5);
      expect(pq.queue[3].priority).toEqual(7);

      result = pq.dequeue();
      expect(pq.size).toEqual(3);
      expect(result.priority).toEqual(2);
      expect(pq.queue[0].priority).toEqual(3);
      expect(pq.queue[1].priority).toEqual(7);
      expect(pq.queue[2].priority).toEqual(5);

      result = pq.dequeue();
      expect(pq.size).toEqual(2);
      expect(result.priority).toEqual(3);
      expect(pq.queue[0].priority).toEqual(5);
      expect(pq.queue[1].priority).toEqual(7);

      result = pq.dequeue();
      expect(pq.size).toEqual(1);
      expect(result.priority).toEqual(5);
      expect(pq.queue[0].priority).toEqual(7);

      result = pq.dequeue();
      expect(pq.size).toEqual(0);
      expect(result.priority).toEqual(7);
      expect(pq.queue[0]).toEqual(undefined);

      result = pq.dequeue();
      expect(pq.size).toEqual(0);
      expect(result).toEqual(undefined);
      expect(pq.queue[0]).toEqual(undefined);
    });
  });
});
