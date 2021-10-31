var util = require('../../utils/util.js');
const api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNo: null
  },

  submitPhoneNo(e){
    let phoneNo = this.data.phoneNo;
    util.request(api.modifyPhoneNo, {'phoneNo': phoneNo}, 'POST').then(
      res => {
        util.showErrorToast("修改成功");
        setTimeout(function(){
          wx.navigateBack()
        },1000);
      }
    ).catch(e=>{
      util.showErrorToast("修改失败");
    })
  },
  onChange(e){
    let phoneNo = e.detail;
    this.setData({
      phoneNo
    })
  }
})