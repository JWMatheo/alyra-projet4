// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "./NFTFactory.sol";
import "./MyNFT.sol";

/// @title A NFT marketplace example
/// @author JWMatheo - member of NFTSet Team
/// @notice You can use this contract in order to build a marketplace Dapp
/// @dev NFT marketplace contract. You need to deploy FactoryV3.sol first and implement the Factory address.
contract Marketplace {
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
<<<<<<< HEAD
        uint256 tokenId,
        uint256 price,
=======
        uint tokenId,
>>>>>>> 24f3db8b3ab3cea816e810fc3941c96e1708f5b0
        string collection,
        string JSONTokenURI
    );

    event Cancelled(
        ListingStatus status,
        uint256 listingId,
        address Creator,
        address seller,
        address token,
<<<<<<< HEAD
        uint256 tokenId,
        uint256 price,
=======
        uint tokenId,
>>>>>>> 24f3db8b3ab3cea816e810fc3941c96e1708f5b0
        string collection,
        string JSONTokenURI
    );

    uint256 private _buyedTokenCounter;
    bool _forApproved = true;
    uint256 private _listingId = 0;
    uint256 private _defaultPrice = 1000 ether;
    address private _factoryAddress;
<<<<<<< HEAD
    mapping(uint256 => Listing) private _listings;
    mapping(address => address[]) CollectionsOfOwner; // stocke les collections créer par une addresse
    mapping(uint256 => address[]) SellActivty; // stocke pour 1 NFT donné, la liste des addresses ayant ete en possesion du nft
    mapping(address => MyBuyedNFT[]) ListOfNFTfromUser; // stocke Uniquement les NFT achetés.

    constructor(address factoryAdress) {
=======
    mapping(uint=>Listing) _listings;
    mapping(address =>address[]) CollectionsOfOwner; // stocke les collections créer par une addresse
    mapping(uint=>address[]) SellActivty; // stocke pour 1 NFT donné, la liste des addresses ayant ete en possesion du nft
    mapping (address=>MyBuyedNFT[]) ListOfNFTfromUser; // stocke Uniquement les NFT achetés.

    function setFactoryAddress(address factoryAdress) public {
>>>>>>> 24f3db8b3ab3cea816e810fc3941c96e1708f5b0
        _factoryAddress = factoryAdress;
    }

    /**
     * @notice Get the structure for a listed NFT.
     * @dev  Get the structure from mapping a listed NFT Id.
     * @param listingId The listed NFT Id to check.
     * @return Listing structure of the entered listed NFT Id.
     */
    function getListing(uint256 listingId)
        public
        view
        returns (Listing memory)
    {
        return _listings[listingId];
    }

    /**
     * @notice Get all collection address created of an address.
     * @dev  Get an array wich contains all collection address created for a given address.
     * @param _yourAddress The address to check.
     * @return address[] The array which contains all colection address.
     */
    function getUserCollections(address _yourAddress)
        public
        view
        returns (address[] memory)
    {
        return CollectionsOfOwner[_yourAddress];
    }

    /**
     * @notice Get sells activities from a NFT.
     * @dev  Get an array wich contains all addresses having been in possession of the listed nft.
     * @param listingId The listed NFT Id to check.
     * @return address[] The array which contains all addresses having been in possession of the listed nft.
     */
    function getSellActivity(uint256 listingId)
        public
        view
        returns (address[] memory)
    {
        Listing memory listing = _listings[listingId];
        return SellActivty[listing.tokenId];
    }

    /**
     * @notice Get all the NFT purchased and currently owned.
     * @dev  Get an array wich contains a structure for each NFT purchased && currently owned.
     * @param _youraddress The address to check.
     * @return MyBuyedNFT[] The array wich contains a structure for each NFT purchased && currently owned.
     */
    function getListOfNFTfromUser(address _youraddress)
        public
        view
        returns (MyBuyedNFT[] memory)
    {
        return ListOfNFTfromUser[_youraddress];
    }

    /**
     * @dev Verify that the listedId '_thelistingId' exist.
     *
     * Requirements:
     *
     * - Insert an existing listed NFT Id '_thelistingId'
     */
    modifier isListingExist(uint256 _thelistingId) {
        require(
            _listings[_thelistingId].tokenContract != address(0),
            "Insert a valid listingId"
        );
        _;
    }

    /**
     * @notice Make your NFT appear in the marketplace.
     * @dev Create a 'Listing' structure to make your NFT appear in the marketplace.
     * '_defaultPrice' in 'Listing' is set to prevent a potentially vulnerability attack.
     *
     * Requirements:
     *
     * - 'msg.sender' is the owner of the tokenId '_tokenId' at address '_tokenContract'
     *
     * Emits a {Showed} event.
     */
    function showToken(address _tokenContract, uint256 _tokenId) public {
        require(
            ERC721(_tokenContract).ownerOf((_tokenId)) == msg.sender,
            "Caller is not the token owner"
        );
        string memory _collectionName = ERC721(_tokenContract).name();
        string memory _JSONTokenURI = MyNFT(_tokenContract).tokenURI(_tokenId);
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
<<<<<<< HEAD
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
=======
        emit Showed(listing.status ,_listingId, msg.sender, msg.sender, _tokenContract, _tokenId, _collectionName, _JSONTokenURI); 
    //        event  Showed(
    //     ListingStatus status,
    //     uint listingId,
    //     address Creator,
    //     address seller,
    //     address token,
    //     uint tokenId,
    //     string collection,
    //     string JSONTokenURI
    // );
>>>>>>> 24f3db8b3ab3cea816e810fc3941c96e1708f5b0
    }

    /**
     * @notice List to sale your NFT in the marketplace.
     * @dev Set a price and status to make the NFT buyable then transfer the NFT to the marketplace.
     *
     * Requirements:
     *
     * - 'msg.sender' is the owner of the tokenId 'listing.tokenId' at address 'listing.tokenContract'
     * - The Nft is not already listed to sale
     *
     * Emits a {Listed} event.
     */
    function listToken(uint256 listingId, uint256 _price)
        external
        isListingExist(listingId)
    {
        Listing storage listing = _listings[listingId];
        address testadress = address(this);
<<<<<<< HEAD
        require(
            ERC721(listing.tokenContract).ownerOf((listing.tokenId)) ==
                msg.sender,
            "You are not the owner"
        );
        require(
            listing.status == ListingStatus.Showable,
            "The NFT is already to sell."
        );
=======
        require(ERC721(listing.tokenContract).ownerOf((listing.tokenId)) == msg.sender, "You are not the owner");
        require(listing.status == ListingStatus.Showable, "The NFT is already to sale");
>>>>>>> 24f3db8b3ab3cea816e810fc3941c96e1708f5b0

        listing.price = _price;
        listing.status = ListingStatus.Active;
        MyNFT(listing.tokenContract)
            .setAddressToMsgSenderOfListTokenFromMarketPlaceContract(
                msg.sender
            );
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

    /**
     * @notice Buy a Nft.
     * @dev Buy NFT function. Transfer the NFT to the msg.sender.
     *
     * Requirements:
     *
     * - The Nft is listed to sale,
     * - Cannot buy your own NFT.
     * - Send the good amount.
     *
     * Emits a {Buyed} event.
     */
    function buyToken(uint256 listingId)
        external
        payable
        isListingExist(listingId)
    {
        Listing storage listing = _listings[listingId];
        uint256 lengthOfListOfNFTfromUser = ListOfNFTfromUser[listing.seller]
            .length;
        require(
            listing.status == ListingStatus.Active,
            "Listing is not active"
        );
        require(msg.sender != listing.seller, "seller cannot be buyer");
        require(msg.value == listing.price, "Insuficient amount");
        // Pour le front si listing.tokenContract = address(0) alors pas afficher else afficher
        /**
         * @dev If Creator is the seller it doesn't delete 'MyBuyedNFT' structure beacause it doesn't exist.
         */
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
                    break;
                }
            }
            delete ListOfNFTfromUser[listing.seller][indexOfDeletedNFT];
        }

        payable(listing.seller).transfer(listing.price);
        IERC721(listing.tokenContract).transferFrom(
            address(this),
            msg.sender,
            listing.tokenId
        );

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
<<<<<<< HEAD
            listing.JSONTokenURI
        );
