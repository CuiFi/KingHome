// pages/supervisor/supervisor.js
Page({

  /**
   * 页面的初始数据
   * active页面加载时从服务器获取,并且每次离开当前页面或者退出小程序的时候要进行active的提交服务器保存
   */
  data: {
    // 储存页面渲染完成要加载的tab
    yinbi_active_index: 0,
    mugong_active_index: 0,
    wagong_active_index:0,
    yougong_active_index: 0,

    sign_active_index: 0,
    drawing_active_index: 0,

    // 用于设置tab显示与隐藏的数据绑定
    // 隐蔽工程
    // yinbi_active_0: false,
    // yinbi_active_1: true,
    // yinbi_active_2: true,
    // yinbi_active_3: true,
    // yinbi_active_4: true,
    // yinbi_active_5: true,
    // yinbi_active_6: true,
    // 木工施工
    // mugong_active_0:false,
    // mugong_active_1: true,
    // mugong_active_2: true,
    // 瓦工施工
    // wagong_active_0:false,
    // wagong_active_1: true,
    // wagong_active_2: true,
    // 油工施工
    // yougong_active_0:false,
    // yougong_active_1: true,
    // yougong_active_2: true,
    // 竣工验收
    // jungong_active_0:false,
    // jungong_active_1: true,
    // jungong_active_2: true,
    // jungong_active_3: true,


    // 用于显示列表图片
    // 隐蔽工程
    yinbi_fileList_0: [],
    yinbi_fileList_1: [
      '/img/no.jpg',
      '/img/no.jpg',
      'http://e.hiphotos.baidu.com/image/pic/item/4b90f603738da9773ded4541bd51f8198718e39e.jpg'
    ],
    yinbi_fileList_2: [
      '/img/no.jpg'
    ],
    yinbi_fileList_3: [
      '/img/no.jpg'
    ],
    yinbi_fileList_4: [
      '/img/no.jpg'
    ],
    yinbi_fileList_5: [],
    yinbi_fileList_6: [],
    // 木工施工
    mugong_fileList_0: [],
    mugong_fileList_1: [
      '/img/no.jpg'
    ],
    mugong_fileList_2: [],
    // 瓦工施工
    wagong_fileList_0: [],
    wagong_fileList_1: [
      '/img/no.jpg'
    ],
    wagong_fileList_2: [],
    // 油工施工
    yougong_fileList_0: [],
    yougong_fileList_1: [
      '/img/no.jpg'
    ],
    yougong_fileList_2: [],
    // 竣工验收
    jungong_fileList_0: [],
    jungong_fileList_1: [],
    jungong_fileList_2: [],
    jungong_fileList_3: [],

  },



  // 隐蔽工程图片预览
  yinbi_previewImage1(e) {
    const { current } = e.currentTarget.dataset
    const { yinbi_fileList_1 } = this.data

    wx.previewImage({
      current,
      urls:yinbi_fileList_1,
    })
  },
  yinbi_previewImage2(e) {
    const { current } = e.currentTarget.dataset
    const { yinbi_fileList_2 } = this.data

    wx.previewImage({
      current,
      urls: yinbi_fileList_2,
    })
  },
  yinbi_previewImage3(e) {
    const { current } = e.currentTarget.dataset
    const { yinbi_fileList_3 } = this.data

    wx.previewImage({
      current,
      urls: yinbi_fileList_3,
    })
  },
  yinbi_previewImage4(e) {
    const { current } = e.currentTarget.dataset
    const { yinbi_fileList_4 } = this.data

    wx.previewImage({
      current,
      urls: yinbi_fileList_4,
    })
  },


  // 木工施工
  mugong_previewImage1(e) {
    const { current } = e.currentTarget.dataset
    const { mugong_fileList_1 } = this.data

    wx.previewImage({
      current,
      urls: mugong_fileList_1,
    })
  },


  // 瓦工施工
  wagong_previewImage1(e) {
    const { current } = e.currentTarget.dataset
    const { wagong_fileList_1 } = this.data

    wx.previewImage({
      current,
      urls: wagong_fileList_1,
    })
  },

  // 油漆施工
  yougong_previewImage1(e) {
    const { current } = e.currentTarget.dataset
    const { yougong_fileList_1 } = this.data

    wx.previewImage({
      current,
      urls: yougong_fileList_1,
    })
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
          // 隐蔽工程
          yinbi_fileList_0: res.data.tag28,
          yinbi_fileList_5: res.data.tag33,
          yinbi_fileList_6: res.data.tag34,
          // 木工施工
          mugong_fileList_0: res.data.tag36,
          mugong_fileList_2: res.data.tag38,
          // 瓦工施工
          wagong_fileList_0: res.data.tag40,
          wagong_fileList_2: res.data.tag42,
          // 油工施工
          yougong_fileList_0: res.data.tag44,
          yougong_fileList_2: res.data.tag46,
          // 竣工验收
          jungong_fileList_0: res.data.tag52,
          jungong_fileList_1: res.data.tag53,
          jungong_fileList_2: res.data.tag54,
          jungong_fileList_3: res.data.tag55,
        });
        // console.log(res.data)
      }
    });
    wx.request({
      url: 'https://request.hejianzhiyang.com/Jinguanjia/getupload_jianliimg',
      method:"POST",
      data:{
        kehuID: options.id,
      },
      success(res) {
        _this.setData({
          // 隐蔽工程
          yinbi_fileList_1: res.data.tag29,
          yinbi_fileList_2: res.data.tag30,
          yinbi_fileList_3: res.data.tag31,
          yinbi_fileList_4: res.data.tag32,
          // 木工施工
          mugong_fileList_1: res.data.tag37,
          // 瓦工施工
          wagong_fileList_1: res.data.tag41,
          // 油工施工
          yougong_fileList_1: res.data.tag45,
        });
        // console.log(res.data)
      }
    })

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

  // 隐蔽工程
  //00
  yinbi_onChange_0(e) {
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
  yinbi_onSuccess_0(e) {
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
        cid: "28"
      },
      success(res) {
        // do something
      }
    })
  },
  yinbi_onFail_0(e) {
    // console.log('onFail', e)
  },
  yinbi_onComplete_0(e) {
    // console.log('onComplete', e)
    wx.hideLoading()
  },
  yinbi_onPreview_0(e) {
    // console.log('onPreview', e);
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  yinbi_onRemove_0(e) {
    // console.log(e);
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            yinbi_fileList_0: fileList.filter((n) => n.uid !== file.uid),
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

  //01
  yinbi_onChange_5(e) {
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
  yinbi_onSuccess_5(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    // if (e.detail.fileList.length > 0) {
    //   this.setData({
    //     server_active_2: false
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
        cid: "33"
      },
      success(res) {
        // do something
      }
    })
  },
  yinbi_onComplete_5(e) {
    wx.hideLoading()
  },
  yinbi_onFail_5(e) {
    // do something
  },
  yinbi_onPreview_5(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  yinbi_onRemove_5(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            yinbi_fileList_5: fileList.filter((n) => n.uid !== file.uid),
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
  yinbi_onChange_6(e) {
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
  yinbi_onSuccess_6(e) {
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
        cid: "34"
      },
      success(res) {
        // do something
      }
    })
  },
  yinbi_onComplete_6(e) {
    wx.hideLoading()
  },
  yinbi_onFail_6(e) {
    // do something
  },
  yinbi_onPreview_6(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  yinbi_onRemove_6(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            yinbi_fileList_6: fileList.filter((n) => n.uid !== file.uid),
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


  // 木工施工
  //00
  mugong_onChange_0(e) {
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
  mugong_onSuccess_0(e) {
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
        cid: "36"
      },
      success(res) {
        // do something
      }
    })
  },
  mugong_onFail_0(e) {
    // console.log('onFail', e)
  },
  mugong_onComplete_0(e) {
    // console.log('onComplete', e)
    wx.hideLoading()
  },
  mugong_onPreview_0(e) {
    // console.log('onPreview', e);
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  mugong_onRemove_0(e) {
    // console.log(e);
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            mugong_fileList_0: fileList.filter((n) => n.uid !== file.uid),
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

  //01
  mugong_onChange_2(e) {
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
  mugong_onSuccess_2(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    // if (e.detail.fileList.length > 0) {
    //   this.setData({
    //     server_active_2: false
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
        cid: "38"
      },
      success(res) {
        // do something
      }
    })
  },
  mugong_onComplete_2(e) {
    wx.hideLoading()
  },
  mugong_onFail_2(e) {
    // do something
  },
  mugong_onPreview_2(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  mugong_onRemove_2(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            mugong_fileList_2: fileList.filter((n) => n.uid !== file.uid),
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

  // 瓦工施工
  //00
  wagong_onChange_0(e) {
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
  wagong_onSuccess_0(e) {
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
        cid: "40"
      },
      success(res) {
        // do something
      }
    })
  },
  wagong_onFail_0(e) {
    // console.log('onFail', e)
  },
  wagong_onComplete_0(e) {
    // console.log('onComplete', e)
    wx.hideLoading()
  },
  wagong_onPreview_0(e) {
    // console.log('onPreview', e);
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  wagong_onRemove_0(e) {
    // console.log(e);
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            wagong_fileList_0: fileList.filter((n) => n.uid !== file.uid),
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

  //01
  wagong_onChange_2(e) {
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
  wagong_onSuccess_2(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    // if (e.detail.fileList.length > 0) {
    //   this.setData({
    //     server_active_2: false
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
        cid: "42"
      },
      success(res) {
        // do something
      }
    })
  },
  wagong_onComplete_2(e) {
    wx.hideLoading()
  },
  wagong_onFail_2(e) {
    // do something
  },
  wagong_onPreview_2(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  wagong_onRemove_2(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            wagong_fileList_2: fileList.filter((n) => n.uid !== file.uid),
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

  // 油漆施工
  //00
  yougong_onChange_0(e) {
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
  yougong_onSuccess_0(e) {
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
        cid: "44"
      },
      success(res) {
        // do something
      }
    })
  },
  yougong_onFail_0(e) {
    // console.log('onFail', e)
  },
  yougong_onComplete_0(e) {
    // console.log('onComplete', e)
    wx.hideLoading()
  },
  yougong_onPreview_0(e) {
    // console.log('onPreview', e);
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  yougong_onRemove_0(e) {
    // console.log(e);
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            yougong_fileList_0: fileList.filter((n) => n.uid !== file.uid),
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

  //01
  yougong_onChange_2(e) {
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
  yougong_onSuccess_2(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    // if (e.detail.fileList.length > 0) {
    //   this.setData({
    //     server_active_2: false
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
        cid: "46"
      },
      success(res) {
        // do something
      }
    })
  },
  yougong_onComplete_2(e) {
    wx.hideLoading()
  },
  yougong_onFail_2(e) {
    // do something
  },
  yougong_onPreview_2(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  yougong_onRemove_2(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            yougong_fileList_2: fileList.filter((n) => n.uid !== file.uid),
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

  // 竣工验收
  //00
  jungong_onChange_0(e) {
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
  jungong_onSuccess_0(e) {
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
        cid: "52"
      },
      success(res) {
        // do something
      }
    })
  },
  jungong_onFail_0(e) {
    // console.log('onFail', e)
  },
  jungong_onComplete_0(e) {
    // console.log('onComplete', e)
    wx.hideLoading()
  },
  jungong_onPreview_0(e) {
    // console.log('onPreview', e);
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  jungong_onRemove_0(e) {
    // console.log(e);
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            jungong_fileList_0: fileList.filter((n) => n.uid !== file.uid),
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

  //01
  jungong_onChange_1(e) {
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
  jungong_onSuccess_1(e) {
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
        cid: "53"
      },
      success(res) {
        // do something
      }
    })
  },
  jungong_onFail_1(e) {
    // console.log('onFail', e)
  },
  jungong_onComplete_1(e) {
    // console.log('onComplete', e)
    wx.hideLoading()
  },
  jungong_onPreview_1(e) {
    // console.log('onPreview', e);
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  jungong_onRemove_1(e) {
    console.log(e);
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            jungong_fileList_1: fileList.filter((n) => n.uid !== file.uid),
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

  //02
  jungong_onChange_2(e) {
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
  jungong_onSuccess_2(e) {
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
        cid: "54"
      },
      success(res) {
        // do something
      }
    })
  },
  jungong_onFail_2(e) {
    // console.log('onFail', e)
  },
  jungong_onComplete_2(e) {
    // console.log('onComplete', e)
    wx.hideLoading()
  },
  jungong_onPreview_2(e) {
    // console.log('onPreview', e);
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  jungong_onRemove_2(e) {
    // console.log(e);
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            jungong_fileList_2: fileList.filter((n) => n.uid !== file.uid),
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

  //03
  jungong_onChange_3(e) {
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
  jungong_onSuccess_3(e) {
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
        cid: "55"
      },
      success(res) {
        // do something
      }
    })
  },
  jungong_onFail_3(e) {
    // console.log('onFail', e)
  },
  jungong_onComplete_3(e) {
    // console.log('onComplete', e)
    wx.hideLoading()
  },
  jungong_onPreview_3(e) {
    // console.log('onPreview', e);
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  jungong_onRemove_3(e) {
    // console.log(e);
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            jungong_fileList_3: fileList.filter((n) => n.uid !== file.uid),
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