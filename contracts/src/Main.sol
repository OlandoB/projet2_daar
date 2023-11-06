// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "./Collection.sol";
import "./Card.sol";

contract Main {
  int private count;
 

  mapping(int => Collection) private collections;

  constructor() {
    count = 0;
  }

  function createCollection(string calldata name, int cardCount) external {
    collections[count++] = new Collection(name, cardCount);
  }

  function addCardToCollection(int i, string calldata cardName) external {
    require(i >= 0 && i < count, "Collection non trouve");

    Card newCard = new Card(cardName, "eth", msg.sender); 
    collections[i].addCard(newCard);
  }

  function booster(int i) external {
    require(i >= 0 && i < count, "Collection non trouve");
    Collection collection = collections[i];
    uint collectionSize = collection.getCardTotal();
    require(collectionSize >= 10, "Collection incomplete");

    for (uint j = 0; j < 10; j++) {
      uint256 randIndex = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, j))) % collectionSize;
      Card[] memory cards = collection.getCards();
      Card card = cards[randIndex];
      card.mint(msg.sender, randIndex);
    }
  }

  function single(int i) external {
    require(i >= 0 && i < count, "Collection non trouve");
    Collection collection = collections[i];
    uint collectionSize = collection.getCardTotal();
    require(collectionSize >= 1, "Collection incomplete");

    uint256 randIndex = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, block.difficulty))) % collectionSize;
    Card[] memory cards = collection.getCards();
    Card card = cards[randIndex];
    card.mint(msg.sender, randIndex);
  }
}
