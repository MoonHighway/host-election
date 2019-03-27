import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./Code.css";

const code = `import React, { useState } from "react";

let event = "React-a-thon";

export default function App() {
  let [hosts] = useState([
    { name: "Eve", eventsExp: /React|GraphQL|meowing at cats/ },
    {
      name: "Alex",
      eventsExp: /-a-thon|Marathon|anything that lasts a long time/
    }
  ]);

  return (
    <>
      {hosts
        .filter(host => event.match(host.eventsExp))
        .map(h => (
          <p>{h.name}</p>
        ))}
    </>
  );
}
`;

export default function Code() {
  return (
    <SyntaxHighlighter
      language="javascript"
      showLineNumbers={true}
      style={atomOneDark}
    >
      {code}
    </SyntaxHighlighter>
  );
}
