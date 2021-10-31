var util = require('../../utils/util.js');
var user = require('../../utils/user.js');
const api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    years:null,
    year: new Date().getFullYear(),
    months:null,
    month: 2,
    days:null,
    day: 2,
    value: [9999, 1, 1],
    isDaytime: true,

    userId: null,
    nickName: null,
    sex: null,
    studentName: "请完善信息",
    phoneNumber: "请完善信息",
    show: false,
    currentDate: null,
    birthday: "请完善信息",
  },

  onShow:function(){
    var that = this;
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      nickName: userInfo.nickName,
    });
    util.request(api.queryUserInfo).then(res=>{
      console.log(res);
      let gender=res.data.gender;
      switch (gender) {
        case 0:
          gender = "未知";
          break;
        case 1:
          gender = "男";
          break;
        case 2:
          gender = "女";
          break;
      }
      that.setData({
        studentName: res.data.studentName,
        phoneNumber: res.data.mobile,
        userId: res.data.userId,
        sex: gender,
        birthday: res.data.birthday
      })
    }).catch(res=>{
      util.showErrorToast("后台异常")
    });
  },

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  onInput(event) {
    console.log(event)
    this.setData({
      currentDate: event.detail,
    });
  },

  confirm(e) {
    let month = this.data.month <10 ? "0" + this.data.month : this.data.month;
    let day = this.data.day <10 ? "0" + this.data.day : this.data.day;
    let selectedDate = this.data.year + "-" + month + "-" +day;
    this.setData({
      birthday: selectedDate,
      show: false
    });
    util.request(api.modifyPhoneNo, {"birthday": selectedDate}, 'POST').then(res=>{
      if (res.errno==0) {
        util.showSuccessToast("修改成功");
      } else{
        util.showErrorToast("修改失败");
      }
    }).catch(e=>{util.showErrorToast("系统异常");});
  },

  cancel(e) {
    this.setData({
      show: false
    })
  },

  onLoad:function(){
    const date = new Date()
    const years = []
    const months = []
    const days = []

    for (let i = 1990; i <= date.getFullYear(); i++) {
      years.push(i)
    }

    for (let i = 1; i <= 12; i++) {
      months.push(i)
    }

    for (let i = 1; i <= 31; i++) {
      days.push(i)
    }

    this.setData({
      years,
      months,
      days
    })
  },

  bindChange(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      isDaytime: !val[3]
    })
  }
})