const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: black;
  display: inline-flex;
  gap: 20px;
  align-items: center;
`;

const Description = styled.div`
  font-size: 14px;
  color: #999999;
  margin-top: 5px;
`;

const StNEARIcon = () => (
  <img
    src="https://ipfs.near.social/ipfs/bafkreigblrju2jzbkezxstqomekvlswl6ksqz56rohwzyoymrfzise7fdq"
    width={50}
    height={50}
    alt="StNEAR Icon"
  />
);
return (
  <>
    <Title><StNEARIcon />Stake</Title>
  </>
);
