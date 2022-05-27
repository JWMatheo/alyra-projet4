// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "./MyNFT.sol";

contract NFTFactory {
    event Deploy(address _address);

    function DeployYourNFT(
        uint256 _salt,
        string calldata _Collectionname,
        string calldata _Collectionsymbol,
        string calldata _CollectionBaseUri,
        address _marketplaceAddres
    ) external returns (address) {
        MyNFT _contract = new MyNFT{salt: bytes32(_salt)}(
            _Collectionname,
            _Collectionsymbol,
            _CollectionBaseUri,
            _marketplaceAddres
        );
        emit Deploy(address(_contract));
        return address(_contract);
    }
}
