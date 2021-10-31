// pages/shopList/shopList.js
var api = require("../../utils/api");
var util = require("../../utils/util");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseLabel: [
      { text: '全部课程', value: 0 },
      { text: '未购买课程', value: 1 },
      { text: '已购买课程', value: 2 },
    ],
    defaultLabel: 0,
    list: null,
  },

  bindShopClick:function(e){
    let index = e.currentTarget.dataset.id;
    let course_id = this.data.list[index].courseId;
    console.log(course_id);
    wx.navigateTo({
      url: '../courseDetail/courseDetail?course_id='+course_id,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    util.request(api.courseListUrl).then(function (res) {
      if (res.errno === 0) {
        console.log(res.data.courseList);
        that.setData({
          list: res.data.courseList,
        });
      }
    }).catch(function (err) {console.log(err)} );
  }
})