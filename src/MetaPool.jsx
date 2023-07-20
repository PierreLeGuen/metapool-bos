/** common lib start */
const accountId = props.accountId || context.accountId;
const isSignedIn = !!accountId;
const NEAR_DECIMALS = 24;
const StNEAR_DECIMALS = 24;
const BIG_ROUND_DOWN = 0;
const MIN_BALANCE_CHANGE = 0.5;

function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}
/** common lib end */

// Config for meta pool app
function getConfig(network) {
  switch (network) {
    case "mainnet":
      return {
        ownerId: "pierre-dev.near",
        contractId: "meta-pool.near",
        nodeUrl: "https://rpc.mainnet.near.org",
        appUrl: "https://www.metapool.app",
      };
    case "testnet":
      return {
        ownerId: "pierre-dev.near",
        contractId: "meta-v2.pool.testnet",
        nodeUrl: "https://rpc.testnet.near.org",
        appUrl: "https://www.metapool.app",
      };
    default:
      throw Error(`Unconfigured environment '${network}'.`);
  }
}
const config = getConfig(context.networkId);

State.init({
  page: "stake", // "stake" | "account"
  nearBalance: "",
  unstakeInfo: {},
  token: "near", // "near" | "wnear"
  action: "stake", // "stake" | "unstake" | "liquid-unstake"
});

const Main = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  /* align-items: center; */
  height: 100%;
  justify-content: space-between;

`;

const Body = styled.div`
  /* position: relative; */
  color: black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const Sidebar = styled.div`
  flex: 1; // take up a portion of the available space
`;

const Content = styled.div`
  flex: 3; // take up the rest of the available space
  margin-left: 20px;
  display: flex;
`;

const SelectToken = styled.div`
  display: flex;
  flex-direction: column;
  padding-block-end: 20px;
  width: 100%;
`;

const TokensList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const TokensItem = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 18px;
  width: 12em;
  text-align: left;
  align-items: center;

  border: 0.8px solid rgb(215, 224, 228);
  background: rgb(247, 249, 251);
  opacity: 0.8;

  border-radius: 38px;

  ${({ active }) =>
    active
      ? `
    background: rgb(206, 255, 26);
  `
      : `
    :hover {
      background: rgb(215, 224, 228);
    }
  `}

  
// add support for disabled 
  ${({ disabled }) =>
    disabled
      ? `
    background: rgb(215, 224, 228);
    opacity: 0.5;
    :hover {
      background: rgb(215, 224, 228);
    }
  ` : ``}


  div {
    display: flex;
    flex-direction: column;
  }
`;

const ActionItem = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 16px;
  width: 12em;
  text-align: left;
  align-items: center;

  border: 0.8px solid rgb(215, 224, 228);
  background: rgb(247, 249, 251);
  opacity: 0.8;

  border-radius: 24px;

  ${({ active }) =>
    active
      ? `
    background: rgb(206, 255, 26);
  `
      : `
    :hover {
      background: rgb(215, 224, 228);
    }
  `}


  div {
    display: flex;
    flex-direction: column;
  }
`;

const Actual = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid rgb(212, 224, 231);
  border-radius: 16px;
  background: rgb(255, 255, 255);

  display: flex;
  -webkit-box-align: center;
  /* align-items: center; */
  flex-direction: column;
  padding: 16px;
`;

const Background = styled.div`
    position: absolute;
    top:0;
    right: 50px;
    height: 400px;
    min-height: 300px;
    left: 250px;
    z-index: -1;
    background: rgb(206, 255, 26);
