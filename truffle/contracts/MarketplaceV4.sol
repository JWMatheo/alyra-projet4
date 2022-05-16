// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;
import "./5_NFTCopy.sol";
import "./4_NFTFactory.sol";

// import "./FactoryV3.sol";
// import "./ippoV3.sol";

contract Market {
    enum ListingStatus {
        Showable,
        Active
    }

    struct Listing {
        ListingStatus status;
        address Creator;
        address seller;
        address tokenContract;
        uint256 tokenId;
        uint256 price;
        string collection;
        string JSONTokenURI;
    }
    struct MyBuyedNFT {
        address tokenContract;
        uint256 tokenId;
        string collection;
        string JSONTokenURI;
        uint256 myindex;
    }

    event Showed(
        ListingStatus status,
        uint256 listingId,
        address Creator,
        address seller,
        address token,
        uint256 tokenId,
        string collection,
        string JSONTokenURI
    );

    event Listed(
        ListingStatus status,
        uint256 listingId,
        address Creator,
        address seller,
        address token,
        uint256 tokenId,
        uint256 price,
        string collection,
        string JSONTokenURI
    );

    event Buyed(
        ListingStatus status,
        uint256 listingId,
        address Creator,
        address seller,
        address token,
        uint256 tokenId,
        uint256 price,
        string collection,
        string JSONTokenURI
    );

    event Cancelled(
        ListingStatus status,
        uint256 listingId,
        address Creator,
        address seller,
        address token,
        uint256 tokenId,
        uint256 price,
        string collection,
        string JSONTokenURI
    );

    // ajouter modifier pour les requires;
    // modifier isOwner(address _token, uint _tokenId) {
    //     require(ERC721(_token).ownerOf((_tokenId)) == msg.sender, "Caller is not the token owner");
    //     _;
    // }
    uint256 private _buyedTokenCounter;
    bool _forApproved = true;
    uint256 private _listingId = 0;
    uint256 private _defaultPrice = 1000 ether;
    address private _factoryAddress =
        0xd9145CCE52D386f254917e481eB44e9943F39138;
    mapping(uint256 => Listing) private _listings;
    mapping(address => address[]) CollectionsOfOwner; // stocke les collections créer par une addresse
    mapping(uint256 => address[]) SellActivty; // stocke pour 1 NFT donné, la liste des addresses ayant ete en possesion du nft
    mapping(address => MyBuyedNFT[]) ListOfNFTfromUser; // stocke Uniquement les NFT achetés.

    // mapping(address=>uint[]) private _listingsOfCollection;
    // mapping (address=>uint[])) collection; // tableau des tokenID d'une collection pour les afficher sur la pages collections. on commence par l'addresse du contrat pour éviter les problèmes si 2 noms identiques.

    function getListing(uint256 listingId)
        public
        view
        returns (Listing memory)
    {
        return _listings[listingId];
    }

    function getUserCollections(address _yourAddress)
        public
        view
        returns (address[] memory)
    {
        return CollectionsOfOwner[_yourAddress];
    }

    // Obtenir l'historique d'achat
    function getSellActivity(uint256 listingId)
        public
        view
        returns (address[] memory)
    {
        Listing memory listing = _listings[listingId];
        return SellActivty[listing.tokenId];
    }

    function getListOfNFTfromUser(address _youraddress)
        public
        view
        returns (MyBuyedNFT[] memory)
    {
        return ListOfNFTfromUser[_youraddress];
    }

    // _thisCollection provient du frontend
    function addItemToCollection(address _thisCollection) public {
        uint256 _tokenId = MonNft(_thisCollection).mint(msg.sender);
        showToken(_thisCollection, _tokenId);
    }

    // function isListingExist(uint _thelistingId) internal view returns(bool) {
    //     return _listings[_thelistingId].tokenContract != address(0);
    // }

    // add showable function to make it showable but not to sale
    function showToken(address _tokenContract, uint256 _tokenId) public {
        require(
            ERC721(_tokenContract).ownerOf((_tokenId)) == msg.sender,
            "Caller is not the token owner"
        );
        string memory _collectionName = ERC721(_tokenContract).name();
        string memory _JSONTokenURI = MonNft(_tokenContract).tokenURI(_tokenId);
        // collection[_token][_collectionName].push(_tokenId); // tester si ça s'ajoute bien au tableau
        Listing memory listing = Listing(
            ListingStatus.Showable,
            msg.sender,
            msg.sender,
            _tokenContract,
            _tokenId,
            _defaultPrice,
            _collectionName,
            _JSONTokenURI
        );

        _listingId++;
        _listings[_listingId] = listing;
        emit Showed(
            listing.status,
            _listingId,
            msg.sender,
            msg.sender,
            _tokenContract,
            _tokenId,
            _collectionName,
            _JSONTokenURI
        );
    }

    // function testPush(address _token, string calldata _collectionName) public view returns(uint[] memory) {
    //     return (collection[_token][_collectionName]);
    // }

    function listToken(uint256 listingId, uint256 _price) external {
        // price is in wei

        Listing storage listing = _listings[listingId];
        address testadress = address(this);
        require(
            ERC721(listing.tokenContract).ownerOf((listing.tokenId)) ==
                msg.sender,
            "You are not the owner77"
        ); // vérifier require
        require(
            listing.status == ListingStatus.Showable,
            "The NFT can't be listed to sell."
        );

        listing.price = _price;
        listing.status = ListingStatus.Active;
        //ERC721(listing.tokenContract).modifyNFTCreator(msg.sender);
        ERC721(listing.tokenContract).setApprovalForAll(
            testadress,
            _forApproved
        );
        IERC721(listing.tokenContract).transferFrom(
            msg.sender,
            testadress,
            listing.tokenId
        );

        emit Listed(
            listing.status,
            _listingId,
            listing.Creator,
            msg.sender,
            listing.tokenContract,
            listing.tokenId,
            listing.price,
            listing.collection,
            listing.JSONTokenURI
        );
    }

    // Pour verifier si token bien supprime du tableau
    function deleteToken(
        address _precedentAcheteur,
        uint256 _indexOfDeletedItem
    ) public view returns (MyBuyedNFT memory) {
        return ListOfNFTfromUser[_precedentAcheteur][_indexOfDeletedItem];
    }

    // mapping (address=>MyBuyedNFT[]) ListOfNFTfromUser;
    function buyToken(uint256 listingId) external payable {
        Listing storage listing = _listings[listingId];
        uint256 lengthOfListOfNFTfromUser = ListOfNFTfromUser[listing.seller]
            .length;
        require(
            listing.status == ListingStatus.Active,
            "Listing is not active"
        );
        require(msg.sender != listing.seller, "seller cannot be buyer");
        require(msg.value >= listing.price, "Insuficient amount");
        // Pour le front si listing.tokenContract = address(0) alors pas afficher else afficher
        // plutot un if require(listing.seller != listing.creator) // Ajouter address Creator dans la struct Listing
        // ListOfNFTfromUser[listing.seller].pull(indexOfNFt)
        // si le vendeur est le créateur alors pas besoin de retirer de ListOfNFTfromUser
        if (listing.seller != listing.Creator) {
            uint256 indexOfDeletedNFT;
            for (uint256 i = 0; i < lengthOfListOfNFTfromUser; i++) {
                if (
                    listing.tokenContract ==
                    ListOfNFTfromUser[listing.seller][i].tokenContract &&
                    listing.tokenId ==
                    ListOfNFTfromUser[listing.seller][i].tokenId
                ) {
                    indexOfDeletedNFT = i;
                    return;
                }
            }
            // uint indexOfListOfNFTfromUser = ListOfNFTfromUser[listing.seller].myindex;
            // ListOfNFTfromUser[listing.seller].myindex.delete(indexOfListOfNFTfromUser);
            delete ListOfNFTfromUser[listing.seller][indexOfDeletedNFT];
        }

        IERC721(listing.tokenContract).transferFrom(
            address(this),
            msg.sender,
            listing.tokenId
        );
        payable(listing.seller).transfer(listing.price); // Tester si ca marche sans payable

        listing.status = ListingStatus.Showable;
        listing.seller = msg.sender;
        listing.price = _defaultPrice;
        SellActivty[listing.tokenId].push(msg.sender);
        ListOfNFTfromUser[msg.sender].push(
            MyBuyedNFT(
                listing.tokenContract,
                listing.tokenId,
                listing.collection,
                listing.JSONTokenURI,
                lengthOfListOfNFTfromUser
            )
        );

        emit Buyed(
            listing.status,
            listingId,
            listing.Creator,
            listing.seller,
            listing.tokenContract,
            listing.tokenId,
            listing.price,
            listing.collection,
            listing.JSONTokenURI
        );
    }

    function cancel(uint256 listingId) public payable {
        Listing storage listing = _listings[listingId];

        // require(ERC721(listing.token).ownerOf((listing.tokenId)) == msg.sender); // vérifier require. Marche probablement pas car le token est transferer a la marketplace qd lister
        require(msg.sender == listing.seller, "Only seller can cancel listing"); // Solution alternative
        require(
            listing.status == ListingStatus.Active,
            "Listing is not active"
        );

        listing.status = ListingStatus.Showable;

        IERC721(listing.tokenContract).transferFrom(
            address(this),
            msg.sender,
            listing.tokenId
        );

        emit Cancelled(
            listing.status,
            listingId,
            listing.Creator,
            msg.sender,
            listing.tokenContract,
            listing.tokenId,
            listing.price,
            listing.collection,
            listing.JSONTokenURI
        );
    }

    function DeployMyNFT(
        string calldata _Collectionname,
        string calldata _Collectionsymbol,
        string calldata _CollectionBaseUri,
        uint256 _NumberOfNftToMint
    ) public payable {
        uint256 _salt = 8;
        address ownerOfNFTContratIs = msg.sender;
        address _addressCollection = NFTFactory(_factoryAddress).DeployYourNFT(
            _salt,
            _Collectionname,
            _Collectionsymbol,
            _CollectionBaseUri,
            address(this)
        );
        CollectionsOfOwner[msg.sender].push(_addressCollection);
        for (uint256 i = 0; i < _NumberOfNftToMint; i++) {
            uint256 _tokenId = MonNft(_addressCollection).mint(
                ownerOfNFTContratIs
            );
            showToken(_addressCollection, _tokenId);
            SellActivty[_tokenId].push(msg.sender);
        }
    }
}
