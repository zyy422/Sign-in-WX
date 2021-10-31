var user = require('./utils/user.js');
//app.js
App({
  onLaunch: function () {
    
  },

  onShow: function(options) {
    user.checkLogin().then(res => {
      this.globalData.hasLogin = true;
      console.log("用户是已登陆的！");
    }).catch(() => {
      this.globalData.hasLogin = false;
      console.log("用户没有登陆的！");
    });
  },

  globalData: {
    hasLogin: false
  }
})