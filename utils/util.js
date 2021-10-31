const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-');
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getNextDate = (date, index)=> {
  const year = date.getFullYear()
  const month = date.getMonth() + 1;
  const day = date.getDate() + index;

  return [year, month, day].map(formatNumber).join('-');
}

// var api = require('../config/api.js');
var app = getApp();

/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "GET") {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'X-Litemall-Token': wx.getStorageSync('token')
      },
      success: function(res) {

        if (res.statusCode == 200) {

          if (res.data.errno == 501) {
            // 清除登录相关内容
            showErrorToast("请先登陆");
            try {
              wx.removeStorageSync('userInfo');
              wx.removeStorageSync('token');
            } catch (e) {
              // Do something when catch error
            }

          
          
            // 切换到登录页面
            // wx.navigateTo({
            //   url: '/pages/my/my'
            // });
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }

      },
      fail: function(err) {
        reject(err)
      }
    })
  });
}

function redirect(url) {

  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    duration: 3000,
    image: '/img/icon_error.png'
  })
}

function showSuccessToast(msg){
  wx.showToast({
    title: msg,
    duration: 3000,
    image: '/img/xiaolian.png',
  })
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  getNextDate: getNextDate,
  request,
  redirect,
  showErrorToast,
  showSuccessToast
}
