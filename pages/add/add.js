// pages/add/add.js
import Dialog from '../../vantdist/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodf:[
      {
        name:"张三",
        idid:1,
        tel:"13800138000"
      },
      {
        name: "李四",
        idid:2,
        tel: "13800138001"
      },
      {
        name: "王五",
        idid:3,
        tel: "13800138001"
      },
      {
        name: "赵六",
        idid:4,
        tel: "13800138001"
      }

    ]
  },

  onClose(event) {
    var _this = this;
    console.log(event);
    var ii = event.currentTarget.dataset.key;
    console.log(ii);
    console.log(typeof event.currentTarget.dataset.key);
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          console.log(instance);
          wx.request({
            url: 'https://request.hejianzhiyang.com/Jinguanjia/getcontent',
            method:'POST',
            data:{},
            success:res => {
              console.log(res);
              instance.close();
              _this.setData({
                goodf: [
                  {
                    name: "张三",
                    idid: 1,
                    tel: "13800138000"
                  },
                  {
                    name: "李四",
                    idid: 2,
                    tel: "13800138001"
                  },
                  {
                    name: "赵六",
                    idid: 4,
                    tel: "13800138001"
                  }
                ]
              });
            }
          })
        }).catch(() => {
          instance.close();
          console.log("不想删除了");
        });
        break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 禁止分享当前页面
    wx.hideShareMenu();
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