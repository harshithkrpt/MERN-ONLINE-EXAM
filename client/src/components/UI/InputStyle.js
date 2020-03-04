import styled from "styled-components";

const Input = styled.div`
  .Input {
    position: relative;
  }
  .Input-text {
    display: block;
    margin-top: 50px;
    margin-bottom: 50px;
    padding: var(--inputPaddingV) var(--inputPaddingH);
    color: inherit;
    width: 100%;
    font-family: inherit;
    font-size: var(--inputFontSize);
    font-weight: inherit;
    line-height: var(--inputLineHeight);
    border: none;
    border-radius: 0.4rem;
    transition: box-shadow var(--transitionDuration);
  }

  .Input-text::placeholder {
    color: #b0bec5;
  }

  .Input-text:focus {
    outline: none;
    box-shadow: 0.2rem 0.8rem 1.6rem var(--colorPrimary600);
  }

  .Input-label {
    display: block;
    position: absolute;
    bottom: 30%;
    left: 1rem;
    color: #fff;
    font-family: inherit;
    font-size: var(--inputFontSize);
    font-weight: inherit;
    line-height: var(--inputLineHeight);
    opacity: 0;
    transform: translate3d(0, var(--labelDefaultPosY), 0) scale(1);
    transform-origin: 0 0;
    transition: opacity var(--inputTransitionDuration) var(--inputTransitionTF),
      transform var(--inputTransitionDuration) var(--inputTransitionTF),
      visibility 0ms var(--inputTransitionDuration) var(--inputTransitionTF),
      z-index 0ms var(--inputTransitionDuration) var(--inputTransitionTF);
  }

  .Input-text:placeholder-shown + .Input-label {
    visibility: hidden;
    z-index: -1;
  }

  .Input-text:not(:placeholder-shown) + .Input-label,
  .Input-text:focus:not(:placeholder-shown) + .Input-label {
    visibility: visible;
    z-index: 1;
    opacity: 1;
    transform: translate3d(0, var(--labelTransformedPosY), 0)
      scale(var(--labelScaleFactor));
    transition: transform var(--inputTransitionDuration), visibility 0ms,
      z-index 0ms;
  }
  .invalid-feedback {
    position: absolute;
    color: tomato;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
  }
  .is-invalid {
    border: 3px solid tomato;
  }
`;

export default Input;
