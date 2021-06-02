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
  }

  async getUserInfo(uid: string) {
    let userInfo;

    userInfo = await firebaseServices.db.collection("users").doc(uid).get();

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

    return this.setUserInfo(userInfo.data() as IUserInfo);
  }
}

const transactionsStore = new TransactionsStore();
export default transactionsStore;
