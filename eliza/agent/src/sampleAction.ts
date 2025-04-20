import { Action, IAgentRuntime, Memory } from '@elizaos/core';
import axios from 'axios';

// Replace with your actual wallet address and API key

const apiKey = "82J5U48EUY9KNZ8HC29EPSGURQZ5TVT4IT";

async function getTransactions(address, apiKey) {
  const [normalTxs, internalTxs] = await Promise.all([
    axios.get(`https://api.basescan.org/api?module=account&action=txlist&address=${address}&apikey=${apiKey}`),
    axios.get(`https://api.basescan.org/api?module=account&action=txlistinternal&address=${address}&apikey=${apiKey}`)
  ]);

  return {
    normal: normalTxs.data.result,
    internal: internalTxs.data.result
  };
}

function calculateScore(normal, internal) {
  const totalTxs = normal.length;
  const internalTxs = internal.length;

  // Calculate failed transactions
  const failedTxs = normal.filter(tx => tx.isError === "1").length;

  // Unique active days
  const uniqueDays = new Set(
    normal.map(tx => new Date(tx.timeStamp * 1000).toDateString())
  );

  // Ratio of failed to total
  const failRatio = totalTxs ? failedTxs / totalTxs : 0;
  const internalRatio = totalTxs ? internalTxs / totalTxs : 0;

  // Sample scoring model
  let score = 0;
  score += Math.min(30, uniqueDays.size); // up to 30 points for activity
  score += totalTxs > 50 ? 20 : (totalTxs / 50) * 20; // up to 20 points for volume
  score += (1 - failRatio) * 30; // up to 30 points for reliability
  score += internalRatio * 20; // up to 20 points for internal interactions

  return {
    score: Math.round(score),
    totalTxs,
    internalTxs,
    failedTxs,
    activeDays: uniqueDays.size,
    internalRatio: internalRatio.toFixed(2),
    failRatio: failRatio.toFixed(2)
  };
}

async function getfinal(address:string):Promise<string> {
    try {

      console.log("📡 Fetching data from BaseScan..."+address);
      const { normal, internal } = await getTransactions(address, apiKey);
  
      console.log("🧠 Calculating reputation score...");
      const result = calculateScore(normal, internal);
  
      console.log("📊 Reputation Score Summary:");
      console.log("=====================================");
      console.table(result);
      return `The reputation score is ${result.score}/100. `;
    } catch (error) {
      console.error("❌ Error:", error.message);
    }
  }

function extractWalletAddress(text: string): string | null {
    const walletRegex = /(0x[a-fA-F0-9]{40})/; // Regex for Ethereum wallet address
    const match = text.match(walletRegex);
    return match ? match[1] : null;
}
export const reputation:Action = 
{
    name: 'reputation',
    description: 'This is  to caclulate the raputaion score from the action reputation',
    similes: ['REPUTATION', 'REPUTATION SCORE','CALCULATE REPUTATION'],
examples: [
  [
    {
      user: "{{user1}}",
      content: {
        text: "What is the reputation of 0x0d1682CAE85b4989a9615E0da6e18226c53a83CD",
       
      }
    },
    {
      user: "{{reputation}}",
      content: {
        text: "Address 0xaabbccddeeff has a reputation score of 89/100. Clean transaction history and verified contract activity.",
        action: "reputation"
      }
    },
    {
      user: "{{user1}}",
      content: {
        text: "Check the trust score for wallet 0x824fA3ea3B2c6Ad0958717DccA86e6597b4D10d2",
      }
    },{
      user: "{{reputation}}",
      content: {
        text: "Address 0xaabbccddeeff has a reputation score of 50/100. Clean transaction history and verified contract activity.",
        action: "reputation"
      }
    }
  ]
  
  
],
validate: async (_runtime: IAgentRuntime, _message: Memory) => {
    return true;
},
handler: async (runtime: IAgentRuntime, message: Memory) => {
    const text = message.content.text;
    const trimmedText = extractWalletAddress(text);
    const finalResponse = await getfinal(trimmedText);
    return {
        user: "reputation",
        content: { text: finalResponse },
        action: "reputation",
        suppressInitialMessage: true,
    };
}

    
}