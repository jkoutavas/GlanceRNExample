class StartParams {
  constructor() {
    this.mDisplayParams = null;
    this.mCaptureEntireScreen = false;
    this.mMediaProjectionEnabled = false;

    this.mainCallId = null;
    this.maxGuests = null;
    this.show = null;
    this.guestInfoFlags = null;
    this.encrypt = null;
    this.sessionKey = null;
    this.requestRC = null;
    this.instantJoin = null;
    this.forceTunnel = null;
    this.viewerCloseable = null;
    this.reportErrors = null;
    this.persist = null;
    this.presenceStart = null;
    this.paused = null;

    this.showTerms = false;
    this.videoMode = null;
    this.termsUrl = null;
  }
}

export default StartParams;
