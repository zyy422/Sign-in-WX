// pages/courseDetail/courseDetail.js
const { imgUrlRoot } = require("../../utils/api");
var util = require("../../utils/util");
var api = require("../../utils/api");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMore:false,
    courseDetail: null,
    show: false,
    radio: "1",
    purchaseNumber: "1",
    totalPrice: "6000.00"

  },

  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },

  onClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name,
    });
  },

  showPopup() {
    util.showSuccessToast("仅支持到店购买");
    return false;
    this.setData({ show: true });
  },

  decrease(event){
    let purchaseNumber = this.data.purchaseNumber;
    purchaseNumber = parseInt(purchaseNumber) -1;

    if (purchaseNumber <= 0) {
      purchaseNumber = 0;
    }

    let price = this.data.courseDetail.price;
    let totalPrice =  parseInt(price) * purchaseNumber;

    this.setData({ 
      purchaseNumber: purchaseNumber,
      totalPrice: totalPrice,
    });
  },

  add(event){
    let purchaseNumber = this.data.purchaseNumber;
    purchaseNumber = parseInt(purchaseNumber) + 1;
    let price = this.data.courseDetail.price;
    let totalPrice =  parseInt(price) * purchaseNumber;
    this.setData({
      purchaseNumber: purchaseNumber,
      totalPrice: totalPrice,
    });
  },

  onClose() {
    this.setData({ show: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let course_id = options.course_id;
    console.log(course_id);
    var that = this;
    util.request(api.courseDetail+'?courseId='+course_id).then(function (res) {
      if (res.errno === 0) {
        let courseDetail = res.data.courseDetail;
        that.setData({
          courseDetail,
        })
      }
    }).catch(function (err) {console.log(err)} );
  },

  bindShmoreClick:function(){
    this.setData({
      showMore:!this.data.showMore
    })
  },

  submitOrder: function() {
    //先进行登陆判断，若没有登陆，引导至登陆界面
    util.showErrorToast('请先登陆');
    if (this.data.addressId <= 0) {
      util.showErrorToast('请选择收货地址');
      return false;
    }
    
    util.request(api.OrderSubmit, {
      cartId: this.data.cartId,
      addressId: this.data.addressId,
      couponId: this.data.couponId,
      userCouponId: this.data.userCouponId,
      message: this.data.message,
      grouponRulesId: this.data.grouponRulesId,
      grouponLinkId: this.data.grouponLinkId
    }, 'POST').then(res => {
      if (res.errno === 0) {
          console.log(res);
          console.log("下单成功，submit成功！");
        // 下单成功，重置couponId
        try {
          wx.setStorageSync('couponId', 0);
        } catch (error) {

        }

        const orderId = res.data.orderId;
        const grouponLinkId = res.data.grouponLinkId;
        util.request(api.OrderPrepay, {
          orderId: orderId
        }, 'POST').then(function(res) {
          if (res.errno === 0) {
            const payParam = res.data;
            console.log("支付过程开始");
            wx.requestPayment({
              'timeStamp': payParam.timeStamp,
              'nonceStr': payParam.nonceStr,
              'package': payParam.packageValue,
              'signType': payParam.signType,
              'paySign': payParam.paySign,
              'success': function(res) {
                console.log("支付过程成功");
                if (grouponLinkId) {
                  setTimeout(() => {
                    wx.redirectTo({
                      url: '/pages/groupon/grouponDetail/grouponDetail?id=' + grouponLinkId
                    })
                  }, 1000);
                } else {
                  wx.redirectTo({
                    url: '/pages/payResult/payResult?status=1&orderId=' + orderId
                  });
                }
              },
              'fail': function(res) {
                console.log("支付过程失败");
                wx.redirectTo({
                  url: '/pages/payResult/payResult?status=0&orderId=' + orderId
                });
              },
              'complete': function(res) {
                console.log("支付过程结束")
              }
            });
          } else {
            wx.redirectTo({
              url: '/pages/payResult/payResult?status=0&orderId=' + orderId
            });
          }
        });

      } else {
        util.showErrorToast(res.errmsg);
      }
    });
  }
  
})