import React from "react";
import styled from "styled-components";
import { usePriorityQueue } from "react-use-priority-queue";

const Wrapper = styled.div`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
`;
interface IInitialData {}

const InitialData = [
  { data: "Take out trash", priority: 1 },
  { data: "Walk the dog", priority: 4 }
];

const App = () => {
  const [{ priorityQueue, lastDequeuedItem }, add, remove] = usePriorityQueue(
    "MIN",
    InitialData
  );

  const enqueueNewData = () => {
    add("Walk dog around block", Math.floor(Math.random() * 25));
  };

  const dequeueData = () => {
    const val = remove();
    console.log(val);
  };

  return (
    <Wrapper>
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

export default App;