=======
            listing.JSONTokenURI,
            lengthOfListOfNFTfromUser
        ));

        emit Buyed(listing.status, listingId, listing.Creator, listing.seller, listing.tokenContract, listing.tokenId, listing.collection, listing.JSONTokenURI);
>>>>>>> 24f3db8b3ab3cea816e810fc3941c96e1708f5b0
    }

    /**
     * @notice Cancel a listed to sale NFT.
     * @dev Cancel a listed to sale NFT. Transfer back the NFT from Marketplace to the msg.sender.
     *
     * Requirements:
     *
     * - Only seller can cancel listing,
     * - The NFT is listed to sale.
     *
     * Emits a {Cancelled} event.
     */
    function cancel(uint256 listingId)
        public
        payable
        isListingExist(listingId)
    {
        Listing storage listing = _listings[listingId];

        require(msg.sender == listing.seller, "Only seller can cancel listing");
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

<<<<<<< HEAD
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
=======
        emit Cancelled(listing.status ,listingId, listing.Creator, msg.sender, listing.tokenContract, listing.tokenId, listing.collection, listing.JSONTokenURI);
>>>>>>> 24f3db8b3ab3cea816e810fc3941c96e1708f5b0
    }

    /**
     * @notice Deploy a NFT collection.
     * @dev Deploy a NFT collection . Can be impove by letting user set his own _salt.
     *
     *
     * Emits a {Showed} event.
     */
    function DeployMyNFTCollection(
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
            uint256 _tokenId = MyNFT(_addressCollection).mint(
                ownerOfNFTContratIs
            );
            showToken(_addressCollection, _tokenId);
            SellActivty[_tokenId].push(msg.sender);
        }
    }

    /**
<<<<<<< HEAD
     * @notice Add a NFT to an existing collection.
     * @dev  Triggers 'mint' function in the collection address '_thisCollection'.
     * @param _thisCollection The collection address in wich the nft is added.
     */
    // _thisCollection provient du frontend en faisant un getUserCollections(msg.sender).call() puis pour chaque collection retourner : MyNFT(_addresseSelectionne).name() pour afficher le nom des collection sur l'interface et recuper l'addresse selctionné par l'user
=======
    * @notice Add a NFT to an existing collection.
    * @dev  Triggers 'mint' function in the collection address '_thisCollection'. Can be improved with 'for' to set a number of item to add.
    * @param _thisCollection The collection address in wich the nft is added.
    */
    // _thisCollection provient du frontend en faisant un getUserCollections(msg.sender).call() puis pour chaque collection retourner : MonNft(_addresseSelectionne).name() pour afficher le nom des collection sur l'interface et recuper l'addresse selctionné par l'user 
>>>>>>> 24f3db8b3ab3cea816e810fc3941c96e1708f5b0
    function addItemToCollection(address _thisCollection) public {
        uint256 _tokenId = MyNFT(_thisCollection).mint(msg.sender);
        showToken(_thisCollection, _tokenId);
    }
}
