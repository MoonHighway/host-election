import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./Code.css";

const code = `{
  event: "React-a-thon",
  availableHosts: [
    {
      name: "Eve",
      matchEvent: /(R|r)eact/
    },
    {
      name: "Alex",
      matchEvent: /-a-thon/
    }
  ]
}`;

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
