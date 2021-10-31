// pages/feedBack/feedBack.js
import util from "../../utils/util"
import api from  "../../utils/api"
import { isPlainObject } from "../../miniprogram_npm/@vant/weapp/common/validator";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  feedbackSubmit (e) {
    let comment = e.detail.value.textarea;
    if (comment == '') {
      util.showErrorToast("内容不能为空");
      return;
    }
    util.request(api.commentsSubmit, {'comment': comment}, 'POST').then(
      res => {
        if (res.value == -1) {
          utisPlainObject.showErrorToast("用户未登录或未知错误");
        } else {        
        util.showSuccessToast("反馈已提交！");
        
      }
      }
    ).catch(e => {
      util.showErrorToast("反馈失败!");
      console.log(e);
    });
    
  }
})