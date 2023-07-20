const type = props.type || "primary"; // primary || outline
const size = props.size || "lg"; // lg || base
const full = props.full || "full"; // full || none
const padding = props.padding || "normal"; // normal || large

const Btn = styled.button`
  ${full === "full" && "width: 100%;"}
  border-radius: 1000px;
  font-size: ${size === "lg" ? "20px" : "16px"};
  font-weight: bold;
  padding: ${padding === "normal" ? "8px 0" : "12px 24px"};
  /* transition: all 0.3s ease-in-out; */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  line-height: 1.2;
  border-radius: 1000px;
  font-weight: 400;
  min-height: 48px;
  text-align: center;
  box-sizing: border-box;
  padding: 0 24px;
  color: ${type === "outline" ? "black" : "rgb(255, 255, 255)"};
  background: ${type === "outline" ? "transparent" : "black"};
  border: ${type === "outline" ? "2px solid black" : "2px solid transparent"};
  &:disabled {
    background: ${type === "outline" ? "transparent" : "black"};
    color: white;
  }

  &:hover {
    border: 2px solid black;
    color:  ${type === "outline" ? "white" : "black"};
    background: ${type === "outline" ? "black" : "transparent"};
  }
`;

return (
  <Btn disabled={props.disabled} onClick={props.onClick}>
    {props.text}
  </Btn>
);
