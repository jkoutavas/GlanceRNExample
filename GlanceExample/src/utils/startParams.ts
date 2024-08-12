class StartParams {
  mDisplayParams: any | null;
  mCaptureEntireScreen: boolean;
  mMediaProjectionEnabled: boolean;

  mainCallId: string | null;
  maxGuests: number | null;
  show: boolean | null;
  guestInfoFlags: any | null;
  encrypt: boolean | null;
  key: string | null;
  requestRC: boolean | null;
  instantJoin: boolean | null;
  forceTunnel: boolean | null;
  viewerCloseable: boolean | null;
  reportErrors: boolean | null;
  persist: boolean | null;
  presenceStart: boolean | null;
  paused: boolean | null;

  showTerms: boolean;
  videoMode: any | null;
  termsUrl: string | null;

  constructor() {
    this.mDisplayParams = null;
    this.mCaptureEntireScreen = false;
    this.mMediaProjectionEnabled = false;

    this.mainCallId = null;
    this.maxGuests = null;
    this.show = null;
    this.guestInfoFlags = null;
    this.encrypt = null;
    this.key = null;
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
