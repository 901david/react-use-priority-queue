import React from "react";
import styled from "styled-components";
import { usePriorityQueue } from "react-use-priority-queue";

import { Wrapper } from "./App";

const InitialData = [
  { data: "Take out trash - 1", priority: 1 },
  { data: "Walk the dog - 4", priority: 4 }
];

export const ExampleTwo = () => {
  const [{ priorityQueue, lastDequeuedItem }, add, remove] = usePriorityQueue(
    "MAX",
    InitialData
  );

  const enqueueNewData = () => {
    const number = Math.floor(Math.random() * 25);
    add(`Walk dog around block - ${number}`, number);
  };

  const dequeueData = () => {
    const val = remove();
    console.log(val);
  };

  return (
    <Wrapper>
      <h1>Example 2 - using sorted array with Max Priority Queue</h1>
      <button onClick={enqueueNewData}>Enqueue Another Item</button>
      <button onClick={dequeueData}>Dequeue Another Item</button>
      <table>
        <tr>
          <th>TODO</th>
          <th>Priority</th>
        </tr>
        {priorityQueue.length > 0 &&
          priorityQueue.map((todo: any, idx: number) => (
            <tr key={idx}>
              <td>{todo.data}</td>
              <td>{todo.priority}</td>
            </tr>
          ))}
      </table>
      <hr />
      <h1> Last Item removed</h1>
      {lastDequeuedItem === undefined && <h4>Nothing has been dequeued</h4>}
      {lastDequeuedItem !== undefined && (
        <table>
          <tr>
            <th>TODO</th>
            <th>Priority</th>
          </tr>
          <tr>
            <td>{lastDequeuedItem.data}</td>
            <td>{lastDequeuedItem.priority}</td>
          </tr>
        </table>
      )}
    </Wrapper>
  );
};
