pragma solidity ^0.4.15;

/*import zeppelin if needed*/

contract ClientList {

  struct userInfo {
    address userAddress;
    string userName;
  }

  mapping(address => userInfo) UserList;
  mapping(address => bytes32) TransactionLog;


  /*add users to transaction log*/
  function newUser(address _userAddress, string _userName) public {

    userInfo memory ui = userInfo({
      userAddress: _userAddress,
      userName: _userName
      });

      UserList[_userAddress] = ui;

      userAdded(ui.userAddress, ui.userName);
  }

  /*add pointer to user transaction log on IPFS*/
  function newTransaction(address _userAddress, bytes32 _IPFSAddress) public {

    TransactionLog[_userAddress] = _IPFSAddress;

    transactionAdded(_userAddress, _IPFSAddress);
  }

  /*returns transactoin log address on IPFS*/
  function getTransctionHistory(address _userAddress) public returns(bytes32 IPFSAddress){

    return TransactionLog[_userAddress];

  }

  event userAdded(address _userAddress, string _userName);
  event transactionAdded(address _userName, bytes32 _IPFSAddress);
}
