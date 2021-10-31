import util from "../../utils/util"
import api from  "../../utils/api"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    util.request(api.queryMyCourse).then(res=>{
      console.log(res);
      let orders = res.data.orders;
      that.setData({
        orders
      })
    }).catch(e=>{    
    })
  },
})