import styled from "styled-components";

const StyledWrapper = styled.div`
  .fancy {
    background-color: transparent;
    border: 2px solid #00DC82;
    border-radius: 5px;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-weight: 700;
    letter-spacing: 0.05em;
    margin: 0;
    outline: none;
    overflow: visible;
    padding: 1.25em 2em;
    position: relative;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    font-size: 13px;
  }

  .fancy::before {
    content: " ";
    width: 1.5625rem;
    height: 2px;
    background: white;
    top: 50%;
    left: 1.5em;
    position: absolute;
    transform: translateY(-50%);
    transition: background 0.3s linear , width 0.3s linear;
  }

  .fancy .text {
    font-size: 1.125em;
    padding-left: 2em;
    display: block;
    text-align: left;
    transition: all 0.3s ease-in-out;
    color: #fff;
    text-transform: uppercase;
  }

  .fancy .top-key {
    height: 2px;
    width: 1.5625rem;
    top: -2px;
    left: 0.625rem;
    position: absolute;
    background: black;
    transition: width 0.5s ease-out, left 0.3s ease-out;
  }

  .fancy .bottom-key-1 {
    height: 2px;
    width: 1.5625rem;
    right: 1.875rem;
    bottom: -2px;
    position: absolute;
    background: black;
    transition: width 0.5s ease-out, right 0.3s ease-out;
  }

  .fancy .bottom-key-2 {
    height: 2px;
    width: 0.625rem;
    right: 0.625rem;
    bottom: -2px;
    position: absolute;
    background: black;
    transition: width 0.5s ease-out, right 0.3s ease-out;
  }

  .fancy:hover {
    color: black;
    background: #00DC82;
  }

  .fancy:hover::before {
    width: 0.9375rem;
    background: black;
  }

  .fancy:hover .text {
    color: black;
    padding-left: 1.5em;
  }

  .fancy:hover .top-key {
    left: -2px;
    width: 0;
  }

  .fancy:hover .bottom-key-1,
  .fancy:hover .bottom-key-2 {
    right: 0;
    width: 0;
  }
`;

type FancyButtonProps = {
  onClick: () => void;
  text: string;
};

export const FancyButton = ({ onClick, text }: FancyButtonProps) => (
  <StyledWrapper>
    <a className="fancy" onClick={onClick}>
      <span className="top-key" />
      <span className="text">{text}</span>
      <span className="bottom-key-1" />
      <span className="bottom-key-2" />
    </a>
  </StyledWrapper>
);
