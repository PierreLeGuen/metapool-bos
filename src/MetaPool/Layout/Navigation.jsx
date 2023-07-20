const SidebarWrapper = styled.div`
  height: 800px; // Full viewport height
  width: 200px;  // Adjust as needed for your design
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 20px 0; // Add some padding to top and bottom
  position: fixed; // Position fixed to keep the sidebar at the same place even when the page scrolls
`;

const MenuItemWrapper = styled.div`
  display: flex;
  flex-direction: column; // Items are stacked vertically
  align-items: center; // Items are centered horizontally
  /* cursor: pointer; */
  margin-top: 20px; // Add space between logo and menu items
  justify-content: space-between;
  height: 100%;
  padding-top: 30px;
`;

const MenuItem = styled.div`
  font-weight: bold;
  &:hover {
    opacity: 0.3;
  }
  color: black;
  cursor: pointer;
`;
const MenuItem2 = styled.button`
  display: inline-flex;
  width: 184px;
  height: 40px;
  gap: 10px;
  align-items: center;
  background: rgb(206, 255, 26);
  border-width: 0px;
  border-radius: 10px;
  padding: 15px;
  letter-spacing: 0.6px;
  font-size: 1rem;
  font-weight: 700;
`;

const StNEARIcon = () => (
  <img
    src="https://ipfs.near.social/ipfs/bafkreigblrju2jzbkezxstqomekvlswl6ksqz56rohwzyoymrfzise7fdq"
    width={35}
    height={35}
    alt="StNEAR Icon"
  />
);

const BrandLogo = () => (
  <a href="https://https://www.metapool.app/" target="_blank">
    <img
      style={{
        height: "20px",
        width: "auto",
      }}
      src="https://ipfs.near.social/ipfs/bafkreifrsvlvjxo5ptwffqcoyrsyi5pdikopa722ktpmmtifmrhzpcbkxu"
      alt="Brand Logo"
      height={20}
      width={"auto"}
    />
  </a>
);


return (
  <SidebarWrapper>
    <BrandLogo />
    <MenuItemWrapper>
      <MenuItem2 onClick={() => props.updatePage("stake")}><StNEARIcon />Stake</MenuItem2>
      <span>Network: {context.networkId}</span>
    </MenuItemWrapper>
  </SidebarWrapper>
);