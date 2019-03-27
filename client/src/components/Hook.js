import React from "react";
import hook from "./hook.png";
import skull from "./skull.png";
import "./Hook.css";

export default function Hook() {
  const snowingAnimations = [
    [600, "0s"],
    [0, "1s"],
    [800, "2s"],
    [200, "3s"],
    [400, "5.5s"],
    [window.innerWidth - 200, ".5s"],
    [window.innerWidth - 300, "1.5s"],
    [window.innerWidth - 400, "2.5s"],
    [window.innerWidth - 500, "3.5s"]
  ];

  document.body.onkeydown = ({ key }) => {
    switch (key) {
      case "ArrowRight":
        return (window.location = "/results/#/code");
      case "ArrowDown":
        return (window.location = "/results/#/code");
      case "ArrowLeft":
        return (window.location = "/results/#/hook");
      case "ArrowUp":
        return (window.location = "/results/#/hook");
      default:
        break;
    }
  };

  return (
    <>
      {snowingAnimations.map(([left, animationDelay], i) => (
        <img
          key={i}
          className="skull"
          src={skull}
          style={{ left, animationDelay }}
          alt="snowing skull"
        />
      ))}

      <img className="hook" src={hook} alt="dancing hook" />
    </>
  );
}