`;

// const updatePage = (pageName) => State.update({ page: pageName });
const updateAction = (action) => State.update({ action: action });


function getSTNEARBalance(accountId, subscribe) {
  const stnearBalanceRaw = Near.view(
    config.contractId,
    "ft_balance_of",
    {
      account_id: accountId,
    },
    undefined,
    subscribe
  );
  if (!stnearBalanceRaw) return "-";
  const balance = Big(stnearBalanceRaw).div(Big(10).pow(StNEAR_DECIMALS));
  return balance.lt(0) ? "0" : balance.toFixed();
}


const stnearBalance = accountId ? getSTNEARBalance(accountId) : "-";

function onLoad(data) {
  State.update({ unstakeInfo: data });
}

const ChooseToken = () => {
  return (<SelectToken>
    <p>Select token</p>
    <TokensList>
      <TokensItem onClick={() => { State.update({ token: "near" }); }} active={state.token === "near"}>
        <div>
          <div>NEAR</div>
          <div>APY 9.08%</div>
        </div>
        <img
          style={{
            height: "70%",
            width: "auto",
          }}
          src="https://ipfs.near.social/ipfs/bafkreiftukbt7zacsnbfmhppzgfk7jj4mn5qckd3j7dgto7kutgiqj3vgi"
          alt="Brand Logo"
          // height={20}
          width={"auto"}
        />
      </TokensItem>
      <TokensItem onClick={() => { State.update({ token: "wnear" }); }} active={state.token === "wnear"} disabled={true}>
        <div>
          <div>wNEAR</div>
          <div>APY 9.08%</div>
        </div>
        <img
          style={{
            height: "70%",
            width: "auto",
          }}
          src="https://ipfs.near.social/ipfs/bafkreigbbmef2vo3jcnr2llayeyom7rplcyn7efqcuo2lzclf3mr2nevwy"
          alt="wnear Logo"
          // height={20}
          width={"auto"}
        />
      </TokensItem>
    </TokensList>
  </SelectToken>);
};

const ChooseAction = () => {
  return (<SelectToken>
    <p>Select action</p>
    <TokensList>
      <ActionItem onClick={() => { State.update({ action: "stake" }); }} active={state.action === "stake"}>
        <div>Stake</div>
        <div><svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 32 32" aria-hidden="true"><path d="M16,7,6,17l1.41,1.41L15,10.83V28H2v2H15a2,2,0,0,0,2-2V10.83l7.59,7.58L26,17Z"></path><path d="M6,8V4H26V8h2V4a2,2,0,0,0-2-2H6A2,2,0,0,0,4,4V8Z"></path></svg></div>
      </ActionItem>
      <ActionItem onClick={() => { State.update({ action: "liquid-unstake" }); }} active={state.action === "liquid-unstake"}>
        <div>Fast unstake</div>
        <div><svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 32 32" aria-hidden="true"><path d="M18,30H4a2,2,0,0,1-2-2V14a2,2,0,0,1,2-2H18a2,2,0,0,1,2,2V28A2,2,0,0,1,18,30ZM4,14V28H18V14Z"></path><path d="M25,23H23V9H9V7H23a2,2,0,0,1,2,2Z"></path><path d="M30,16H28V4H16V2H28a2,2,0,0,1,2,2Z"></path></svg></div>
      </ActionItem>
      <ActionItem onClick={() => { State.update({ action: "unstake" }); }} active={state.action === "unstake"}>
        <div>Delayed unstake</div>
        <div><svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 32 32" aria-hidden="true"><path d="M15 19H17V21H15zM15 23H17V25H15z"></path><path d="M23,11.67V4h3V2H6V4H9v7.67a2,2,0,0,0,.4,1.2L11.75,16,9.4,19.13a2,2,0,0,0-.4,1.2V28H6v2H26V28H23V20.33a2,2,0,0,0-.4-1.2L20.25,16l2.35-3.13A2,2,0,0,0,23,11.67ZM21,4v7H11V4Zm0,16.33V28H11V20.33L14.25,16,12,13h8l-2.25,3Z"></path></svg></div>
      </ActionItem>
    </TokensList>
  </SelectToken>);
};

const body =
  state.page === "stake" ? (
    <Body>
      <Background />

      <Widget
        src={`${config.ownerId}/widget/MetaPool.Element.TitleAndDescription`}
      />
      <Actual>
        <div>
          <ChooseToken />
          <ChooseAction />
        </div>
        {state.action === "stake" && (
          <Widget
            src={`${config.ownerId}/widget/MetaPool.Stake`}
            props={{
              config,
              nearBalance,
              stnearBalance: stnearBalance,
              updateAccountInfo,
            }}
          />
        )}
        {state.action === "unstake" && (
          <Widget
            src={`${config.ownerId}/widget/MetaPool.Unstake`}
            props={{
              config,
              stnearBalance,
              unstakeInfo: state.unstakeInfo,
              updateAccountInfo,
              updateAction,
            }}
          />
        )}
        {state.action === "liquid-unstake" && (
          <Widget
            src={`${config.ownerId}/widget/MetaPool.LiquidUnstake`}
            props={{
              config,
              stnearBalance,
              unstakeInfo: state.unstakeInfo,
              updateAccountInfo,
            }}
          />
        )}
      </Actual>
    </Body>
  ) : (
    <Widget
      src={`${config.ownerId}/widget/MetaPool.Account`}
      props={{
        config,
        nearBalance,
        stnearBalance: stnearBalance,
        unstakeInfo: state.unstakeInfo,
        updatePage,
        updateTabName,
        updateAccountInfo,
      }}
    />
  );

return (
  <>
    <Main>
      <Sidebar>
        <Widget
          src={`${config.ownerId}/widget/MetaPool.Layout.Navigation`}
          props={{
            updatePage,
          }}
        />
      </Sidebar>
      <Content>
        {body}
      </Content>
    </Main>
  </>
);