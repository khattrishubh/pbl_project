# CertChain

CertChain is a blockchain-based certificate verification system designed for intra-college use. It allows authorized campus clubs and departments to issue digital certificates, and users can verify their authenticity instantly using blockchain records.

## Problem
Traditional certificates are stored as PDFs or images and can be easily edited, forged, or lost. Verification requires manually contacting the issuing authority.

## Solution
CertChain stores a cryptographic proof of each certificate on the Ethereum blockchain. The system verifies authenticity by checking blockchain records instead of trusting uploaded files.

## Features
- Issue digital certificates
- Verify certificate authenticity
- Authorized issuers (clubs/departments)
- Certificate revocation
- Public blockchain transaction proof

## Tech Stack
- React + Vite
- Tailwind CSS
- Solidity Smart Contract
- Ethers.js
- MetaMask
- Ethereum Sepolia Testnet

## How Verification Works
When a certificate is issued, a record is written to the blockchain. During verification, the system checks the blockchain transaction. If the record exists and is not revoked, the certificate is valid.

---

**Author:** Shubh Khattri  
**Registration Number:** 2427030494
