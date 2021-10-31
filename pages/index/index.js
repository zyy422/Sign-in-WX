//index.js
const { imgUrlRoot } = require("../../utils/api");
const util = require("../../utils/util");
const api = require("../../utils/api");
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

Page({
  data: {
    indexADImageUrl: imgUrlRoot+"/index_img1.png",
    menuList: [{
        name: '课程购买',
        path: '/pages/shopList/shopList',
        icon: '/img/index_img2.png'
      },
      {
        name: '课程请假',
        path: '/pages/courseBooking/courseBooking',
        icon: '/img/index_img3.png'
      },
      {
        name: '课程签到',
        path: '/pages/courseCheckIn/courseCheckIn',
        icon: '/img/index_img4.png'
      },
      {
        name: '新鲜事儿',
        path: '/pages/posts/post',
        icon: '/img/index_img5.png'
      },
    ],
    news: [],
    contacts: []
  },

  onLoad: function () {
    var that = this;
    util.request(api.initNews).then(
      res => {
        console.log(res.data.news);
        that.setData({
          news: res.data.news
        })
      }
    ).catch(e => {
      console.log(e)
    });

    util.request(api.initContacts).then(
      res => {
        console.log(res);
        that.setData({
          contacts: res.data.contacts
        })
      }
    ).catch(e => {
      console.log(e)
    });
  },
  
  navigator:function(e){
    let url = e.currentTarget.dataset.url
    if (url == '/pages/posts/post') {
      util.showErrorToast("该功能暂未开放");
    }
    wx.navigateTo({
      url
    })
  },

  redirect:function(e){ 
    let url = e.currentTarget.dataset.url
    wx.redirectTo({
      url
    })
  },

  onShow:function(){
    this.getUserNameAndPhone();
  },

  getUserNameAndPhone: function(){
    let userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {

      util.request(api.queryUserInfo).then(res=>{
        if (res.data.mobile=='未知号码' || res.data.studentName=="未知用户"){
            console.log("===",res);
            Dialog.alert({
              title: '警告',
              message: '请补充学生姓名和手机号码信息',
            }).then(() => {
              wx.navigateTo({
                url: '/pages/personalCenter/personalCenter',
              })
            });
        }

      }).catch(res=>{
        util.showErrorToast("后台异常");
      });

    }
  },
})