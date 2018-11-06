// pages/editlist/editlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: [
      {
        url: '/pages/deg/deg?id=5',
        text: "东海岸长安哇哈哈",
        imgUrl: "/img/icon_tabbar.png"
      },
      {
        url: '/pages/deg/deg?id=5',
        text: "东海岸长安哇哈哈",
        imgUrl: "/img/icon_tabbar.png"
      },
      {
        url: '/pages/deg/deg?id=5',
        text: "东海岸长安哇哈哈",
        imgUrl: "/img/icon_tabbar.png"
      },
      {
        url: '/pages/deg/deg?id=5',
        text: "东海岸长安哇哈哈",
        imgUrl: "/img/icon_tabbar.png"
      },
      {
        url: '/pages/deg/deg?id=5',
        text: "东海岸长安哇哈哈",
        imgUrl: "/img/icon_tabbar.png"
      },
      {
        url: '/pages/deg/deg?id=5',
        text: "东海岸长安哇哈哈",
        imgUrl: "/img/icon_tabbar.png"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = wx.getStorageSync('id') || []
    console.log(id);
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