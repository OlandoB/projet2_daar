// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "./Card.sol";

contract Collection {
  string public name;
  int public cardTotal;
  int public nbCard;
  Card[] public cards;
  
  constructor(string memory _name, int _cardTotal) {
    name = _name;
    cardTotal = _cardTotal;
    nbCard = 0;
  }

  function addCard(Card _card) public  {
    require(cards.length < uint(cardTotal), "The collection is full.");
    nbCard = nbCard + 1;
    cards.push(_card);
  }

  function getCardTotal() public  view returns (uint) {
    return cards.length;
  }

  function getCards() public view returns (Card[] memory){
    return cards;
  }
}
