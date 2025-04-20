
export interface User {
  id: string;
  email?: string;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  updated_at?: Date;
  
}

export interface WalletData {
  address: string;
  balance: number;
  currency: string;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
}

export interface UnchainScoreData {
  score: number; // 0-100
  level: string; // "Beginner", "Intermediate", "Pro", "Expert"
  activity: number; // 0-100
  security: number; // 0-100
  diversity: number; // 0-100
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  walletAddress?: string;
}
