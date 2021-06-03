import { makeAutoObservable } from "mobx";
import firebaseServices from "../services/firebase";

class TransactionsStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  loading = true;
  setLoading(bool: boolean) {
    this.loading = bool;
  }

  userInfo: IUserInfo | null = null;
  setUserInfo(userInfo: IUserInfo | null) {
    this.userInfo = userInfo;
  }

  transactions: ITransaction[] = [];
  setTransactions(transactions: ITransaction[]) {
    this.transactions = transactions;

    let inputs = 0,
      outputs = 0;

    transactions.forEach((transaction) => {
      if (transaction.amount > 0) {
        inputs += transaction.amount;
      } else {
        outputs -= transaction.amount;
      }
    });

    this.setUserInfo({ inputs, outputs });
  }

  async getUserInfo(uid: string) {
    const userInfo = await firebaseServices.db
      .collection("users")
      .doc(uid)
      .get();

    if (!userInfo.data()) {
      await firebaseServices.generateUserInfo(uid);
      return this.setUserInfo({ inputs: 0, outputs: 0 });
    }

    const transactions = await firebaseServices.db
      .collection("users")
      .doc(uid)
      .collection("transactions")
      .get();

    this.setTransactions(
      transactions.docs.map(
        (transaction) =>
          ({
            ...transaction.data(),
            id: transaction.id,
            date: transaction.data().date.toDate(),
          } as ITransaction)
      )
    );

    this.setLoading(false);
  }

  async create(uid: string, values: ITransaction) {
    const transaction = await firebaseServices.db
      .collection("users")
      .doc(uid)
      .collection("transactions")
      .add({
        description: values.description,
        date: firebaseServices.dateToTimestamp(values.date),
        amount: values.amount,
      });

    const newTransactions = [
      { ...values, id: transaction.id },
      ...this.transactions,
    ];
    this.setTransactions(newTransactions);
  }
}

const transactionsStore = new TransactionsStore();
export default transactionsStore;
