# 🤖 CoreNexus Twitter AI Agent

CoreNexus is a **Web3-native AI Twitter bot** that analyzes Ethereum wallet addresses found in tweets and responds with an on-chain reputation score and legitimacy summary. It leverages **Arbitrum Stylus (Rust)** smart contracts for storing verified scores and utilizes **GoogleGemini** for natural language explanations.

---

### Contract Details

- **Deployed Address**: `0x810e79de0f488c1a34d4b056ccaef2ee187cea06`
- **ABI**:

```solidity
pragma solidity ^0.8.23;

interface IEruptionScore  {
    function addScore(address user, uint256 score) external;

    function updateScore(address user, uint256 new_score) external;

    function getScore(address user) external view returns (uint256);
}
```
---

## 🌐 Live Features

- 🧠 Uses OpenAI to generate human-like summaries of wallet reputation  
- 🔍 Detects tweets with Ethereum addresses and replies automatically  
- 🛡️ Checks and reflects verification status on-chain (via Arbitrum)  
- 🌱 Backend smart contract is deployed on **Arbitrum One** using **Stylus**  
- 🧾 Companion frontend where users register and verify themselves

---

## ⚙️ Tech Stack

| Layer          | Stack                                       |
|----------------|---------------------------------------------|
| **Bot Runtime**  | Node.js, TypeScript, Twitter API v2         |
| **AI**           | OpenAI (gpt-3.5-turbo)                      |
| **On-chain**     | Arbitrum Stylus smart contract (Rust)       |
| **Wallet Lookup**| BaseScan / Etherscan API                   |
| **Frontend**     | React.js / Next.js (Web3-enabled)           |

---

## 📁 File Structure

```
📦 core-nexus-twitter-agent
├── index.js             # Twitter AI agent logic
├── .env                 # Environment variables
├── README.md            # Project documentation
└── smart-contract/      # Arbitrum Stylus (Rust) contract
```

---

## 🧪 Installation

```bash
git clone https://github.com/your-org/core-nexus-twitter-agent.git
cd core-nexus-twitter-agent
npm install
```

---

## 🔐 Environment Setup

Create a `.env` file:

```env
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_SECRET=your_access_secret

OPENAI_API_KEY=your_openai_key
BASESCAN_API_KEY=your_basescan_key
```

---

## 🚀 Run the Agent

```bash
npx ts-node index.ts
```

The AI bot will:

- Run every 5 minutes
- Search for tweets with wallet addresses
- Fetch transaction data from BaseScan
- Analyze via OpenAI
- Reply directly under the tweet

Logs:
```
🤖 Twitter AI Agent running...
[Timestamp] Running AI Agent...
Replied to <tweet_id>
```

---

## 🔗 Smart Contract (Arbitrum Stylus)

- Deployed to: **Arbitrum One**
- Language: **Rust**
- Stores: `Ethereum Address → Legitimacy Score`
- Immutable + Transparent
- Called by the bot to check verification status

---

## 🌐 Frontend (Verification Portal)

- Users register via Web3 wallet
- On-chain verification is reflected by the bot replies
- Site can show:
  - Total score
  - Verification status
  - History of analysis

---

## 🛠 Example AI Flow

```text
Tweet: "What's your take on 0x3abc...de45?"
↓
Bot:
"Wallet 0x3a...de has 248 transactions and high interaction with DeFi protocols. Previously verified. Reputable address ✅"
```

---

## 💡 Future Ideas

- zk-based private scoring system
- NFT badges for top-tier wallets
- Telegram integration
- DAO governance for scoring model

---

## 🤝 Contributing

PRs are welcome! Let’s build an on-chain trust layer together.

---

## 📄 License

MIT