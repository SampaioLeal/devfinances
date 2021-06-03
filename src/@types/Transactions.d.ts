interface IUserInfo {
  inputs: number;
  outputs: number;
}

interface ITransaction {
  id?: string;
  description: string;
  amount: number;
  date: Date;
}
