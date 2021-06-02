import { makeAutoObservable } from "mobx";
import firebaseServices from "../services/firebase";

class AuthStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  loading = true;
  setLoading(bool: boolean) {
    this.loading = bool;
  }

  user: IUser | null = null;
  setUser(user: IUser | null) {
    this.user = user;
  }

  listen() {
    firebaseServices.listenAuth((user) => {
      if (user) {
        this.setUser(user);
      } else {
        this.setUser(null);
      }

      this.setLoading(false);
    });
  }
}

const authStore = new AuthStore();
export default authStore;
