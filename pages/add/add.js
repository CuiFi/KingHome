// pages/add/add.js
import Dialog from '../../vantdist/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:null,
    goodf:[
      {
        name:"张三",
        tel:"13800138000"
      },
      {
        name: "李四",
        tel: "13800138001"
      }

    ]
  },

  onClose(event) {
    console.log(event);
    var ii = event.currentTarget.dataset.key;
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
          instance.close();
          instance.setData({
            active: ii.toString()
          });
        }).catch(() => {
          console.log("不想删除了");
        });
        break;
    }
  },


  // onClose(event) {
  //   const { position, instance } = event.detail;
  //   switch (position) {
  //     case 'left':
  //     case 'cell':
  //       instance.close();
  //       break;
  //     case 'right':
  //       Dialog.confirm({
  //         message: '确定删除吗？'
  //       }).then(() => {
  //         instance.close();
  //       });
  //       break;
  //   }
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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