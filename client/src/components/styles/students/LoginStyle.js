import styled from "styled-components";

export default styled.div`
  text-align: center;
  width: 500px;
  margin: 0 auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  h1 {
    font-size: 3rem;
    text-transform: uppercase;
  }
  p {
    font-size: 1.2rem;
  }
  .margin {
    margin-bottom: 60px;
  }
  @media (max-width: 600px) {
    width: 350px;
  }
  input[type="submit"] {
    width: 100%;
    padding: 20px;
    border-radius: 0.3rem;
    font-size: 1.3rem;
    color: #fff;
    background: #212121;
    outline: none;
    border: none;
  }
`;
