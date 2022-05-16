// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.6.0) (token/ERC721/ERC721.sol)

/* renvoie le tokenUri en fonction de id du token
 dans la fonction _mint, la fonction _setTokenURI crée la correspondance  id <-> uri */

pragma solidity 0.8.7;

import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol';



// 1 appel du contrat ERC721.sol
// import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol';
// 2 pour incrémenter u n id a chaque qu'on crée un token
import'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol';

// 6 
import'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol';

import'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Strings.sol';



contract MonNft is ERC721Enumerable, Ownable {
    using Strings for uint256;
    string public extension = ".json";
    uint256 public prix= 0.05 ether;
    uint256 public maxSupply= 20;
    uint256 public maxMinter = 2;
    string baseURI;
    string public imageCachee;
    bool public contractEnPause = true;
    bool public _AffCollection = false;


    constructor (string memory _name,
                 string memory _symbol,
                 string memory _uri,
                 string memory _imageUri) ERC721(_name,_symbol){

        // fonction créée plus bas
         _setBaseURI(_uri);

         
        // fonction affichage image générique, pour ne pas afficher la totalité des images avant l'ouverture de la vente
         setImageCachee(_imageUri);
         
    }





// fonction de mint de nft avec 

function mint(uint256 _mintMontant) payable public {
    require(!contractEnPause,"Attendre l'ouverture de la vente");
    uint256 supply = totalSupply();
    require(_mintMontant>0, 'Insuffisant, le montant doit etre superieur a 0');
    require(_mintMontant<=maxMinter, 'Montant max autorise de mint est 2 max');
    require(supply+_mintMontant<=maxSupply, 'Rupture de stock Nft');

    // owner()  d'ou vient cette fonction, que renvoit elle, l'adresse du owner avec quel paramètre puis que elle n'en a pas
    if(msg.sender != owner()) {

        require(msg.value== prix*_mintMontant);
    }

    for (uint256 i=1; i <= _mintMontant; i++){
        _safeMint(msg.sender,supply+i);
    }

}

// fonction qui retourne à partir de l'index , un tableau du nombre de  token détenus par un propriétaire 
    function walletOfowner(address _owner) view public returns(uint256[] memory) {

        // balance des tokens du propriétaire
        uint256 ownerTokenCount;
        ownerTokenCount= balanceOf(_owner);

        // on veut faire correspondre la balance du owner à partir de l'index
        uint256[] memory tokenIds= new uint256[](ownerTokenCount);

           for (uint256 i; i <= ownerTokenCount; i++){
        tokenIds[i]= tokenOfOwnerByIndex(_owner,i);
    }

    return tokenIds;
    }


  /**   BaseURI
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     * by default, can be overridden in child contracts.
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    // fonction de modification baseURI
    function _setBaseURI(string memory _baseUri)public onlyOwner {

        baseURI = _baseUri;
    }



    // renvoie le uri du token
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    string memory UriConc;
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        if (_AffCollection==false){

            return imageCachee;
        }

        string memory actual = _baseURI();
        // localisation de l'image dans l'ipfs
    UriConc = bytes(actual).length > 0 ? string(abi.encodePacked(actual, tokenId.toString(), extension)) : "";
        return UriConc;

      //  return bytes(actual).length > 0 ? string(abi.encodePacked(actual, tokenId.toString(), extension)) : "";
    }

 // pour autorisation affichage collection only owner
    function EnabledAff()public onlyOwner {
            _AffCollection=true;

    }





    // pour changer le prix
    function upgradePrix(uint256 _prix)public onlyOwner {
            prix = _prix;

    }

    // pour fixer le nombre de nft max qu'on peut minter
    function upgradeMintAmount(uint256 _mintAmount) public onlyOwner {
        maxMinter = _mintAmount;
    }

    // Rétribution du créateur du Nft
    function retribution()payable public onlyOwner {
        (bool success,)=payable(owner()).call{value:address(this).balance}("");
        require(success);
    }

    // sinon on peut aussi fait un widthdraw
    function withdraw() public onlyOwner {
        require(address(this).balance>0, 'aucune recette, pas de ventes effectuees');
        payable(msg.sender).transfer(address(this).balance);
    }

    // image générique qui s'affiche avant l'ouverture de la vente de la collection
    function setImageCachee(string memory _imageCachee) public onlyOwner{

        imageCachee = _imageCachee;

    }

 // le contrat est mis en pause,  ce qui permet au owner d'administrer ses nft, prix, nombre de mint que peut faire un acheteur
    function ActiverContract(bool _contractEnPause) public onlyOwner {
        contractEnPause = _contractEnPause;

    }

}

