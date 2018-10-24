//index.js
//获取应用实例
var amapFile = require('../../libs/amap-wx.js');

const app = getApp()

Page({
  data: {
    motto: '欢迎登陆合建金管家',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  goUpf:function(){
    wx.navigateTo({
      url: '/pages/upf/upf'
    })
  },

  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)

    if (e.detail.errMsg == "getPhoneNumber:fail user deny" || e.detail.errMsg == "getPhoneNumber:fail:cancel to confirm login") {
      // 拒绝时候什么都不执行
    } else {

      wx.request({
        url: 'https://request.hejianzhiyang.com/Qd/getphone', //仅为示例，并非真实的接口地址
        method: "POST",
        data: {
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData,
        },
        success: function (res) {
          let url = '/pages/upf/upf';//res.url
          wx.setStorageSync('firstUrl', url)
          wx.redirectTo({
            url: url,
          })
        }
      })
    }

  }, 


  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: '56c9acc97918a0cb8110fcf77f2c5ace' });
    myAmapFun.getRegeo({
      success: function (data) {
        console.log(data[0].regeocodeData.formatted_address);
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    });
  },



  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
