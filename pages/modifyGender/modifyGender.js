var util = require('../../utils/util.js');
const api = require('../../utils/api.js');

Page({
  data: {
    man: true
  },
  onLoad: function (options) {

  },
  onShow: function () {
    
  },
  onChange: function(e) {
    let man = this.data.man;
    this.setData({
      man: !man
    })
  },
  submitUserName: function(e){
    let man = this.data.man;
    let gender;
    if (man) {
      gender = '1';
    } else {
      gender = '2';
    }
    util.request(api.modifyGender, {'gender': gender}, 'POST').then(res=>{
      console.log(res);
      if (res.errno==0) {
        util.showSuccessToast("修改成功！");
        setTimeout(function(){
          wx.navigateBack()
        },1000);

      } else {
        util.showErrorToast("修改失败");
      }
    }).catch({

    })
  }

})