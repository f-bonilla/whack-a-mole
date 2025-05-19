class NetStatus {
  constructor() {
    if (NetStatus.instance) {
      return NetStatus.instance;
    }

    this._isOnline = navigator.onLine;

    window.addEventListener("online", () => {
      this._isOnline = true;
      console.log("Conexión restaurada.");
    });

    window.addEventListener("offline", () => {
      this._isOnline = false;
      console.warn("Conexión perdida.");
    });

    NetStatus.instance = this;
  }

  get isOnline() {
    return this._isOnline;
  }
}

export default new NetStatus();
