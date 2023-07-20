

const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-direction: row;

    gap: 20px;
    padding: 16px;
    border-radius: 16px;
    background: rgb(247, 249, 251);
    width: 100%;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
  
  button {
    border-radius: 1000px;
    height: 34px;
    padding: 8px 16px;
    border: 2px solid rgb(12, 34, 70);    line-height: 1.2;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: black;
    :hover {
      background: transparent;
      border: 2px solid rgb(12, 34, 70);    line-height: 1.2;
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
    
    .value {
      font-size: 40px;
    }
    input {
      text-align: end;
      outline: none;
      border: none;
      font-size: 40px;

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

const Icon = ({ url }) => (
  <img
    src={url}
    width={50}
    height={50}
    alt="coin icon"
  />
);

const Highlight = styled.div`
  font-weight: bold;
`;

return (
  <Wrapper>
    <Left>
      <Highlight>You'll get</Highlight>
      <div>1 stNEAR = {props.price || 0}</div>
    </Left>
    <Right>
      <span className="value"><Icon url={props.iconUrl} /> {props.value || 0}</span>
      <div>{props.iconName}</div>
    </Right>
  </Wrapper >
);