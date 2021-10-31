var util = require('../../utils/util.js');
const api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: null
  },

  submitUserName(e){
    let userName = this.data.userName;
    util.request(api.modifyPhoneNo, {'userName': userName}, 'POST').then(
      res => {
        if (res.errno == -2) {
          util.showErrorToast("失败！存在同名学生");
          setTimeout(function(){
            wx.navigateBack()
          },1000);
        } else if (res.errno == 0) {
          util.showSuccessToast("修改成功");
          setTimeout(function(){
            wx.navigateBack()
          },1000);
        } else {
          util.showErrorToast("未知错误");
          setTimeout(function(){
            wx.navigateBack()
          },1000);
        }
      }
    ).catch(e=>{
      util.showErrorToast("修改失败");
    })
  },
  onChange(e){
    let userName = e.detail;
    this.setData({
      userName
    })
  }
})