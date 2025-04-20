
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { mockUser, mockWallet, mockScore } from "@/lib/mockData";
import UserProfile from "@/components/UserProfile";
import WalletCard from "@/components/WalletCard";
import UnchainScore from "@/components/UnchainScore";
import NavBar from "@/components/NavBar";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@civic/auth-web3/react";
import axios from "axios";
import { ethers } from "ethers"
declare global {
  interface Window {
    ethereum?: any
  }
}
const apiKey = "82J5U48EUY9KNZ8HC29EPSGURQZ5TVT4IT";

const abi = [
 "function addScore(address user, uint256 score) external"
,
    "function updateScore(address user, uint256 new_score) external",

    "function getScore(address user) external view returns (uint256)"
]
const contractAddress = "0x810e79de0f488c1a34d4b056ccaef2ee187cea06"


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



function extractWalletAddress(text: string): string | null {
  const walletRegex = /(0x[a-fA-F0-9]{40})/; // Regex for Ethereum wallet address
  const match = text.match(walletRegex);
  return match ? match[1] : null;
}



const Dashboard = () => {
  const { user } = useUser();
  const [chaindata, setChainData] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handilSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const inputData = formData.get("inputField") as string;
    const walletAddress = extractWalletAddress(inputData);
    setWalletAddress(walletAddress);
    if (walletAddress) {
      console.log("Extracted Wallet Address:", walletAddress);
      try {
        console.log("📡 Fetching data from BaseScan...");
        const { normal, internal } = await getTransactions(walletAddress, apiKey);

        console.log("🧠 Calculating reputation score...");
        const result = await calculateScore(normal, internal);

        console.table(result);
        setChainData(result);
        try {
          const provider = new ethers.BrowserProvider(window.ethereum)
          const signer = await provider.getSigner()
          const contract = new ethers.Contract(contractAddress, abi, signer)
          const res = await contract.addScore(walletAddress,Math.round(result.score))
          console.log(res)
          toast({
            title: " You Score added!",
            description: "Your score has been added to the blockchain.",
          });

          
        } catch (error) {
          toast({
            title: " Error",
            description: error,
          });
        } 
      } catch (error) {
        console.error("❌ Error:", error.message);
      }
    }
    else {
      console.error("❌ Invalid wallet address");
    }


  }
  console.log(user)
  useEffect(() => {
    // Welcome toast on first load
    toast({
      title: "Welcome to your dashboard!",
      description: "Here you can view your UnchainScore and wallet details.",
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <div className="container mx-auto pt-24 pb-16 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Your Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            View your crypto profile and coreCensyx Score
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Submit Data</h2>
          <form
            onSubmit={handilSubmit}
          >
            <div className="flex items-center space-x-4">
              <input
                type="text"
                name="inputField"
                placeholder="Enter your data"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-crypto-blue"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-crypto-blue text-white rounded-lg hover:bg-crypto-blue-dark focus:outline-none focus:ring-2 focus:ring-crypto-blue"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <div className="col-span-1">
            <UserProfile user={user} />

          </div>

          
          {chaindata ? (
            <>
              {/* Wallet Details Card */}
              <div className="col-span-1">
                <WalletCard wallet={walletAddress} />
              </div>

              {/* UnchainScore Card */}
              <div className="col-span-1">
                <UnchainScore result={chaindata} />
              </div>
            </>
          ) : (
            <div className="col-span-1">
              loading...
            </div>
          )}
          
        </div>

        {/* Activity Overview */}
          {chaindata? (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Activity Overview</h2>
              <Card className="glass-card">
                <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Activity Stats */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Recent Activity</h3>
                  <p className="text-muted-foreground text-sm">
              Your account has been active for {" "}
              <span className="font-medium text-foreground">{chaindata.activeDays}</span>
                  </p>
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Transaction Volume</span>
              <span className="text-sm">
                {chaindata.totalTxs > 50 ? 'High' : chaindata.totalTxs > 20 ? 'Medium' : 'Low'}
              </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-crypto-blue h-2 rounded-full"
                style={{
                  width: `${Math.min((chaindata.totalTxs) / 50 * 100, 100)}%`
                }}
              ></div>
                  </div>
                </div>
              </div>

              {/* Security Score */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Security Rating</h3>
                  <p className="text-muted-foreground text-sm">
              Your account security is{" "}
              <span className={`font-medium ${chaindata.failRatio < 0.1 ? 'text-green-500' : chaindata.failRatio < 0.3 ? 'text-yellow-500' : 'text-red-500'}`}>
                {chaindata.failRatio < 0.1 ? 'Good' : chaindata.failRatio < 0.3 ? 'Fair' : 'Poor'}
              </span>
                  </p>
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">2FA Enabled</span>
              <span className="text-sm text-green-500">Yes</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Recovery Email</span>
              <span className="text-sm text-green-500">Set</span>
                  </div>
                  <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Last Login</span>
              <span className="text-sm">Just Now</span>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                  <p className="text-muted-foreground text-sm">
              Ways to improve your UnchainScore
                  </p>
                </div>

                <ul className="space-y-2">
                  {chaindata.totalTxs < 50 && (
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-crypto-green/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-crypto-green"></div>
                </div>
                <span className="text-sm">Increase transaction volume (current: {chaindata.totalTxs}/50)</span>
              </li>
                  )}
                  {chaindata.activeDays < 30 && (
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-crypto-green/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-crypto-green"></div>
                </div>
                <span className="text-sm">Increase active days (current: {chaindata.activeDays}/30)</span>
              </li>
                  )}
                  {Number(chaindata.failRatio) > 0.1 && (
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-crypto-green/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-crypto-green"></div>
                </div>
                <span className="text-sm">Reduce failed transactions (current ratio: {(Number(chaindata.failRatio) * 100).toFixed(1)}%)</span>
              </li>
                  )}
                </ul>
              </div>
            </div>
                </CardContent>
              </Card>
            </div>
          ):<div>loading...</div>}
      </div>
    </div >
  );
};

export default Dashboard;
