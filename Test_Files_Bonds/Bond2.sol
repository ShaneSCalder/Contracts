pragma solidity >=0.8.2 <0.9.0;

contract Bond {
    address public issuer;
    address public holder;
    uint public principal;
    uint public maturityDate;
    uint public couponRate;
    uint public couponFrequency;
    bool public callOption;
    bool public putOption;
    string public creditRating;
    string public bondIndenture;
    uint public yield;
    bool public tradingActive;

    constructor(
        address _issuer,
        address _holder,
        uint _principal,
        uint _maturityDate,
        uint _couponRate,
        uint _couponFrequency,
        bool _callOption,
        bool _putOption,
        string memory _creditRating,
        string memory _bondIndenture
    ) {
        issuer = _issuer;
        holder = _holder;
        principal = _principal;
        maturityDate = _maturityDate;
        couponRate = _couponRate;
        couponFrequency = _couponFrequency;
        callOption = _callOption;
        putOption = _putOption;
        creditRating = _creditRating;
        bondIndenture = _bondIndenture;
        tradingActive = true;
    }

    function calculateYield(uint purchasePrice) public view returns (uint) {
        uint interestPayments = (maturityDate - block.timestamp) / couponFrequency;
        uint interestEarned = principal * couponRate * interestPayments / 100;
        return (interestEarned + principal - purchasePrice) * 100 / purchasePrice;
    }

    function stopPayment() public {
        require(msg.sender == issuer, "Only the issuer can stop payment.");
        tradingActive = false;
    }

    function reissue(address newHolder) public {
        require(msg.sender == issuer, "Only the issuer can reissue the bond.");
        require(tradingActive == false, "Cannot reissue while trading is active.");
        holder = newHolder;
        tradingActive = true;
    }
}
