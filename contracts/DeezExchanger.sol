// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "./Deez.sol";

contract DeezExchanger {
  Deez public deez;
  uint public exchangeRate = 1000;

  event PurchaseSuccessful(address buyer, address deez, uint256 amount);

  event SellSuccessful(address seller, address deez, uint256 amount);

  constructor(Deez _deez) public {
    deez = _deez;
  }

  //TODO: use wei instead of ether bc solidity is retarded
  function buyDeez() public payable {
    uint256 deezAmount = msg.value * exchangeRate / 1 ether;
    require(deez.balanceOf(address(this)) >= deezAmount, "Exchanger out of tokens");
    deez.transfer(msg.sender, deezAmount);
    emit PurchaseSuccessful(msg.sender, address(deez), deezAmount);
  }

  function sellDeez(uint256 deezAmount) public {
    uint256 ethAmount = deezAmount / exchangeRate * 1 ether;
    require(address(this).balance >= ethAmount, "Exchanger out of eth");
    deez.transferFrom(msg.sender, address(this), deezAmount);
    msg.sender.transfer(ethAmount);
    emit SellSuccessful(msg.sender, address(deez), deezAmount);
  }
}