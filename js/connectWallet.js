const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
let contract;
let currAddr;
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      bridge: "https://bridge.walletconnect.org",
      rpc: {
        56: "https://bsc-dataseed4.binance.org/",
      },
      chainId: 56,
      network: "binance",
    },
  },
};
const connectWalletConnect = async () => {
  web3Modal = new Web3Modal({
    network: "binance", // replace mainnet to binance
    providerOptions, // required
  });

  provider = await web3Modal.connect();

  web3 = new Web3(provider);

  //   contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  const accounts = await web3.eth.getAccounts();

  // Get connected chain id from Ethereum node
  let currentNetworkId = await web3.eth.getChainId();
  currentNetworkId = currentNetworkId.toString();
  console.log("network", currentNetworkId);

  console.log("-> accounts");
  console.log(accounts);

  selectedAccount = accounts[0].toLowerCase();

  if (currentNetworkId != _NETWORK_ID) {
    notyf.error(
      `Please connect Wallet on ${_CONTRACT_DATA[_NETWORK_ID].network_name}!`
    );
    return false;
  }

  oContractToken = new web3.eth.Contract(
    _CONTRACT_DATA[_NETWORK_ID].TOKEN.abi,
    _CONTRACT_DATA[_NETWORK_ID].TOKEN.address
  );

  showHideBtns("#connect-metamask", true);

  isMetamaskConnected = true;

  $("#selected-address").html(`Address: ${selectedAccount}`);
  $("#referral-link").html(`${window?.location?.href}?ref=${selectedAccount}`);
  let sClass = getSelectedTab();

  // refreshBal(sClass);
  // getTxhistory(sClass);
  //   loadInitialData(sClass);
  getGenericData();

  $("#connect-block").hide();

  $("#current-nentwork").html(_CONTRACT_DATA[_NETWORK_ID].network_name);
  $("#addr").val(selectedAccount);

  await getUserData(selectedAccount);

  $(".metamask-connected-block").show();
};
