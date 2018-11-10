// pages/editlist/editlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: []
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var theId = wx.getStorageSync('id') || []
    // console.log("hello:" + theId);
    // 根据id获取当前身份具体人的案例列表信息
    wx.request({
      url: 'https://request.hejianzhiyang.com/Jinguanjia/editlist',
      method: "POST",
      data: {
        id: theId
      },
      success:function(res){
        console.log(res);
        _this.setData({
          grids:res.data
        });
      }
    })
  },

  ggto:function(){
    wx.redirectTo({
      url: '/pages/pr/pr',
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
    console.log("进入编辑页面");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("离开编辑页面");
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