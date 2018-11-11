// pages/foreman/foreman.js
Page({

  /**
   * 页面的初始数据
   * active页面加载时从服务器获取,并且每次离开当前页面或者退出小程序的时候要进行active的提交服务器保存
   */
  data: {
    // 用于显示列表图片
    // 排期表
    paiqi_fileList_0: [],
    wenming_fileList_0:[],
    dingzhi_fileList_0:[],
    chengpin_fileList_0:[]
    // 文明施工
    // 定制类主材配饰
    // 成品类主材配饰
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
          paiqi_fileList_0: res.data.tag20,
          wenming_fileList_0: res.data.tag22,
          dingzhi_fileList_0: res.data.tag48,
          chengpin_fileList_0: res.data.tag50,
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

  

  // 排期表
  //00
  paiqi_onChange_0(e) {
    const { file } = e.detail
    if (file.status === 'uploading') {
      this.setData({
        progress: 0
      })
      wx.showLoading()
    } else if (file.status === 'done') {
      // do something
    } else if (file.status === 'remove') {
      console.log("我要告诉后台删除图片");
    }
  },
  paiqi_onSuccess_0(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    // if (e.detail.fileList.length > 0) {
    //   this.setData({
    //     sign_active_5: false
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
        cid: "20"
      },
      success(res) {
        // do something
      }
    })
  },
  paiqi_onComplete_0(e) {
    wx.hideLoading()
  },
  paiqi_onFail_0(e) {
    // do something
  },
  paiqi_onPreview_0(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  paiqi_onRemove_0(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            paiqi_fileList_0: fileList.filter((n) => n.uid !== file.uid),
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

  // 文明施工
  //00
  wenming_onChange_0(e) {
    const { file } = e.detail
    if (file.status === 'uploading') {
      this.setData({
        progress: 0
      })
      wx.showLoading()
    } else if (file.status === 'done') {
      // do something
    } else if (file.status === 'remove') {
      console.log("我要告诉后台删除图片");
    }
  },
  wenming_onSuccess_0(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    // if (e.detail.fileList.length > 0) {
    //   this.setData({
    //     sign_active_5: false
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
        cid: "22"
      },
      success(res) {
        // do something
      }
    })
  },
  wenming_onComplete_0(e) {
    wx.hideLoading()
  },
  wenming_onFail_0(e) {
    // do something
  },
  wenming_onPreview_0(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  wenming_onRemove_0(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            wenming_fileList_0: fileList.filter((n) => n.uid !== file.uid),
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


  // 定制类主材配饰
  //00
  dingzhi_onChange_0(e) {
    const { file } = e.detail
    if (file.status === 'uploading') {
      this.setData({
        progress: 0
      })
      wx.showLoading()
    } else if (file.status === 'done') {
      // do something
    } else if (file.status === 'remove') {
      console.log("我要告诉后台删除图片");
    }
  },
  dingzhi_onSuccess_0(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    // if (e.detail.fileList.length > 0) {
    //   this.setData({
    //     sign_active_5: false
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
        cid: "48"
      },
      success(res) {
        // do something
      }
    })
  },
  dingzhi_onComplete_0(e) {
    wx.hideLoading()
  },
  dingzhi_onFail_0(e) {
    // do something
  },
  dingzhi_onPreview_0(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  dingzhi_onRemove_0(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            dingzhi_fileList_0: fileList.filter((n) => n.uid !== file.uid),
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


  // 成品类主材配饰
  //00
  chengpin_onChange_0(e) {
    const { file } = e.detail
    if (file.status === 'uploading') {
      this.setData({
        progress: 0
      })
      wx.showLoading()
    } else if (file.status === 'done') {
      // do something
    } else if (file.status === 'remove') {
      console.log("我要告诉后台删除图片");
    }
  },
  chengpin_onSuccess_0(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    // if (e.detail.fileList.length > 0) {
    //   this.setData({
    //     sign_active_5: false
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
        cid: "50"
      },
      success(res) {
        // do something
      }
    })
  },
  chengpin_onComplete_0(e) {
    wx.hideLoading()
  },
  chengpin_onFail_0(e) {
    // do something
  },
  chengpin_onPreview_0(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  chengpin_onRemove_0(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            chengpin_fileList_0: fileList.filter((n) => n.uid !== file.uid),
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