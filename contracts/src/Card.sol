// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Card is ERC721, Ownable {
    string public imgUri;

    constructor(string memory _name, string memory _symbol, address _ownerOf) ERC721(_name, _symbol) Ownable(_ownerOf) {
    }

    function mint(address to, uint256 tokenId) public onlyOwner {
        _mint(to, tokenId);
    }

    function transfer(address to, uint256 tokenId) public {
        require(ownerOf(tokenId) == _msgSender(), "This is not your card");
        _transfer(_msgSender(), to, tokenId);
    }

  
    function getImgURI(uint256 tokenId) public view returns (string memory) {
        address owner = ownerOf(tokenId);
        require(owner != address(0), "This card does not exist");
        return imgUri;
    }

   
}