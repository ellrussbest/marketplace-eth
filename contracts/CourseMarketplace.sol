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

    bool public isStopped = false;

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

    /// This course does not exist
    error CourseDoesNotExistError();

    /// Course has invalid state!
    error InvalidStateError();

    /// Sender is not course owner
    error SenderIsNotCourseOwnerError();

    modifier onlyOwner() {
        if (msg.sender != getContractOwner()) {
            revert NotOwnerError();
        }
        _;
    }

    modifier onlyWhenNotStopped() {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped() {
        require((isStopped));
        _;
    }

    // makes your contract to receive payments from
    // normal address to smart contract address
    receive() external payable {}

    function withdraw(uint256 amount) external onlyOwner {
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Transfer failed");
    }

    function emergencyWithdraw() external onlyWhenStopped onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Transfer failed");
    }

    function selfDestruct() external onlyWhenStopped onlyOwner {
        // destorys the contract and transfers all the amount to the owner
        // automatically
        selfdestruct(owner);
    }

    function stopContract() external onlyOwner {
        isStopped = true;
    }

    function resumeContract() external onlyOwner {
        isStopped = false;
    }

    function purchaseCourse(bytes16 courseId, bytes32 proof)
        external
        payable
        onlyWhenNotStopped
    {
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

    function repurchaseCourse(bytes32 courseHash)
        external
        payable
        onlyWhenNotStopped
    {
        if (!isCourseExisting(courseHash)) {
            revert CourseDoesNotExistError();
        }

        if (!isAddressOwner(courseHash)) {
            revert SenderIsNotCourseOwnerError();
        }

        Course storage course = ownedCourses[courseHash];

        if (course.state != State.Deactivated) {
            revert InvalidStateError();
        }

        course.state = State.Purchased;
        course.price = msg.value;
    }

    function activateCourse(bytes32 courseHash)
        external
        onlyWhenNotStopped
        onlyOwner
    {
        if (!isCourseExisting(courseHash)) {
            revert CourseDoesNotExistError();
        }

        Course storage course = ownedCourses[courseHash];

        if (course.state != State.Purchased) {
            revert InvalidStateError();
        }

        course.state = State.Activated;
    }

    function deactivateCourse(bytes32 courseHash)
        external
        onlyWhenNotStopped
        onlyOwner
    {
        if (!isCourseExisting(courseHash)) {
            revert CourseDoesNotExistError();
        }

        Course storage course = ownedCourses[courseHash];

        if (course.state != State.Purchased) {
            revert InvalidStateError();
        }

        (bool success, ) = course.owner.call{value: course.price}("");

        require(success, "transfer failed");
        course.state = State.Deactivated;
        course.price = 0;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        setContractOwner(newOwner);
    }

    function getCourseCount() external view returns (uint256) {
        return totalOwnedCourses;
    }

    function getCourseHashAtIndex(uint256 index) public view returns (bytes32) {
        return ownedCoursesHashList[index];
    }

    function getAllOwnedCourses() external view returns (Course[] memory) {
        Course[] memory courses = new Course[](totalOwnedCourses);
        for (uint256 i = 0; i < totalOwnedCourses; i++) {
            Course storage course = ownedCourses[getCourseHashAtIndex(i)];
            courses[i] = course;
        }

        return courses;
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

    function isCourseExisting(bytes32 courseHash) private view returns (bool) {
        Course storage course = ownedCourses[courseHash];

        if (course.owner != 0x0000000000000000000000000000000000000000) {
            return true;
        }
        return false;
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
