class GlobalLock {
  static lockQueue = [];
  static lockStatus;

  static getLock() {
    this.lockStatus = true;
  }

  static releaseLock() {
    this.lockStatus = false;

    if (this.lockQueue && this.lockQueue.length) {
      for (let i = 0; i < this.lockQueue.length; i++) {
        const queuedProcess = this.lockQueue[i];
        queuedProcess();
      }
      this.lockQueue = [];
    }
  }
}
