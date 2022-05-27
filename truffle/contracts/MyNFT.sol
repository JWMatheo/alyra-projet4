// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.6.0) (token/ERC721/ERC721.sol)

/* renvoie le tokenUri en fonction de id du token
 dans la fonction _mint, la fonction _setTokenURI crée la correspondance  id <-> uri */
// ipfs://ipfs/QmWpgK9kZNokMgLWSe8PSwN7FS4KgHuzBerRaYkMFyaST2/creerParMoiDatacopy
// /ipfs/QmWpgK9kZNokMgLWSe8PSwN7FS4KgHuzBerRaYkMFyaST2/creerParMoiDatacopy1.json

pragma solidity 0.8.14;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

// 1 appel du contrat ERC721.sol
// 2 pour incrémenter u n id a chaque qu'on crée un token
import "@openzeppelin/contracts/utils/Counters.sol";
// 6
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// ERC721URIStorage,

contract MyNFT is ERC721Enumerable {
    using Strings for uint256;
    event CreatedURI(string _realisedURI, uint256 _tokenId);
    string public extension = ".json";
    string _baseCollectionURI;
    address _marketPlaceAdress; // = MARKETPLACE ADDRESS;
    address MsgSenderAddress;
    bool _approved = true;

    using Counters for Counters.Counter; // Counter structure uint contenue dans la librairie Counters du fichier importé Counter.sol

    Counters.Counter private _tokenId; // création du compteur idArticles

    constructor(
        string memory _Collectionname,
        string memory _Collectionsymbol,
        string memory _CollectionBaseUri,
        address _marketplaceAddres
    ) ERC721(_Collectionname, _Collectionsymbol) {
        _baseCollectionURI = _CollectionBaseUri;
        setMarketplaceAddress(_marketplaceAddres);
    }

    function setMarketplaceAddress(address _marketplaceAddres) public {
        _marketPlaceAdress = _marketplaceAddres;
    }

    function setAddressToMsgSenderOfListTokenFromMarketPlaceContract(
        address _MsgSenderAddress
    ) public {
        MsgSenderAddress = _MsgSenderAddress;
    }

    // Remplacer NFTcreators par une variable dynamique
    function setApprovalForAll(address operator, bool approved)
        public
        virtual
        override(ERC721, IERC721)
    {
        _setApprovalForAll(MsgSenderAddress, operator, approved);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override(ERC721, IERC721) {
        //solhint-disable-next-line max-line-length
        require(
            _isApprovedOrOwner(from, tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );

        _transfer(from, to, tokenId);
    }

    address NFTcreators;

    function mint(address ownerOfNFTContratIs) public returns (uint256) {
        _tokenId.increment();
        uint256 id = _tokenId.current();
        NFTcreators = ownerOfNFTContratIs;
        _mint(ownerOfNFTContratIs, id);
        return (id);
    }

    /**   Vient de URIstorage.sol
     * @dev Sets `_tokenURI` as the tokenURI of `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */

    // renvoie le uri du token
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return (
            bytes(_baseCollectionURI).length > 0
                ? string(
                    abi.encodePacked(
                        _baseCollectionURI,
                        tokenId.toString(),
                        extension
                    )
                )
                : ""
        );
    }
}
