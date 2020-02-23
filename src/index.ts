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
  const priorityQueue = new MappedPriorityQueue(queueType, data);
  return priorityQueue.getReturnValues();
};
