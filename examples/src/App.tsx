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

const InitialData = {};

const App = () => {
  const [] = usePriorityQueue();
  return <Wrapper></Wrapper>;
};

export default App;
