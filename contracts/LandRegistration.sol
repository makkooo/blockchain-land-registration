// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

contract LandRegistration {
    
    struct Property {
        uint id;
        uint lotNum;
        uint surveyNum;
        string area;
        string loc;
        string locDesc;
        string fieldValidator;
        Deed deed;
    }

    struct Deed {
        string owner;
        string ownerAddress;
        uint cadNum;
        uint lrcNum;
    }

    address public lra;

    constructor() {
        lra = msg.sender; 
    }

    mapping(address => bool) public fieldValidators;
    mapping(uint => Property) public properties;
    mapping(uint => bool) public availableProperties;

    modifier onlyLra() {
        require(msg.sender == lra, "Only LRA can perform this operation.");
        _;
    }

    event propertyRegistered(
        uint id, 
        uint lotNum,
        uint surveyNum, 
        string area, 
        string loc, 
        string locDesc,
        string fieldValidator,
        string owner,
        string ownerAddress,
        uint cadNum,
        uint lrcNum
    );

    function getLra() public view returns (address lraAddress) {
        return lra;
    }

    function addFieldValidator(address _address) public onlyLra returns (bool Success) {
        fieldValidators[_address] = true;
        return true;
    }

    function registerProperty(
        uint id,
        uint lotNum,
        uint surveyNum,
        string memory area,
        string memory loc,
        string memory locDesc,
        string memory fieldValidator,
        string memory owner,
        string memory ownerAddress,
        uint cadNum,
        uint lrcNum
    ) public returns (bool Success) {
        properties[id].id = id;
        properties[id].lotNum = lotNum;
        properties[id].surveyNum = surveyNum;
        properties[id].area = area;
        properties[id].loc = loc;
        properties[id].locDesc = locDesc;
        properties[id].fieldValidator = fieldValidator;
        properties[id].deed = Deed ( 
            owner,
            ownerAddress,
            cadNum,
            lrcNum
        );

        availableProperties[id] = true;

        emit propertyRegistered(
            id, 
            lotNum, 
            surveyNum, 
            area,
            loc, 
            locDesc, 
            fieldValidator,
            owner,
            ownerAddress,
            cadNum,
            lrcNum
        );

        return true;
    }

    function getLandDetails(uint id) public view returns (
        uint, 
        uint, 
        string memory,
        string memory, 
        string memory,
        Deed memory
    ) {
        require(availableProperties[id], "Property does not exist!");
        return (
            properties[id].lotNum,
            properties[id].surveyNum,
            properties[id].area,
            properties[id].loc,
            properties[id].locDesc,
            properties[id].deed
        );
    }
}
