import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import util from "../../utils/util"
import api from  "../../utils/api"
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: null,
    region: [],
    date: '',
    show: false,
    active: 1
  },

  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },

  bookingRightNow(event){
    console.log("课程预约即将开始通知", this.data.courseList);
    var selectedCourse = [];
    let i = 0;
    for (let eachCourse of this.data.courseList) {
      if (eachCourse.checked && true == eachCourse.checked) {
        eachCourse.course_date = this.data.date;
        selectedCourse.push(eachCourse);
      }
    }

    if (selectedCourse.length != 1) {
      util.showErrorToast("请选择一门需要请假的课程");
      return;
    }

    wx.requestSubscribeMessage({
      tmplIds: ['thvBVLKNh8ihe5uf5HUxbuPU5aO8gOMkL_-7_SPLhKQ'],
      success (res) { 
        console.log("【通知成功！】url: ",api.courseAbsentSubmit); 
        util.request(api.courseAbsentSubmit,{'selectedCourse': selectedCourse},"POST").then(res=>{
          switch (res.errno) {
            case -1:
              util.showErrorToast("勿重复请假");
              break;
            case -2:
              util.showErrorToast("课时不足");
              break;
            case 0:
              util.showSuccessToast("请假成功");
              break;
          }
        });
      },
      fail(res){
        util.showErrorToast("课时不足");
      },
      complete(res){
        console.log("【通知完成！】booking right now ");
      }
    })
  },

  checkOnChange(event) {
    let index = event.currentTarget.dataset.id;
    let courseList = this.data.courseList;
    for (let i in courseList) {
      console.log("索引", i);
      if (i == index) {
        courseList[i].checked =true;
      } else {
        courseList[i].checked =false;
      }    
    }

    this.setData({
      courseList
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    util.request(api.courseAbsent).then(function (res) {
      if (res.errno === 0) {
        let courseList = res.data.courseList;
        console.log(courseList);
        that.setData({
          courseList,
        });
        if (courseList.length==0) {
          Toast('对比起，您没有可以请假的课程！');
        }
      }
    }).catch(function (err) {util.showErrorToast("请先登陆！或网络异常")});
  },
  bindRegionChange: function (e) { 
    this.setData({
      region: e.detail.value
    })
  },
  bindFilterClick:function(){
    wx.navigateTo({
      url: '../coachFilter/coachFilter',
    })
  },
  bindCoachClick:function(e){
    wx.navigateTo({
      url: '../coachDetail/coachDetail?id=',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let date = new Date();
    let util = require("../../utils/util.js");
    date = util.formatDate(date);
    this.setData({ date: date });
  },

  onDisplay() {
    this.setData({ show: true });
  },
  select(event){
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    let util = require("../../utils/util");
    date = util.formatDate(date);
    return date;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  }
})