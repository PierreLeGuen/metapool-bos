const InputWrapper = styled.div`
  width: 100%;
  border-radius: 10px;
  background: white;
  padding: 20px;
  color: black;
`;

const HorizentalLine = styled.hr`
  height: 1px;
  border: none;
  background: white;
  opacity: 0.1;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const BalanceContainer = styled.div`
  color: #c1c1c1;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  .error {
    color: #ec6868;
  }
`;

const NEARInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NEARTexture = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
`;

const LogoWithText = styled.div`
  display: flex;
  align-items: center;
`;

const MaxTexture = styled.div`
  font-size: 24px;
  color: #4451fd;
  cursor: pointer;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    gap: 20px;

    padding: 16px;
    border-radius: 16px;
    border: 3px solid rgb(12, 34, 70);

`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  button {
    border-radius: 1000px;
    height: 34px;
    padding: 8px 16px;
    border: 2px solid rgb(12, 34, 70);
    line-height: 1.2;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: black;
    :hover {
      background: transparent;
      border: 2px solid rgb(12, 34, 70);   
      line-height: 1.2;
      color: black;
    }
  }
`;

const Right = styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    input {
      text-align: end;
      outline: none;
      border: none;
      font-size: 40px;
      padding-right: 0;

      /* Removes the arrows in number inputs in most browsers */
      ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Removes the arrows in Firefox */
      appearance: none;

      /* Removes the highlight around the input on some browsers when active */
      &:focus {
        outline: none;
        box-shadow: none;
      }
    }
`;
const Highlight = styled.div`
  font-weight: bold;
`;

return (
  <Wrapper>
    <Left>
      <Highlight>{props.placeholder}</Highlight>
      <button onClick={() => props.onClickMax()}>Max</button>
    </Left>
    <Right>
      <input type="number" placeholder="0" value={props.value}
        onChange={props.onChange} />
      <div>USD 0</div>
    </Right>
  </Wrapper>

);
