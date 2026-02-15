// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CertChain {
    address public admin;

    // --- Mappings ---
    mapping(address => bool) public issuers;
    mapping(uint256 => Certificate) public certificates;

    uint256 public certificateCount;

    struct Certificate {
        uint256 certificateId;
        address issuerAddress;
        uint256 issueTimestamp;
        bool isRevoked;
        string studentName;
        string course;
        string rollNumber;
        string grade;
        string year;
    }

    // --- Events ---
    event CertificateIssued(
        uint256 indexed certificateId,
        address indexed issuer,
        string studentName,
        string course
    );

    event CertificateRevoked(
        uint256 indexed certificateId,
        address indexed issuer
    );

    event IssuerAdded(address indexed issuerAddress);
    event IssuerRemoved(address indexed issuerAddress);

    // --- Modifiers ---
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyIssuer() {
        require(issuers[msg.sender], "Not authorized issuer");
        _;
    }

    // --- Constructor ---
    constructor() {
        admin = msg.sender;
    }

    // --- Admin Functions ---
    function addIssuer(address clubAddress) external onlyAdmin {
        require(clubAddress != address(0), "Invalid address");
        require(!issuers[clubAddress], "Already an issuer");
        issuers[clubAddress] = true;
        emit IssuerAdded(clubAddress);
    }

    function removeIssuer(address clubAddress) external onlyAdmin {
        require(issuers[clubAddress], "Address is not an issuer");
        issuers[clubAddress] = false;
        emit IssuerRemoved(clubAddress);
    }

    function isIssuer(address addr) external view returns (bool) {
        return issuers[addr];
    }

    // --- Certificate Functions ---
    function issueCertificate(
        string memory _studentName,
        string memory _course,
        string memory _rollNumber,
        string memory _grade,
        string memory _year
    ) external onlyIssuer returns (uint256) {
        certificateCount++;
        uint256 newId = certificateCount;

        certificates[newId] = Certificate({
            certificateId: newId,
            issuerAddress: msg.sender,
            issueTimestamp: block.timestamp,
            isRevoked: false,
            studentName: _studentName,
            course: _course,
            rollNumber: _rollNumber,
            grade: _grade,
            year: _year
        });

        emit CertificateIssued(newId, msg.sender, _studentName, _course);
        return newId;
    }

    function revokeCertificate(uint256 _certificateId) external {
        Certificate storage cert = certificates[_certificateId];
        require(cert.certificateId != 0, "Certificate does not exist");
        require(cert.issuerAddress == msg.sender, "Only the original issuer can revoke");
        require(!cert.isRevoked, "Certificate is already revoked");

        cert.isRevoked = true;
        emit CertificateRevoked(_certificateId, msg.sender);
    }

    function getCertificate(uint256 _certificateId)
        external
        view
        returns (
            uint256 certificateId,
            address issuerAddress,
            uint256 issueTimestamp,
            bool isRevoked,
            string memory studentName,
            string memory course,
            string memory rollNumber,
            string memory grade,
            string memory year
        )
    {
        Certificate storage cert = certificates[_certificateId];
        require(cert.certificateId != 0, "Certificate does not exist");

        return (
            cert.certificateId,
            cert.issuerAddress,
            cert.issueTimestamp,
            cert.isRevoked,
            cert.studentName,
            cert.course,
            cert.rollNumber,
            cert.grade,
            cert.year
        );
    }
}
