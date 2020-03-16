import React from "react";
import styled from "styled-components";

import { ExampleOne } from "./ExampleOne";
import { ExampleTwo } from "./ExampleTwo";

export const Wrapper = styled.div`
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

const App: React.FC<{}> = () => {
  return (
    <Wrapper>
      <ExampleOne />
      <hr />
      <ExampleTwo />
    </Wrapper>
  );
};

export default App;
