// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */

/** create the bond contract to be used with another contract to create the bonds */

contract Bond {
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
        uint256 _principalAmount,
        uint256 _maturityDate,
        uint256 _couponRate,
        uint256 _couponPaymentFrequency,
        bool _callProvision,
        bool _putProvision,
        string memory _creditRating,
        string memory _bondIndenture
    ) {
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
}
