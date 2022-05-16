// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.6.0) (token/ERC721/ERC721.sol)

/* renvoie le tokenUri en fonction de id du token
 dans la fonction _mint, la fonction _setTokenURI crée la correspondance  id <-> uri */
// ipfs://ipfs/QmWpgK9kZNokMgLWSe8PSwN7FS4KgHuzBerRaYkMFyaST2/creerParMoiDatacopy
// /ipfs/QmWpgK9kZNokMgLWSe8PSwN7FS4KgHuzBerRaYkMFyaST2/creerParMoiDatacopy1.json

pragma solidity 0.8.13;

// import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
// import'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol';

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// 1 appel du contrat ERC721.sol
// import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol';
// 2 pour incrémenter u n id a chaque qu'on crée un token
// import'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol';
import "@openzeppelin/contracts/utils/Counters.sol";
// 6 
// import'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Strings.sol';
import "@openzeppelin/contracts/utils/Strings.sol";
//   using Counters for Counters.Counter; // Counter structure uint contenue dans la librairie Counters du fichier importé Counter.sol
 
//    Counters.Counter private idArticles; // création du compteur idArticles

// ERC721URIStorage,

contract MonNft is ERC721Enumerable {
    using Strings for uint256;
    event CreatedURI(string _realisedURI, uint _tokenId);
    string public extension = ".json";
    // uint256 public maxSupply= 20;
    string _baseCollectionURI;
    address _marketPlaceAdress; // = MARKETPLACE ADDRESS;
    bool _approved = true;
    // bool public contractEnPause = true; // front pour hidden collection
    // bool public _AffCollection = false; // front pour hidden collection

    using Counters for Counters.Counter; // Counter structure uint contenue dans la librairie Counters du fichier importé Counter.sol
 
    Counters.Counter private _tokenId; // création du compteur idArticles

    constructor (string memory _Collectionname,
                 string memory _Collectionsymbol,
                 string memory _CollectionBaseUri,
                 address _marketplaceAddres) ERC721(_Collectionname,_Collectionsymbol){

        _baseCollectionURI = _CollectionBaseUri;
        setMarketplaceAddress(_marketplaceAddres);
    }
function setMarketplaceAddress(address _marketplaceAddres) public {
  _marketPlaceAdress = _marketplaceAddres;
}
function setApprovalForAll(address operator, bool approved) public virtual override(ERC721, IERC721) {
        _setApprovalForAll(NFTcreators, operator, approved);
    }
function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override(ERC721, IERC721) {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(from, tokenId), "ERC721: transfer caller is not owner nor approved");

        _transfer(from, to, tokenId);
    }
address NFTcreators;

function mint(address ownerOfNFTContratIs) public returns(uint){
    _tokenId.increment();     
    uint256 id = _tokenId.current();
    NFTcreators = ownerOfNFTContratIs;
    _mint(ownerOfNFTContratIs, id);
    return (id);
    // string memory _uri;
    // require(!contractEnPause,"Attendre l'ouverture de la creation");      
        // _uri= tokenURI(id);
        // _setTokenURI(id, _uri);
        // Collection[id]=Article(id,msg.sender,_uri, _prix,address(0));
   // }
}





// fonction qui retourne à partir de l'index , un tableau du nombre de  token détenus par un propriétaire 
    // function walletOfowner(address _owner) view public returns(uint256[] memory) {

    //     // balance des tokens du propriétaire
    //     uint256 ownerTokenCount;
    //     ownerTokenCount= balanceOf(_owner);

    //     // on veut faire correspondre la balance du owner à partir de l'index
    //     uint256[] memory tokenIds= new uint256[](ownerTokenCount);

    //        for (uint256 i; i <= ownerTokenCount; i++){
    //     tokenIds[i]= tokenOfOwnerByIndex(_owner,i);
    // }

    // return tokenIds;
    // }


  /**   BaseURI
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     * by default, can be overridden in child contracts.
     */
    // function _baseURI(string memory _collectionbaseURI) internal view virtual override returns (string memory) {

    //     return baseURI;
    // }

    // fonction de modification baseURI
    // function _setBaseURI(string memory _baseUri)public onlyOwner {
    //     baseURI = _baseUri;
    // }

   /**   Vient de URIstorage.sol
     * @dev Sets `_tokenURI` as the tokenURI of `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    // function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
    //     require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
    //     _tokenURIs[tokenId] = _tokenURI;
    // }



    // renvoie le uri du token
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {

        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        // if (_AffCollection==false){

        //     return imageCachee;
        // }
        // localisation de l'image dans l'ipfs

        return (bytes(_baseCollectionURI).length > 0 ? string(abi.encodePacked(_baseCollectionURI, tokenId.toString(), extension)) : "");
        
      //  return bytes(actual).length > 0 ? string(abi.encodePacked(actual, tokenId.toString(), extension)) : "";
    }

 // pour autorisation affichage collection only owner
    // function EnabledAff()public onlyOwner {
    //         _AffCollection=true;

    // }

 // pour cacher affichage collection only owner
    // function DisabledAff()public onlyOwner {
    //         _AffCollection=false;

    // }

    // pour fixer le nombre de nft max qu'on peut minter
    // function upgradeMintAmount(uint256 _mintAmount) public onlyOwner {
    //     maxMinter = _mintAmount;
    // }

    // image générique qui s'affiche avant l'ouverture de la vente de la collection
    // function setImageCachee(string memory _imageCachee) public onlyOwner{

    //     imageCachee = _imageCachee;

    // }

 // le contrat est mis en pause,  ce qui permet au owner d'administrer ses nft, prix, nombre de mint que peut faire un acheteur
    // function ActiverContract(bool _contractEnPause) public onlyOwner {
    //     contractEnPause = _contractEnPause;
    // }
}















