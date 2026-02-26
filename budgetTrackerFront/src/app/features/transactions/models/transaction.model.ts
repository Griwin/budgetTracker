export interface Transaction {
  id: number;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  category: {
    id: number;
    name: string;
    type: string;
  };
}
