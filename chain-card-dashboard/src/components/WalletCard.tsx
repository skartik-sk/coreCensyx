
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WalletData, Transaction } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { Wallet } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

interface WalletCardProps {
  wallet: string | "0x82J5U48EUY9KNZ8HC29EPSGURQZ5TVT4IT";
}

const apiKey = "82J5U48EUY9KNZ8HC29EPSGURQZ5TVT4IT";

async function getallTransactions(address) {
  const [normalTxs, internalTxs] = await Promise.all([
    axios.get(`https://api.basescan.org/api?module=account&action=txlist&address=${address}&apikey=${apiKey}`),
    axios.get(`https://api.basescan.org/api?module=account&action=txlistinternal&address=${address}&apikey=${apiKey}`)
  ]);

  return {
    data: [...normalTxs.data.result, ...internalTxs.data.result],
  };
}
async function getTransactions(address) {
  const response = await axios.get<{ status: string; message: string; result: string }>(
    `https://api.basescan.org/api?module=account&action=balance&address=${address}&apikey=${apiKey}`
  );

  const balance = parseFloat(response.data.result) / 1e18;
  return { balance };
}
const WalletCard = ({ wallet }: WalletCardProps) => {
  // Format wallet address for display
  if(!wallet) {
    return <div>Loading...</div>;
  }
  const displayAddress = `${wallet.substring(0, 6)}...${wallet.substring(
    wallet.length - 4
  )}`;

  const [transactions, setTransactions] = useState<any[]>([]);
  useEffect(() => {
    getallTransactions(wallet).then((res) => {
      console.log(res.data)
      setTransactions(res.data);
    });
  }
  , []);

  // Format transactions for display
  const formatTransaction = (transaction: Transaction) => {
    const timeAgo = formatDistanceToNow(new Date(transaction.timestamp), {
      addSuffix: true,
    });
    
    return {
      ...transaction,
      formattedTime: timeAgo,
    };
  };

  // const recentTransactions = wallet.transactions.slice(0, 3).map(formatTransaction);

  return (
    <Card className="glass-card hover-lift">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Wallet Details</h3>
          <Wallet className="h-5 w-5 text-crypto-blue" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Balance */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Balance</span>
            <div className="flex items-baseline">
              {
                (() => {
                  const [balance, setBalance] = useState<number | null>(null);

                  useEffect(() => {
                    getTransactions(wallet).then((res) => {
                      setBalance(res.balance);
                    });
                  }, [wallet]);

                  if (balance === null) {
                    return <span className="text-sm text-gray-500">Loading...</span>;
                  }

                  return balance.toFixed(4);
                })()
              }<div/>
              <span className="ml-1 text-lg font-medium">ETH</span>
            </div>
          </div>
          
          {/* Wallet Address */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Wallet Address</span>
            <div className="flex items-center mt-1 overflow-hidden">
              <div className="text-sm bg-secondary rounded-md px-3 py-1 font-mono overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">
                {displayAddress}
              </div>
              <button 
                className="ml-2 text-xs text-crypto-blue hover:text-crypto-purple transition-colors"
                onClick={() => {navigator.clipboard.writeText(wallet)}}
              >
                Copy
              </button>
            </div>
          </div>
          
          {/* Recent Transactions */}
          <div className="pt-2">
            <h4 className="text-sm text-gray-500 mb-2">Recent Transactions</h4>
            {transactions?
            

          
            <div className="space-y-2">
              {transactions.map((tx,index) => (
                <div key={tx.blockNumber} className="flex justify-between items-center p-2 bg-secondary/50 rounded-lg text-sm">
                  <div className="flex items-center">
                    <Badge 
                      className={index%2==0 
                        ? 'bg-crypto-green/20 text-crypto-green hover:bg-crypto-green/30 mr-2' 
                        : 'bg-crypto-orange/20 text-crypto-orange hover:bg-crypto-orange/30 mr-2'
                      }
                    >
                      {index%2==0  ? 'In' : 'Out'}
                    </Badge>
                    <span>{parseFloat(tx.value) / 1e18} ETH</span>
                  </div>
                  <span className="text-xs text-gray-500">{formatDistanceToNow(new Date(tx.timestamp), {
      addSuffix: true,
    })}</span>
                </div>
              ))}
            </div>:<>Loading...</>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
