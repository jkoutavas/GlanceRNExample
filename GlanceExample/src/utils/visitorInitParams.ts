class VisitorInitParams {
  groupID: number;
  visitorID: string;
  site: string;
  token: string;
  name: string;
  email: string;
  phone: string;
  allowedCameras: string;

  constructor(groupID: number) {
    this.groupID = groupID;
    this.visitorID = '';
    this.site = '';
    this.token = '';
    this.name = '';
    this.email = '';
    this.phone = '';
    this.allowedCameras = '"front","back"';
  }
}

export default VisitorInitParams;
