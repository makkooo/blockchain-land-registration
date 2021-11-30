// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

contract LandRegistration {
    
    struct Property {
        uint id;
        uint lotNum;
        uint surveyNum;
        uint area;
        string loc;
        string locDesc;
        address fieldValidator;
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

    modifier onlyFieldValidator() {
        require(fieldValidators[msg.sender], "Only Field Validator can perform this operation.");
        _;
    }

    event propertyAdded(
        uint index, 
        uint lotNum,
        uint surveyNum, 
        uint area, 
        string loc, 
        string locDesc,
        address fieldValidator
    );

    event propertyRegistered(
        uint id,
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

    function addProperty(
        uint id,
        uint lotNum,
        uint surveyNum,
        uint area,
        string memory loc,
        string memory locDesc,
        address fieldValidator
    ) public onlyFieldValidator returns (bool Success) {
        properties[id].id = id;
        properties[id].lotNum = lotNum;
        properties[id].surveyNum = surveyNum;
        properties[id].area = area;
        properties[id].loc = loc;
        properties[id].locDesc = locDesc;
        properties[id].fieldValidator = msg.sender;
        availableProperties[id] = true;

        emit propertyAdded(id, lotNum, surveyNum, area, loc, locDesc, fieldValidator);

        return true;
    }

    function registerProperty(
        uint id,
        string memory owner,
        string memory ownerAddress,
        uint cadNum,
        uint lrcNum
    ) public onlyLra returns (bool Success) {
        require(availableProperties[id], "Property does not exist!");
        properties[id].deed = Deed (
            owner,
            ownerAddress,
            cadNum,
            lrcNum
        );

        emit propertyRegistered(id, owner, ownerAddress, cadNum, lrcNum);

        return true;
    }

    function getLandDetails(uint id) public view returns (
        uint, 
        uint, 
        uint,
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
