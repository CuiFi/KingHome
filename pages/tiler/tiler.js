// pages/tiler/tiler.js
Page({

  /**
   * 页面的初始数据
   * active页面加载时从服务器获取,并且每次离开当前页面或者退出小程序的时候要进行active的提交服务器保存
   */
  data: {
    // 储存页面渲染完成要加载的tab
    tilerb_active_index: 0,
    tilerc_active_index: 0,

    // 用于设置tab显示与隐藏的数据绑定
    // 隐蔽工程
    // tilerb_active_0: false,
    // tilerb_active_1: true,
    // 瓦工施工
    // tilerc_active_0: false,

    // 用于显示列表图片
    // 墙体拆改
    tiler_fileList_0: [],
    // 隐蔽工程
    tilerb_fileList_0: [],
    tilerb_fileList_1: [],
    // 瓦工施工
    tilerc_fileList_0: [],
  },

  // 切换标签发生的事件
  changeClick: function (e) {
    console.log(e);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.active);
    /* options.id 客户id
     * 内部成员id
     *  
    */
    wx.setStorageSync("kehuID", options.id);
    // console.log("我是上个页面传过来的id:"+ options.id);
    var _this = this;
    wx.request({
      url: 'https://request.hejianzhiyang.com/Jinguanjia/loadimg', //获取已上传图片列表
      method: "POST",
      data: {
        kehuID: options.id,
        neibuID: wx.getStorageSync("id")
      },//openid 用于获取对应信息
      success(res) {
        _this.setData({
          // 整体拆改
          tiler_fileList_0:res.data.tag26,
          // 隐蔽工程
          tilerb_fileList_0:res.data.tag31,
          tilerb_fileList_1:res.data.tag32,
          // 瓦工施工
          tilerc_fileList_0:res.data.tag41,
        });
        // console.log(res.data)
      }
    });

    wx.getLocation({
      type: 'wgs84',
      success(res) {
        wx.setStorageSync("latitude", res.latitude);
        wx.setStorageSync("longitude", res.longitude);
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

  // 墙体拆改
  tiler_onChange_0(e) {
    const { file } = e.detail
    if (file.status === 'uploading') {
      this.setData({
        progress: 0
      })
      wx.showLoading()
    } else if (file.status === 'done') {
      // do something
    } else if (file.status === 'remove') {
      // console.log("我要告诉后台删除图片");
    }
  },
  tiler_onSuccess_0(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    // if (e.detail.fileList.length > 0) {
    //   this.setData({
    //     server_active_1: false
    //   });
    // }

    var _this = this;
    wx.request({
      url: 'https://request.hejianzhiyang.com/Jinguanjia/uploadimg',
      method: "POST",
      data: {
        uid: e.detail.file.uid,
        status: e.detail.file.status,
        sha1: shall.sha1,
        nbid: nbID,
        khid: khID,
        wd: lat,
        jd: lon,
        // 还要加上具体项目的标签项id
        cid: "26"
      },
      success(res) {
        // do something
      }
    })
  },
  tiler_onFail_0(e) {
    // console.log('onFail', e)
  },
  tiler_onComplete_0(e) {
    // console.log('onComplete', e)
    wx.hideLoading()
  },
  tiler_onPreview_0(e) {
    // console.log('onPreview', e);
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  tiler_onRemove_0(e) {
    // console.log(e);
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            tiler_fileList_0: fileList.filter((n) => n.uid !== file.uid),
          });
          wx.request({
            url: 'https://request.hejianzhiyang.com/Jinguanjia/deelteimg',
            method: 'POST',
            data: {
              status: e.detail.file.status,
              uid: e.detail.file.uid
            },
            success: (res) => {
              // do something
            }
          });
          // 判断当前图片列表是否等于0,要在确定按钮设置下一个tab的禁用状态
          // if (e.detail.fileList.length == 0) {
          //   this.setData({
          //     server_active_1: true
          //   });
          // }
        }
      },
    })
  },

  // 隐蔽工程
  // 00
  tilerb_onChange_0(e) {
    const { file } = e.detail
    if (file.status === 'uploading') {
      this.setData({
        progress: 0
      })
      wx.showLoading()
    } else if (file.status === 'done') {
      // do something
    } else if (file.status === 'remove') {
      // console.log("我要告诉后台删除图片");
    }
  },
  tilerb_onSuccess_0(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    if (e.detail.fileList.length > 0) {
      this.setData({
        tilerb_active_1: false
      });
    }

    var _this = this;
    wx.request({
      url: 'https://request.hejianzhiyang.com/Jinguanjia/uploadimg', //获取已上传图片列表
      method: "POST",
      data: {
        uid: e.detail.file.uid,
        status: e.detail.file.status,
        sha1: shall.sha1,
        nbid: nbID,
        khid: khID,
        wd: lat,
        jd: lon,
        // 还要加上具体项目的标签项id
        cid: "31"
      },
      success(res) {
        // do something
      }
    })
  },
  tilerb_onComplete_0(e) {
    wx.hideLoading()
  },
  tilerb_onFail_0(e) {
    // do something
  },
  tilerb_onPreview_0(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  tilerb_onRemove_0(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            tilerb_fileList_0: fileList.filter((n) => n.uid !== file.uid),
          });
          wx.request({
            url: 'https://request.hejianzhiyang.com/Jinguanjia/deelteimg',
            method: 'POST',
            data: {
              status: e.detail.file.status,
              uid: e.detail.file.uid
            },
            success: (res) => {
              // do something
            }
          });
          // 判断当前图片列表是否等于0,要在确定按钮设置下一个tab的禁用状态
          // if (e.detail.fileList.length == 0) {
          //   this.setData({
          //     server_active_2: true
          //   });
          // }
        }
      },
    })
  },

  //02
  tilerb_onChange_1(e) {
    const { file } = e.detail
    if (file.status === 'uploading') {
      this.setData({
        progress: 0
      })
      wx.showLoading()
    } else if (file.status === 'done') {
      // do something
    } else if (file.status === 'remove') {
      // console.log("我要告诉后台删除图片");
    }
  },
  tilerb_onSuccess_1(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    // if (e.detail.fileList.length > 0) {
    //   this.setData({
    //     server_active_3: false
    //   });
    // }

    var _this = this;
    wx.request({
      url: 'https://request.hejianzhiyang.com/Jinguanjia/uploadimg', //获取已上传图片列表
      method: "POST",
      data: {
        uid: e.detail.file.uid,
        status: e.detail.file.status,
        sha1: shall.sha1,
        nbid: nbID,
        khid: khID,
        wd: lat,
        jd: lon,
        // 还要加上具体项目的标签项id
        cid: "32"
      },
      success(res) {
        // do something
      }
    })
  },
  tilerb_onComplete_1(e) {
    wx.hideLoading()
  },
  tilerb_onFail_1(e) {
    // do something
  },
  tilerb_onPreview_1(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  tilerb_onRemove_1(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            tilerb_fileList_1: fileList.filter((n) => n.uid !== file.uid),
          });
          wx.request({
            url: 'https://request.hejianzhiyang.com/Jinguanjia/deelteimg',
            method: 'POST',
            data: {
              status: e.detail.file.status,
              uid: e.detail.file.uid
            },
            success: (res) => {
              // do something
            }
          });
          // 判断当前图片列表是否等于0,要在确定按钮设置下一个tab的禁用状态
          // if (e.detail.fileList.length == 0) {
          //   this.setData({
          //     server_active_3: true
          //   });
          // }
        }
      },
    })
  },


  // 瓦工施工
  // 00
  tilerc_onChange_0(e) {
    const { file } = e.detail
    if (file.status === 'uploading') {
      this.setData({
        progress: 0
      })
      wx.showLoading()
    } else if (file.status === 'done') {
      // do something
    } else if (file.status === 'remove') {
      // console.log("我要告诉后台删除图片");
    }
  },
  tilerc_onSuccess_0(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    // if (e.detail.fileList.length > 0) {
    //   this.setData({
    //     sign_active_1: false
    //   });
    // }

    var _this = this;
    wx.request({
      url: 'https://request.hejianzhiyang.com/Jinguanjia/uploadimg', //获取已上传图片列表
      method: "POST",
      data: {
        uid: e.detail.file.uid,
        status: e.detail.file.status,
        sha1: shall.sha1,
        nbid: nbID,
        khid: khID,
        wd: lat,
        jd: lon,
        // 还要加上具体项目的标签项id
        cid: "41"
      },
      success(res) {
        // do something
      }
    })
  },
  tilerc_onComplete_0(e) {
    wx.hideLoading()
  },
  tilerc_onFail_0(e) {
    // do something
  },
  tilerc_onPreview_0(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  tilerc_onRemove_0(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            tilerc_fileList_0: fileList.filter((n) => n.uid !== file.uid),
          });
          wx.request({
            url: 'https://request.hejianzhiyang.com/Jinguanjia/deelteimg',
            method: 'POST',
            data: {
              status: e.detail.file.status,
              uid: e.detail.file.uid
            },
            success: (res) => {
              // do something
            }
          });
          // 判断当前图片列表是否等于0,要在确定按钮设置下一个tab的禁用状态
          // if (e.detail.fileList.length == 0) {
          //   this.setData({
          //     server_active_4: true
          //   });
          // }
        }
      },
    })
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