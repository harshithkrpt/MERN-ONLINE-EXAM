import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Navbar() {
  let login = false;

  const publicNav = (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/student_login">Student Login</Link>
      </li>
      <li>
        <Link to="/online_exam_login">Online Exam Login</Link>
      </li>
      <li>
        <Link to="/staff_login">Staff Login</Link>
      </li>
    </ul>
  );

  const logedInNav = (
    <ul>
      <li>
        <a href="#">LogOut</a>
      </li>
    </ul>
  );
  return (
    <NavBar>
      <header tabIndex="0">
        MREC EXAM CELL
        {login ? <span className="logout">Logout</span> : null}
      </header>
      <div id="nav-container">
        <div className="bg" />
        <div className="button" tabIndex="0">
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </div>
        <div id="nav-content" tabIndex="0">
          {login ? logedInNav : publicNav}
        </div>
      </div>
    </NavBar>
  );
}

const NavBar = styled.div`
  header {
    display: flex;
    position: fixed;
    width: 100%;
    height: 70px;
    background: #212121;
    color: #fff;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .logout {
    position: absolute;
    right: 20px;
  }

  .logout:hover {
    color: #bf7497;
    cursor: pointer;
  }

  #nav-container {
    position: fixed;
    height: 100vh;
    width: 100%;
    pointer-events: none;
  }
  #nav-container .bg {
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    height: calc(100% - 70px);
    visibility: hidden;
    opacity: 0;
    transition: 0.3s;
    background: #000;
  }
  #nav-container:focus-within .bg {
    visibility: visible;
    opacity: 0.6;
  }
  #nav-container * {
    visibility: visible;
  }

  .button {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 1;
    -webkit-appearance: none;
    border: 0;
    background: transparent;
    border-radius: 0;
    height: 70px;
    width: 30px;
    cursor: pointer;
    pointer-events: auto;
    margin-left: 25px;
    touch-action: manipulation;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .icon-bar {
    display: block;
    width: 100%;
    height: 3px;
    background: #aaa;
    transition: 0.3s;
  }
  .icon-bar + .icon-bar {
    margin-top: 5px;
  }

  #nav-container:focus-within .button {
    pointer-events: none;
  }
  #nav-container:focus-within .icon-bar:nth-of-type(1) {
    transform: translate3d(0, 8px, 0) rotate(45deg);
  }
  #nav-container:focus-within .icon-bar:nth-of-type(2) {
    opacity: 0;
  }
  #nav-container:focus-within .icon-bar:nth-of-type(3) {
    transform: translate3d(0, -8px, 0) rotate(-45deg);
  }

  #nav-content {
    margin-top: 70px;
    padding: 20px;
    width: 90%;
    max-width: 300px;
    position: absolute;
    top: 0;
    left: 0;
    height: calc(100% - 70px);
    background: #ececec;
    pointer-events: auto;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    transform: translateX(-100%);
    transition: transform 0.3s;
    will-change: transform;
    contain: paint;
  }

  #nav-content ul {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #nav-content li a {
    padding: 10px 5px;
    display: block;
    text-transform: uppercase;
    transition: color 0.1s;
  }

  #nav-content li a:hover {
    color: #bf7497;
  }

  #nav-content li:not(.small) + .small {
    margin-top: auto;
  }

  .small {
    display: flex;
    align-self: center;
  }

  .small a {
    font-size: 12px;
    font-weight: 400;
    color: #888;
  }
  .small a + a {
    margin-left: 15px;
  }

  #nav-container:focus-within #nav-content {
    transform: none;
  }
`;

export default Navbar;
