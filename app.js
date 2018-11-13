//app.js
App({
  onLaunch: function (obj) {
    console.log(obj.scene);
    wx.login({
      success: res => {
        console.log(res.code);
        // 发送code给后端,用于后续解密手机号
        wx.request({
          url: 'https://request.hejianzhiyang.com/Jinguanjia/getsession',
          method:'POST',
          data:{
            code:res.code
          },
          success:function(res){
            console.log(res);
            wx.setStorageSync('session_key', res.data.session_key);
          }
        })
      }
    });

    wx.redirectTo({
      url: '/pages/index/index'
    });
    // 检查本地是否存储之前授权过的后台传回来的url
    // var firstUrl = wx.getStorageSync('firstUrl') || []
    // console.log(firstUrl.toString());
    // console.log(typeof firstUrl.length);

    // if(firstUrl.length){
    //   wx.switchTab({
    //     url: firstUrl.toString()
    //   });
    // }else{
    //   wx.redirectTo({
    //     url: '/pages/index/index'
    //   });
      // wx.login({
        // success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          // console.log(res);
          // var a = '/pages/index/index';
          // wx.redirectTo({
            // url: '/pages/index/index'
          // });
          // wx.setStorageSync('firstUrl', a)
        // }
      // })
    // }
    

    // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             // 可以将 res 发送给后台解码出 unionId
  //             this.globalData.userInfo = res.userInfo

  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             if (this.userInfoReadyCallback) {
  //               this.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
  // },
  // globalData: {
  //   userInfo: null
  }
})