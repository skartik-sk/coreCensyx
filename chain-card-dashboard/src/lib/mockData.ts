
import { User, WalletData, UnchainScoreData } from './types';

export const mockUser: User = {
  id: 'user-001',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  profileImage: 'https://i.pravatar.cc/150?img=12',
  joinDate: new Date('2023-06-15'),
};

export const mockWallet: WalletData = {
  address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  balance: 2.547,
  currency: 'ETH',
  transactions: [
    {
      id: 'tx-001',
      type: 'receive',
      amount: 0.5,
      timestamp: new Date('2023-08-12T14:32:00'),
      status: 'completed',
    },
    {
      id: 'tx-002',
      type: 'send',
      amount: 0.125,
      timestamp: new Date('2023-08-10T09:17:00'),
      status: 'completed',
    },
    {
      id: 'tx-003',
      type: 'receive',
      amount: 0.35,
      timestamp: new Date('2023-08-05T16:45:00'),
      status: 'completed',
    }
  ]
};

export const mockScore: UnchainScoreData = {
  score: 78,
  level: 'Pro',
  activity: 85,
  security: 70,
  diversity: 80
};
