import React from "react";
import styled from "styled-components";

function ProgressBar({ load }) {
  return (
    <BAR>
      <div className={load ? "loading load" : "loading unload"} />
    </BAR>
  );
}

const BAR = styled.div`
  .loading {
    position: fixed;
    top: 0;
    display: inline-block;
    width: 100%;
    margin: 0;
    padding: 0;
    height: 0.2rem;
    background: #f1f1f1;
    overflow: hidden;
    z-index: 2;
  }
  .loading:after {
    content: "";
    position: absolute;
    left: 0;
    width: 0%;
    height: 100%;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    animation: load infinite 5s;
    background: #ff0000;
  }
  .loading.load {
    display: block;
  }
  .loading.unload {
    display: none;
  }
  @keyframes load {
    0% {
      width: 0%;
    }
    50% {
      width: 70%;
    }
    100% {
      width: 100%;
    }
  }
`;

export default ProgressBar;
