// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "./8_NFTtest2.sol";

contract NFTFactory {
    event Deploy(address _address);
    function DeployYourNFT(uint _salt,
        string calldata _Collectionname,
        string calldata _Collectionsymbol,
        string calldata _CollectionBaseUri,
        address _marketplaceAddres)
        external returns(address){
        MonNft _contract = new MonNft{
            salt: bytes32(_salt)
        }(_Collectionname, _Collectionsymbol, _CollectionBaseUri, _marketplaceAddres);
        emit Deploy(address(_contract));
        return address(_contract);      
    }
    
    // function get(address _address) public returns(uint256) {
    //     return  ippo(_address).mint();
    // }
}