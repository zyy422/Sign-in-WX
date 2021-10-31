import util from "../../utils/util"
import api from  "../../utils/api"
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    date: '',
    show: false,
  },

  onChange(event) {
    let index = event.currentTarget.dataset.id;
    let courseList = this.data.courseList;
    for (let i in courseList) {
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

  checkSuccessNotice(event){
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

    console.log("签到通知开始订阅！");
    wx.requestSubscribeMessage({
      tmplIds: ['Llv1CgwbIBgyWfBLjS8zNUJI_JQ5EK936lKq9aZTh9Q'],
      success (res) { 
        console.log("订阅回调成功！"); 
        util.request(api.courseCheckInSubmit,{'selectedCourse': selectedCourse},"POST").then(
          res =>{
            switch (res.errno) {
              case -1:
                util.showErrorToast("勿重复签到");
                break;
              case -2:
                util.showErrorToast("课时不足");
                break;
              case 0:
                util.showSuccessToast("签到成功");
                break;
            }
          }
        )
      }
    })
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
        })
        if (courseList.length==0) {
          Toast('对比起，您没有可以签到的课程！');
        }
      }
    }).catch(function (err) {util.showErrorToast("请先登陆！或网络异常")});
  }
})