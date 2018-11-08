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
        imgUrl: "/img/anli.jpg"
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
        text: "东海岸长",
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
    var _this = this;
    var id = wx.getStorageSync('id') || []
    // console.log(typeof ("hello:" + id));
    // 根据id获取当前身份具体人的案例列表信息
    wx.request({
      url: 'https://request.hejianzhiyang.com/Shouji/cc?id='+id,
      method: "GET",
      data: {},//openid 用于获取对应信息
      success:function(res){
        _this.setData({
          // grids:res.data
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