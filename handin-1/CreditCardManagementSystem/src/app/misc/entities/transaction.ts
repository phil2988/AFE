import { CreditCard } from "./credit-card";

export interface Transaction {
  credit_card: CreditCard;
  uid?: string;
  amount: number;
  comment: string;
  date: number;
  currency: string;
}

export const CURRENCIES = [
  'CAD',
  'EUR',
  'KYD',
  'MWK',
  'NAD',
  'USD',
]
