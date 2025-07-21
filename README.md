# 🚀 T-Sender Clone: Multi-Chain Token Airdrop dApp

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white)
![Web3](https://img.shields.io/badge/Web3.js-F16822?style=for-the-badge&logo=web3.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A modern clone of the original TSender application - a gas-efficient decentralized application for batch token transfers across EVM-compatible blockchains.

**[🚀 Live Demo](https://t-sender-ss2l.vercel.app/) • [📚 Original TSender](https://tsender.app) • [📋 Contract Addresses](#supported-networks)**

</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Blockchain Technologies](#blockchain-technologies)
- [Supported Networks](#supported-networks)
- [Installation](#installation)
- [Usage](#usage)
- [Smart Contract Integration](#smart-contract-integration)
- [Testing](#testing)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [Author](#author)

## 🎯 Overview

T-Sender Clone is a sophisticated recreation of the original TSender application, built as a learning project to demonstrate modern Web3 development practices. This decentralized application enables users to perform batch ERC20 token transfers in a single transaction, providing a seamless user experience for token airdrops, salary distributions, and bulk payments.

> **Note**: This is a clone/recreation of the original [TSender](https://tsender.app) for educational purposes and portfolio demonstration. All credit for the original concept goes to the TSender team.

### Key Highlights

- **Educational Clone**: Faithful recreation of TSender's core functionality
- **Multi-Chain Support**: Ethereum Mainnet, zkSync Era, and local development
- **Gas Optimization**: Batch multiple transfers into a single transaction
- **Modern Tech Stack**: Built with Next.js, TypeScript, and latest Web3 libraries
- **Comprehensive Testing**: Unit tests and E2E testing with MetaMask integration

## ✨ Features

### 🔐 Wallet Integration
- **RainbowKit Integration**: Seamless wallet connection experience
- **Multi-Wallet Support**: MetaMask, WalletConnect, Coinbase Wallet, and more
- **Auto-Connect**: Persistent wallet connections across sessions

### 💰 Token Management
- **ERC20 Support**: Full compatibility with standard ERC20 tokens
- **Real-time Token Info**: Automatic fetching of token name, symbol, and decimals
- **Amount Validation**: Smart validation with decimal precision handling
- **Total Calculation**: Real-time calculation of total amounts in both wei and token units

### 🎨 User Experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Form Persistence**: Automatic saving of form data to localStorage
- **Loading States**: Comprehensive feedback during transactions
- **Error Handling**: User-friendly error messages and validation

### ⚡ Transaction Flow
1. **Token Approval**: Automatic approval handling for ERC20 transfers
2. **Batch Processing**: Single transaction for multiple recipients
3. **Transaction Tracking**: Real-time transaction status updates
4. **Success Handling**: Automatic form cleanup after successful airdrops

## 🔗 Blockchain Technologies

### Core Web3 Stack
- **[Wagmi](https://wagmi.sh/)**: React Hooks for Ethereum development
- **[Viem](https://viem.sh/)**: TypeScript interface for Ethereum
- **[RainbowKit](https://www.rainbowkit.com/)**: Wallet connection library


### Smart Contract Interaction
```solidity
function airdropERC20(
    address tokenAddress,
    address[] calldata recipients,
    uint256[] calldata amounts,
    uint256 totalAmount
) external;
```

### Blockchain Features
- **Multi-Chain Deployment**: Consistent contract addresses across supported networks
- **Gas Optimization**: Efficient batch processing reduces transaction costs
- **Error Recovery**: Robust error handling for failed transactions
- **Allowance Management**: Intelligent ERC20 approval handling
- **TSender Compatibility**: Uses the same contract interface as the original TSender

## 🌐 Supported Networks

This clone currently supports three blockchain networks for testing and development:

| Network | Chain ID | TSender Contract | Status |
|---------|----------|------------------|--------|
| **Ethereum Mainnet** | 1 | `0x3aD9F29AB266E4828450B33df7a9B9D7355Cd821` | ✅ Production |
| **zkSync Era** | 324 | `0x7e645Ea4386deb2E9e510D805461aA12db83fb5E` | ✅ Production |
| **Local Anvil** | 31337 | `0x5FbDB2315678afecb367f032d93F642f64180aa3` | 🔧 Development |

> **Original TSender**: The original application supports many more networks including Arbitrum, Optimism, Base, Polygon, and others. This clone focuses on the core networks for demonstration purposes.

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- MetaMask or compatible Web3 wallet

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/AlesxanDer1102/t-sender.git
cd t-sender
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Start local blockchain (optional)**
```bash
pnpm anvil
```

4. **Run development server**
```bash
pnpm dev
```

5. **Visit the application**
```
http://localhost:3000
```

## 💻 Usage

### Basic Airdrop Flow

1. **Connect Wallet**: Click "Connect Wallet" and select your preferred wallet
2. **Enter Token Address**: Input the ERC20 token contract address
3. **Add Recipients**: Enter recipient addresses (one per line or comma-separated)
4. **Set Amounts**: Specify amounts in wei for each recipient
5. **Review Information**: Check token details and total amount
6. **Execute**: Click "Send Tokens" to initiate the batch transfer

### Input Formats

**Recipients** (flexible input):
```
0x742d35Cc6634C0532925a3b8D19bA6De9c7f1a4c
0x8ba1f109551bD432803012645Hac136c9D7B7d7ad,0x169AD27A470D064DEDE56a2D3E0F4d4F9b5D1a5a
```

**Amounts** (in wei):
```
1000000000000000000
2500000000000000000,1500000000000000000
```

## 🔧 Smart Contract Integration

### Core Contract Interface

The application interacts with deployed TSender contracts that implement:

```solidity
interface ITSender {
    function airdropERC20(
        address tokenAddress,
        address[] calldata recipients,
        uint256[] calldata amounts,
        uint256 totalAmount
    ) external;
}
```

### Transaction Process

1. **Approval Check**: Verify current allowance for TSender contract
2. **Token Approval**: If needed, approve tokens for transfer
3. **Batch Transfer**: Execute airdrop with all recipients and amounts
4. **Confirmation**: Wait for transaction confirmation and update UI

### Error Handling

- **Insufficient Balance**: Check user's token balance
- **Invalid Addresses**: Validate all recipient addresses
- **Network Issues**: Handle RPC failures gracefully
- **Transaction Failures**: Provide detailed error information

## 🧪 Testing

### Testing Suite Overview

The project includes comprehensive testing at multiple levels:

#### Unit Tests (Vitest)
```bash
pnpm test:unit
```

**Utility Functions Tested:**
- `calculateTotal()`: Validates sum calculations for token amounts
- `formatTokenAmount()`: Tests token amount formatting with different decimals
- Edge cases and error conditions

#### End-to-End Tests (Playwright + Synpress)
```bash
pnpm test:e2e
```

**E2E Test Scenarios:**
- **Wallet Connection**: MetaMask integration and connection flow
- **Form Visibility**: Conditional rendering based on wallet state
- **Transaction Flow**: Complete airdrop process simulation
- **Multi-Network**: Testing across different blockchain networks

#### Test Structure
```
src/utils/
├── calculateTotal/
│   ├── calculateTotal.ts
│   └── calculateTotal.test.ts
└── formatTokenAmount/
    ├── formatTokenAmount.ts
    └── formatTokenAmount.test.ts

test/playwright/
└── basic.spec.ts
```

### Test Technologies
- **[Vitest](https://vitest.dev/)**: Fast unit testing framework
- **[Playwright](https://playwright.dev/)**: E2E testing automation
- **[Synpress](https://synpress.io/)**: MetaMask integration testing

## 🏗️ Architecture

### Frontend Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main application page
│   └── providers.tsx      # Web3 and Query providers
├── components/            # React components
│   ├── AirdropForm.tsx   # Main airdrop interface
│   ├── Header.tsx        # Navigation header
│   └── ui/               # Reusable UI components
├── utils/                # Utility functions
│   ├── calculateTotal/   # Amount calculation logic
│   └── formatTokenAmount/ # Token formatting utilities
├── constants.ts          # Contract addresses and ABIs
└── rainbowKitConfig.tsx  # Wallet configuration
```

### State Management

- **React State**: Local component state with hooks
- **Wagmi**: Blockchain state management
- **localStorage**: Form persistence

### Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Reusable UI component library
- **Responsive Design**: Mobile-first approach

## 🛠️ Build & Deployment

### Static Export Configuration

```typescript
const nextConfig: NextConfig = {
  output: "export",
  distDir: "out",
  images: { unoptimized: true },
  basePath: "",
  assetPrefix: "./",
  trailingSlash: true,
}
```

### Deployment Commands

```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

### Deployment Targets

- **[🚀 Live Demo](https://t-sender-ss2l.vercel.app/)** - Replace with your actual deployment URL
- **Vercel**: Optimized for Next.js deployment
- **Netlify**: Static site hosting
- **IPFS/Fleek**: Decentralized hosting
- **GitHub Pages**: Free static hosting


### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Ensure responsive design
- Test with MetaMask integration
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

> **Disclaimer**: This is an educational clone of the original TSender application. All credit for the original concept, design, and functionality goes to the TSender team. This project is created for learning purposes and portfolio demonstration.

## 🔗 References

- **[Original TSender](https://tsender.app)**: The inspiration and original application
- **[TSender Documentation](https://docs.tsender.app)**: Original documentation and guides
- **[TSender GitHub](https://github.com/tsender)**: Original source code (if available)

## 👨‍💻 Author

**AlesxanDer1102**

- GitHub: [@AlesxanDer1102](https://github.com/AlesxanDer1102)
- **Live Demo**: [🚀 https://t-sender-ss2l.vercel.app/](https://t-sender-ss2l.vercel.app/)

---

<div align="center">

**⭐ If this project helped you, please give it a star! ⭐**

**Educational Clone of [TSender](https://tsender.app) • Built with ❤️ for learning Web3 development**

</div>