// pages/showpage/showpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cont: {
      txth1: "兰特花园",
      txth2: "张三",
      txth3: "2018.1.1",
      txtp: "此处是我们家项目的介绍",
      oneImg: [
        {
          url: '/img/pic_article.png'
        },
        {
          url: '/img/pic_article.png'
        }
      ]
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    console.log("展示页面所用id:"+options.id);
    // var id = wx.getStorageSync('id') || []
    // console.log(typeof ("hello:" + id));
    // 根据id获取当前身份具体人的案例列表信息
    wx.request({
      url: 'https://request.hejianzhiyang.com/Shouji/cc?id=' + options.id,
      method: "GET",
      data: {},//openid 用于获取对应信息
      success: function (res) {
        _this.setData({
          // cont: res.data
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})