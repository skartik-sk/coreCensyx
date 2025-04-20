
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UnchainScoreData } from "@/lib/types";

interface UnchainScoreProps {
  result: any;
}

const UnchainScore = ({ result }: UnchainScoreProps) => {
  const getLevelColor = (level: number) => {
    if (level < 30) {
      return 'text-blue-500';
    } else if (level >= 30 && level < 60) {
      return 'text-green-500';
    } else if (level >= 60 && level < 80) {
      return 'text-purple-500';
    } else if (level >= 80) {
      return 'text-orange-500';
    } else {
      return 'text-gray-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score < 30) return 'from-red-500 to-orange-500';
    if (score < 60) return 'from-orange-500 to-yellow-500';
    if (score < 80) return 'from-yellow-500 to-green-500';
    return 'from-green-500 to-blue-500';
  };

  return (
    <>
    {result?
    <Card className="glass-card hover-lift">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-medium">Your coreCensyx Score</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Main Score */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{result.score}</span>
              </div>
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="stroke-slate-200"
                  fill="none"
                  strokeWidth="3.8"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={`stroke-[3.8px] stroke-current ${getScoreColor(result.score)}`}
                  fill="none"
                  strokeWidth="3.8"
                  strokeDasharray={`${result.score}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm text-gray-500">Level</p>
              <p className={`text-lg font-semibold ${getLevelColor(result.score)}`}>
                {result.score}
              </p>
            </div>
          </div>
          
          {/* Sub-scores */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Activity</span>
                <span className="text-sm font-medium">{result.totalTxs}%</span>
              </div>
              <Progress value={result.totalTxs} className="h-2 mt-1" />
            </div>
            
            <div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Security {result.internalRatio}%</span>
              </div>
              <Progress value={result.internalRatio} className="h-2 mt-1" />
            </div>
            
          </div>
        </div>
      </CardContent>
    </Card>:
    <div>Enter your wallter address</div>}
    </>
  );
};

export default UnchainScore;
