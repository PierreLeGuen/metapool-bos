/** state init start */
State.init({
  inputValue: "",
  inputError: "",
});
/** state init end */

// load config
const { config, updateAccountInfo } = props;
if (!config) {
  return "Component cannot be loaded. Missing `config` props";
}

/** common lib start */
const accountId = props.accountId || context.accountId;
const isSignedIn = !!accountId;
const NEAR_DECIMALS = 24;
const BIG_ROUND_DOWN = 0;

function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}

function formatAmount(a) {
  return isValid(a)
    ? Number(a).toLocaleString(undefined, {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    })
    : a;
}

/** common lib end */
const nearBalance = props.nearBalance || "-";
const stnearBalance = props.stnearBalance || "-";

/** events start */
const onChange = (e) => {
  // Has user signed in?
  if (!isSignedIn) {
    State.update({
      inputError: "Sign in please",
    });
    return;
  }
  const targetValue = e.target.value;
  if (targetValue !== "" && !targetValue.match(/^\d*(\.\d*)?$/)) {
    return;
  }
  let stakeAmount = targetValue.replace(/^0+/, "0"); // remove prefix 0
  // limit 24 decimals
  const most24DecimalsPattern = /^-?\d+(\.\d{0,24})?/;
  let values = stakeAmount.match(most24DecimalsPattern);
  if (values) {
    stakeAmount = values[0];
  }
  if (
    nearBalance &&
    (isNaN(Number(stakeAmount)) ||
      stakeAmount === "" ||
      Big(stakeAmount).lt(1) ||
      Big(stakeAmount).gt(Big(nearBalance)))
  ) {
    if (
      isNaN(Number(stakeAmount)) ||
      stakeAmount === "" ||
      Big(stakeAmount).lt(1)
    ) {
      State.update({
        inputValue: stakeAmount,
        inputError: "Stake at least 1 NEAR",
      });
    } else {
      State.update({
        inputValue: stakeAmount,
        inputError: `Max is ${nearBalance} NEAR`,
      });
    }
    return;
  }
  State.update({
    inputValue: stakeAmount,
    inputError: "",
  });
};

const onClickMax = () => {
  if (
    isNaN(Number(nearBalance)) ||
    nearBalance === "" ||
    Big(nearBalance).lt(1)
  ) {
    State.update({
      inputValue: nearBalance,
      inputError: "Stake at least 1 NEAR",
    });
    return;
  } else {
    State.update({
      inputValue: nearBalance,
      inputError: "",
    });
  }
};

const onClickStake = () => {
  const stakeAmount = state.inputValue;
  if (
    nearBalance &&
    (isNaN(Number(stakeAmount)) ||
      stakeAmount === "" ||
      Big(stakeAmount).lt(1) ||
      Big(stakeAmount).gt(Big(nearBalance)))
  ) {
    if (
      isNaN(Number(stakeAmount)) ||
      stakeAmount === "" ||
      Big(stakeAmount).lt(1)
    ) {
      State.update({ inputError: "Stake at least 1 NEAR" });
    } else if (Big(stakeAmount).gt(Big(nearBalance))) {
      State.update({
        inputError: `Max is ${nearBalance} NEAR`,
      });
    } else setInputError("");
    return;
  }

  const stake = {
    contractName: config.contractId,
    methodName: "deposit_and_stake",
    deposit: Big(state.inputValue).mul(Big(10).pow(NEAR_DECIMALS)).toFixed(0),
    args: {},
  };
  const registerFt = {
    contractName: config.contractId,
    methodName: "ft_balance_of",
    args: {
      account_id: accountId,
    },
  };
  const txs = [stake];
  if (Number(stnearBalance) === 0) {
    txs.push(registerFt);
  }

  Near.call(txs);

  // update account balances
  if (updateAccountInfo) {
    updateAccountInfo();
  }
};
/** events end */

const disabledStakeButton =
  !isValid(state.inputValue) || Big(state.inputValue).eq(0) || state.inputError;

const stnearPrice = Big(
  Near.view(config.contractId, "get_st_near_price", `{}`) ?? "0"
).div(Big(10).pow(24));

const receivedStnear = (
  stnearPrice.lte(0)
    ? Big(0)
    : Big(isValid(state.inputValue) ? state.inputValue : 0).div(stnearPrice)
).toFixed(5, BIG_ROUND_DOWN);
const formattedReceivedStnear = formatAmount(receivedStnear);

const StakeFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  border-radius: 16px;
  width: 100%;
  align-items: center;
  div {
    gap: 20px;
  }
`;

const Spacer = styled.div`
  height: 20px;
`;

return (
  <StakeFormWrapper>
    <div>
      <Widget
        src={`${config.ownerId}/widget/MetaPool.Element.Input`}
        props={{
          placeholder: "Enter NEAR amount",
          value: state.inputValue,
          onChange,
          onClickMax,
          inputError: state.inputError,
          balance: nearBalance,
          iconName: "NEAR",
          iconUrl:
            "https://ipfs.near.social/ipfs/bafkreid5xjykpqdvinmj432ldrkbjisrp3m4n25n4xefd32eml674ypqly",
        }}
      />
      <Spacer />
      <Widget
        src={`${config.ownerId}/widget/MetaPool.Element.YouWillGet`}
        props={{
          value: formattedReceivedStnear,
          price: stnearPrice
            .toPrecision(5)
            .replace(/\.?0+$/, "") + " NEAR",
          iconName: "stNEAR",
          iconUrl:
            "https://ipfs.near.social/ipfs/bafkreigblrju2jzbkezxstqomekvlswl6ksqz56rohwzyoymrfzise7fdq",
        }}
      />
    </div>
    <Widget
      src={`${config.ownerId}/widget/MetaPool.Element.Button`}
      props={{
        onClick: onClickStake,
        disabled: disabledStakeButton,
        text: "Stake now",
      }}
    />
  </StakeFormWrapper >
);
