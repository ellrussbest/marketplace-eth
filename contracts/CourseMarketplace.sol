// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CourseMarketplace {
    enum State {
        Purchased,
        Activated,
        Deactivated
    }

    struct Course {
        uint256 id; // 32 bytes
        uint256 price; // 32 bytes
        bytes32 proof; // 32 bytes
        address owner; // 20 bytes
        State state; // 1 byte
    }

    // mapping of courseHash to Course data
    mapping(bytes32 => Course) private ownedCourses;

    // mapping of courseID to courseHash
    mapping(uint256 => bytes32) private ownedCoursesHashList;

    // number of all courses and id of the course
    uint256 private totalOwnedCourses;

    address payable private owner;

    constructor() {
        setContractOwner(msg.sender);
    }

    /// This address already owns this course
    error AddressAlreadyOwnsCourseError();

    /// You don't have the permission to perform this operation
    error NotOwnerError();

    modifier onlyOwner() {
        if (msg.sender != getContractOwner()) {
            revert NotOwnerError();
        }
        _;
    }

    function purchaseCourse(bytes16 courseId, bytes32 proof) external payable {
        // keccak256 & abi are globally available in solidity
        // abi.encodePacked(arg); is used when we want to has multiple values
        // all at once
        // courseHas will be unique value formed from the hash of
        // the senders address and the courseId
        bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));
        uint256 id = totalOwnedCourses++;

        if (isAddressOwner(courseHash)) {
            revert AddressAlreadyOwnsCourseError();
        }

        ownedCoursesHashList[id] = courseHash;
        ownedCourses[courseHash] = Course({
            id: id,
            price: msg.value,
            proof: proof,
            owner: msg.sender,
            state: State.Purchased
        });
    }

    function transferOwnership(address newOwner) external onlyOwner {
        setContractOwner(newOwner);
    }

    function getCourseCount() external view returns (uint256) {
        return totalOwnedCourses;
    }

    function getCourseHashAtIndex(uint256 index)
        external
        view
        returns (bytes32)
    {
        return ownedCoursesHashList[index];
    }

    function getCourseByHash(bytes32 courseHash)
        external
        view
        returns (Course memory)
    {
        return ownedCourses[courseHash];
    }

    function getContractOwner() public view returns (address) {
        return owner;
    }

    function setContractOwner(address newOwner) private {
        // owner = newOwner;
        owner = payable(newOwner);
    }

    function isAddressOwner(bytes32 courseHash) private view returns (bool) {
        return ownedCourses[courseHash].owner == msg.sender;
    }
}

/**
constructor
external functions
external functions that are view
external functions that are pure
public functions
public functions that are view
public functions that are pure
internal functions
internal functions that are view
internal functions that are pure
private functions
private functions that are view
private functison that are pure
 */
