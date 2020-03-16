import { renderHook, act } from "@testing-library/react-hooks";
import { usePriorityQueue } from "../";
import { PriorityQueueNode } from "../PriorityQueue";

describe("usePriorityQueue Unit Tests", () => {
  describe("When used with Min Priiority Queue", () => {
    test("should return correct value when initialized", () => {
      const { result } = renderHook(() =>
        usePriorityQueue("MIN", [
          { data: "Take out trash - 1", priority: 1 },
          { data: "Walk the dog - 4", priority: 4 }
        ])
      );
      const [{ priorityQueue, lastDequeuedItem }] = result.current;
      expect(lastDequeuedItem).toBe(undefined);
      expect(priorityQueue).toEqual([
        new PriorityQueueNode("Take out trash - 1", 1),
        new PriorityQueueNode("Walk the dog - 4", 4)
      ]);
    });

    test.skip("should return correct value when enqueuinig several items with same priority", () => {
      const { result } = renderHook(() =>
        usePriorityQueue("MIN", [
          { data: "Take out trash - 1", priority: 1 },
          { data: "Walk the dog - 4", priority: 4 }
        ])
      );

      act(() => {
        const [{ priorityQueue, lastDequeuedItem }, add] = result.current;

        add("hello - 5", 5);
        add("hello - 4", 4);
        add("hello - 4", 4);
        add("hello - 4", 4);
        add("hello - 4", 4);
        add("hello - 4", 4);
      });
      const [{ priorityQueue, lastDequeuedItem }] = result.current;
      expect(lastDequeuedItem).toBe(undefined);
      console.log(priorityQueue);
      expect(priorityQueue).toEqual([
        new PriorityQueueNode("Take out trash - 1", 1),
        new PriorityQueueNode("hello - 4", 4),
        new PriorityQueueNode("hello - 4", 4),
        new PriorityQueueNode("hello - 4", 4),
        new PriorityQueueNode("hello - 4", 4),
        new PriorityQueueNode("hello - 4", 4),
        new PriorityQueueNode("Walk the dog - 4", 4),
        new PriorityQueueNode("hello - 5", 5)
      ]);
    });
  });
});
