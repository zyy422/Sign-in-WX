var api = require("../../utils/api");
var util = require("../../utils/util");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowType: 0,
    typeList: [
      '已签到',
      '已核销'
    ],
    list: [],
    active: 0,
    date: '',
    isChecked: false,
    show: false,
    minDate: null,
    maxDate: null
  },

  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    return `${date.getFullYear()}-${month}-${day}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
    this.queryCheckedCourse();
  },

  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
    this.setData({
      isChecked: !this.data.isChecked
    });
    this.queryCheckedCourse();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let now = new Date();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    now =  `${now.getFullYear()}-${month}-${day}`;
    this.setData({
      date: now,
      minDate: new Date().setMonth((new Date().getMonth()-6)),
      maxDate: new Date().setMonth((new Date().getMonth()+6)),
    });
    this.queryCheckedCourse();

  },

  bindTypeChange: function (e) {
    let nowType = e.currentTarget.dataset.idx
    if (nowType === this.data.nowType) return false;
    let list = this.data.list
    // 请求新数据
    list = list.length > 3 ? list.splice(0, 2) : list.concat(list)
    this.setData({
      nowType,
      list
    })
  },

  queryCheckedCourse(){
    var that = this;
    util.request(api.queryCheckedCourse, {"course_date": this.data.date, "isChecked" : this.data.isChecked}, 'POST').then(res=>{
      if (res.errno == 0) {
        console.log(res.data);
        that.setData({
          list: res.data
        })
      } else{
        util.showErrorToast("查询错误");
      }
    });
  }
})