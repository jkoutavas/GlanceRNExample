class VisitorInitParams {
    
    constructor(groupID) {
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