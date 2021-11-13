// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract Deez {
  mapping(address => uint256) public balances;
  mapping(address => mapping(address => uint256)) public allowances;

  uint256 supply;

  event Transfer(address from, address to, uint256 value);

  event Approval(address owner, address spender, uint256 value);

  constructor() public {
    supply = 1000000;
    balances[msg.sender] = supply;
  }

  function totalSupply() public view returns (uint256) {
    return supply;
  }

  function balanceOf(address account) public view returns (uint256) {
    return balances[account];
  }

  function transfer(address recipient, uint256 amount) public returns (bool) {
    require(balances[msg.sender] >= amount, "Insufficient balance");
    balances[msg.sender] -= amount;
    balances[recipient] += amount;
    emit Transfer(msg.sender, recipient, amount);
  }

  function allowance(address owner, address spender) public view returns (uint256) {
    return allowances[owner][spender];
  }

  function approve(address spender, uint256 amount) public returns (bool) {
    allowances[msg.sender][spender] = amount;
    emit Approval(msg.sender, spender, amount);
  }

  function transferFrom(address from, address to, uint256 amount) public returns (bool) {
    require(balances[from] >= amount, "Insufficient balance");
    require(amount <= allowances[from][to], "Amount exceeds allowance");
    balances[from] -= amount;
    balances[to] += amount;
    emit Transfer(from, to, amount);
  }
}