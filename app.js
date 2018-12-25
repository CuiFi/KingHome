//app.js
App({
  onLaunch: function(obj) {
    // 获取小程序基础库版本
    const version = wx.getSystemInfoSync().SDKVersion;
    console.log(version);
    if (version <= '1.9.9') {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }

    // 获取系统管理权限
    const updateManager = wx.getUpdateManager();

    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate);
    });

    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    });

    updateManager.onUpdateFailed(function() {
      // 新版本下载失败
      wx.showModal({
        title: '下载失败',
        content: '小程序更新下载失败,请退出重新启动',
        success: function (res) {
          if (res.confirm) {
            
          }
        }
      })
    });


    // 场景值
    // console.log(obj.scene);

    wx.login({
      success: res => {
        console.log(res.code);
        // 发送code给后端,用于后续解密手机号
        wx.request({
          url: 'https://request.hejianzhiyang.com/Jinguanjia/getsession',
          method: 'POST',
          data: {
            code: res.code
          },
          success: function(res) {
            console.log(res);
            wx.setStorageSync('session_key', res.data.session_key);
            // wx.redirectTo({
            //   url: '/pages/index/index'
            // });
          }
        })
      }
    });

  }
})