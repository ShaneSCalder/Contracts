pragma solidity >=0.8.2 <0.9.0;


/** Set up bond contract and print a certificate.  */

/** import open zepplin or develope your own code */


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Bond is ERC721, Ownable {
    // Bond issuer
    address public issuer;

    // Bondholder
    address public bondholder;

    // Principal amount
    uint256 public principalAmount;

    // Maturity date
    uint256 public maturityDate;

    // Coupon rate
    uint256 public couponRate;

    // Coupon payment frequency
    uint256 public couponPaymentFrequency;

    // Call provision
    bool public callProvision;

    // Put provision
    bool public putProvision;

    // Credit rating
    string public creditRating;

    // Bond indenture
    string public bondIndenture;

    // Yield
    uint256 public yield;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _principalAmount,
        uint256 _maturityDate,
        uint256 _couponRate,
        uint256 _couponPaymentFrequency,
        bool _callProvision,
        bool _putProvision,
        string memory _creditRating,
        string memory _bondIndenture
    ) ERC721(_name, _symbol) {
        issuer = msg.sender;
        principalAmount = _principalAmount;
        maturityDate = _maturityDate;
        couponRate = _couponRate;
        couponPaymentFrequency = _couponPaymentFrequency;
        callProvision = _callProvision;
        putProvision = _putProvision;
        creditRating = _creditRating;
        bondIndenture = _bondIndenture;
    }

    // Function to calculate the bond yield
    function calculateYield(uint256 _purchasePrice) public {
        // Calculate the total coupon payments
        uint256 totalCouponPayments = (maturityDate - block.timestamp) / couponPaymentFrequency * couponRate * principalAmount / 100;

        // Calculate the yield
        yield = (totalCouponPayments + principalAmount - _purchasePrice) * 100 / _purchasePrice;
    }

    // Function to issue an NFT that represents ownership of the bond
    function issueNFT(address _recipient) public onlyOwner returns (uint256) {
        // Create a new NFT token ID
        uint256 tokenId = totalSupply() + 1;

        // Mint a new NFT and assign ownership to the recipient
        _safeMint(_recipient, tokenId);

        // Set the bondholder to the recipient
        bondholder = _recipient;

        // Return the new token ID
        return tokenId;
    }
}
