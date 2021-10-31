// pages/my/my.js
const { imgUrlRoot } = require("../../utils/api");
var util = require('../../utils/util.js');
var user = require('../../utils/user.js');
var api = require("../../utils/api.js");
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverList:[
      {icon:'/img/my_img6.png',name:'我的课程',path:'/pages/cardList/cardList'},
      {icon:'/img/my_img7.png',name:'帮助中心',path:'/pages/helpCenter/helpCenter'},
      {icon:'/img/my_img8.png',name:'意见反馈',path:'/pages/feedBack/feedBack'},
      {icon:'/img/my_img9.png',name:'加盟合作',path:'/pages/joinUs/joinUs'},
    ],
    logined: false,
    nickName: null,
    avatarUrl: null,
  },

  // 点击登陆后，进行登陆
  getUserInfo: function(event) {
    wx.getUserProfile({
      desc: '获取用户信息',
      success: (res) => {
        Toast.loading({
          message: '登陆中...',
          forbidClick: true,
        });
        this.doLogin(res.userInfo);
        Toast.success('登录成功');
      },
      fail: (err) => {
        util.showErrorToast('微信登录失败');
      }
    }
    )
  },

    // 如果checkLogin检查登陆状态有异常，则执行loginByWeixin进行重新登陆
    doLogin: function(userInfo) {
      user.checkLogin().catch(() => {
        user.loginByWeixin(userInfo).then(res => {
          app.globalData.hasLogin = true;
          this.setData({
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl,
            logined: true,
          });
        }).catch((err) => {
          app.globalData.hasLogin = false;
          util.showErrorToast('用户登录失败');
        });
      });
    },
  
  navigator:function(e){
    let url = e.currentTarget.dataset.url;
    console.log(url);
    if (url == '/pages/bookingRightNow/bookingRightNow') {
      util.showErrorToast("该功能暂未开放");
      return;
    }
    wx.navigateTo({
      url
    })
  },
  redirect:function(e){ 
    let url = e.currentTarget.dataset.url;
    wx.redirectTo({
      url
    })
  },
  
  // 缓存中有用户信息，直接更新头像，向后台发送数据，刷新后台的缓存和token
  onShow: function(){
    let userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl,
        logined: true,
      });
    }
  },

  getUserNameAndPhone: function(){
    let userInfo = wx.getStorageSync('userInfo');
    util.request(api.queryUserInfo).then(res=>{
      if (res.data.mobile=='未知号码' || res.data.studentName=="未知用户"){
          Dialog.alert({title: '警告', message: '请补充学生姓名和手机号码信息',}).then(() => {
            wx.navigateTo({
              url: '/pages/personalCenter/personalCenter',
            })
          });
      }

    }).catch(res=>{
      util.showErrorToast("后台异常");
    });
  },


  onLoad: function(){
    this.getUserNameAndPhone();
    
  },
})