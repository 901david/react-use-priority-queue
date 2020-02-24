import {
  PriorityQueueEntry,
  PriorityQueueReturnValues,
  MappedPriorityQueue,
  QueueType
} from "./MappedPriorityQueue";

export const usePriorityQueue = (
  queueType: QueueType,
  data: Array<PriorityQueueEntry>
): PriorityQueueReturnValues => {
  const queue = new MappedPriorityQueue(queueType, data);

  return queue.getReturnValues();
};
