// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

/**
 * @title Land Registration
 */
contract LandRegistration {
    
    /**
     * A property record that represents
     * a single property. 
     * Contains important property attributes.
     */
    struct Property {
        uint id;                // Property ID
        uint lotNum;            // Property lot number
        uint surveyNum;         // Property survey number
        string area;            // Property total area
        string loc;             // Property location
        string locDesc;         // Property location description
        string fieldValidator;  // Property field validator
        Deed deed;              // Property deed
    }

    /**
     * A Deed record that represents
     * a single deed corresponding to
     * a property.
     * Contains important deed details
     * atttributes.
     */
    struct Deed {
        string owner;           // Property owner
        string ownerAddress;    // Property owner address
        uint cadNum;            // Property cadastral number
        uint lrcNum;            // Property LRC record number
    }

    // Stores LRA address
    address public lra;

    /**
     * Instatiate contract owner to
     * LRA address on contract deployment
     */
    constructor() {
        lra = msg.sender; 
    }

    /**
     * @dev Declares a state variable that
     * stores boolean value for each possible address.
     */
    mapping(address => bool) public fieldValidators;

    /**
     * @dev Declares a state variable that
     * stores a `Property` struct for each possible property id.
     */
    mapping(uint => Property) public properties;

    /**
     * @dev Declares a state variable that
     * stores boolean value for each possible property id.
     */
    mapping(uint => bool) public availableProperties;

    /**
     * Access modifier that restricts operations 
     * to be performed only by the LRA.
     */
    modifier onlyLra() {
        require(msg.sender == lra, "Only LRA can perform this operation.");
        _;
    }

    
    // Records event when a property is registered.
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

    /**
     *
     * @notice  Retrieves LRA address.
     * @return  lraAddress  Returns the addres of LRA.
     */
    function getLra() public view returns (address lraAddress) {
        return lra;
    }

    /**
     *
     * @notice  Adds address as Field Validator and add to `fieldValidators`
     * @dev     Only LRA can perform this action.
     *
     * @param   _address    Address of the Field Validator
     * @return  Success     Returns a boolean value if operation is successful
     */
    function addFieldValidator(address _address) public onlyLra returns (bool Success) {
        fieldValidators[_address] = true;
        return true;
    }

    /**
     * @notice  Registers property then adds property to `properties`
                and `availableProperties` and emit Event `propertyRegistered`
     * @dev     Only LRA can perform this action.
     * 
     * @param   id              Property id
     * @param   lotNum          Property lot number
     * @param   surveyNum       Property survey number
     * @param   area            Property total area
     * @param   loc             Property location
     * @param   locDesc         Property location description
     * @param   fieldValidator  Property field validator
     * @param   owner           Property owner
     * @param   ownerAddress    Property owner address
     * @param   cadNum          Property cadastral number
     * @param   lrcNum          Property LRC record number
     * @return  Success         Returns a boolean value if operation is successful
     */
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

        // Store id to `availableProperties`
        availableProperties[id] = true;

        // Emit `propertyRegistered` Event
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

    /**
     * @notice  Returns property details of given id.
     * @dev     Check if property exist using require(avaliableProperties[id])
     *
     * @param   id       Property id
     * @return  Property Returns property details
     */
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
