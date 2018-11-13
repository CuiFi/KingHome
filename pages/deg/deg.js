// pages/deg/deg.js
Page({

  /**
   * 页面的初始数据
   * active页面加载时从服务器获取,并且每次离开当前页面或者退出小程序的时候要进行active的提交服务器保存
   */
  data: {
    // 储存页面渲染完成要加载的tab
    server_active_index:0,
    sign_active_index:0,
    drawing_active_index:0,

    // 用于设置tab显示与隐藏的数据绑定
    // 服务团队
    // server_active_0: false,
    // server_active_1: true,
    // server_active_2: true,
    // server_active_3: true,
    // server_active_4: true,
    // 签约
    // sign_active_0: false,
    // sign_active_1: true,
    // sign_active_2: true,
    // sign_active_3: true,
    // sign_active_4: true,
    // sign_active_5: true,
    // 图纸
    // drawing_active_0: false,
    // drawing_active_1: true,


    // 用于显示列表图片
    // 服务团队
    server_fileList_0: [],
    server_fileList_1: [],
    server_fileList_2: [],
    server_fileList_3: [],
    server_fileList_4: [],
    // 签约
    sign_fileList_0: [],
    sign_fileList_1: [],
    sign_fileList_2: [],
    sign_fileList_3: [],
    sign_fileList_4: [],
    sign_fileList_5: [],
    // 交底
    test_fileList_0:[],
    // 开工仪式
    workRite_fileList_0:[],
  },

  // 切换标签发生的事件
  changeClick:function(e){
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
    console.log(options.id);
    console.log(wx.getStorageSync("id"));
    wx.setStorageSync("kehuID", options.id);
    // console.log("我是上个页面传过来的id:"+ options.id);
    var _this = this;
    wx.request({
      url:"https://request.hejianzhiyang.com/Jinguanjia/loadimg", //获取已上传图片列表
      method: "POST",
      data:{
        kehuID: options.id,
        neibuID: wx.getStorageSync("id")
      },//openid 用于获取对应信息
      success(res) {
        console.log(res);
        _this.setData({
          // 服务团队
          server_fileList_0: res.data.tag2,
          server_fileList_1: res.data.tag3,
          server_fileList_2: res.data.tag4,
          server_fileList_3: res.data.tag5,
          server_fileList_4: res.data.tag6,
          // 签约
          sign_fileList_0: res.data.tag8,
          sign_fileList_1: res.data.tag9,
          sign_fileList_2: res.data.tag10,
          sign_fileList_3: res.data.tag11,
          sign_fileList_4: res.data.tag12,
          sign_fileList_5: res.data.tag13,
          // 图纸
          drawing_fileList_0:res.data.tag15,
          drawing_fileList_1:res.data.tag16,
          // 交底
          test_fileList_0: res.data.tag18,
          // 开工仪式
          workRite_fileList_0: res.data.tag24,
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

  // 服务团队
  //00
  server_onChange_0(e) {
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
  server_onSuccess_0(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    if(e.detail.fileList.length > 0){
      this.setData({
        server_active_1:false
      });
    }

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
        wd:lat,
        jd:lon,
        // 还要加上具体项目的标签项id
        cid: "2"
      },
      success(res) {
        // do something
      }
    })
  },
  server_onFail_0(e) {
    // console.log('onFail', e)
  },
  server_onComplete_0(e) {
    // console.log('onComplete', e)
    wx.hideLoading()
  },
  server_onPreview_0(e) {
    // console.log('onPreview', e);
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  server_onRemove_0(e) {
    // console.log(e);
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            server_fileList_0: fileList.filter((n) => n.uid !== file.uid),
          });
          wx.request({
            url: 'https://request.hejianzhiyang.com/Jinguanjia/deelteimg',
            method:'POST',
            data:{
              status:e.detail.file.status,
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
  server_onChange_1(e) {
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
  server_onSuccess_1(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    if (e.detail.fileList.length > 0) {
      this.setData({
        server_active_2: false
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
        cid: "3"
      },
      success(res) {
        // do something
      }
    })
  },
  server_onComplete_1(e) {
    wx.hideLoading()
  },
  server_onFail_1(e) {
    // do something
  },
  server_onPreview_1(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  server_onRemove_1(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            server_fileList_1: fileList.filter((n) => n.uid !== file.uid),
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
  server_onChange_2(e) {
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
  server_onSuccess_2(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    if (e.detail.fileList.length > 0) {
      this.setData({
        server_active_3: false
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
        cid: "4"
      },
      success(res) {
        // do something
      }
    })
  },
  server_onComplete_2(e) {
    wx.hideLoading()
  },
  server_onFail_2(e) {
    // do something
  },
  server_onPreview_2(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  server_onRemove_2(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            server_fileList_2: fileList.filter((n) => n.uid !== file.uid),
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

  //03
  server_onChange_3(e) {
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
  server_onSuccess_3(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    if (e.detail.fileList.length > 0) {
      this.setData({
        server_active_4: false
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
        cid: "5"
      },
      success(res) {
        // do something
      }
    })
  },
  server_onComplete_3(e) {
    wx.hideLoading()
  },
  server_onFail_3(e) {
    // do something
  },
  server_onPreview_3(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  server_onRemove_3(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            server_fileList_3: fileList.filter((n) => n.uid !== file.uid),
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

  //04
  server_onChange_4(e) {
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
  server_onSuccess_4(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    // if (e.detail.fileList.length > 0) {
    //   this.setData({
    //     server_active_4: false
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
        cid: "6"
      },
      success(res) {
        // do something
      }
    })
  },
  server_onComplete_4(e) {
    wx.hideLoading()
  },
  server_onFail_4(e) {
    // do something
  },
  server_onPreview_4(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  server_onRemove_4(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            server_fileList_4: fileList.filter((n) => n.uid !== file.uid),
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
          //     server_active_5: true
          //   });
          // }
        }
      },
    })
  },


  // 签约
  //00
  sign_onChange_0(e) {
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
  sign_onSuccess_0(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    if (e.detail.fileList.length > 0) {
      this.setData({
        sign_active_1: false
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
        cid: "8"
      },
      success(res) {
        // do something
      }
    })
  },
  sign_onComplete_0(e) {
    wx.hideLoading()
  },
  sign_onFail_0(e) {
    // do something
  },
  sign_onPreview_0(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  sign_onRemove_0(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            sign_fileList_0: fileList.filter((n) => n.uid !== file.uid),
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

  //01
  sign_onChange_1(e) {
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
  sign_onSuccess_1(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    if (e.detail.fileList.length > 0) {
      this.setData({
        sign_active_2: false
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
        cid: "9"
      },
      success(res) {
        // do something
      }
    })
  },
  sign_onComplete_1(e) {
    wx.hideLoading()
  },
  sign_onFail_1(e) {
    // do something
  },
  sign_onPreview_1(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  sign_onRemove_1(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            sign_fileList_1: fileList.filter((n) => n.uid !== file.uid),
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

  //02
  sign_onChange_2(e) {
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
  sign_onSuccess_2(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    if (e.detail.fileList.length > 0) {
      this.setData({
        sign_active_3: false
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
        cid: "10"
      },
      success(res) {
        // do something
      }
    })
  },
  sign_onComplete_2(e) {
    wx.hideLoading()
  },
  sign_onFail_2(e) {
    // do something
  },
  sign_onPreview_2(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  sign_onRemove_2(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            sign_fileList_2: fileList.filter((n) => n.uid !== file.uid),
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

  //03
  sign_onChange_3(e) {
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
  sign_onSuccess_3(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    if (e.detail.fileList.length > 0) {
      this.setData({
        sign_active_4: false
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
        cid: "11"
      },
      success(res) {
        // do something
      }
    })
  },
  sign_onComplete_3(e) {
    wx.hideLoading()
  },
  sign_onFail_3(e) {
    // do something
  },
  sign_onPreview_3(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  sign_onRemove_3(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            sign_fileList_3: fileList.filter((n) => n.uid !== file.uid),
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

  //04
  sign_onChange_4(e) {
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
  sign_onSuccess_4(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    if (e.detail.fileList.length > 0) {
      this.setData({
        sign_active_5: false
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
        cid: "12"
      },
      success(res) {
        // do something
      }
    })
  },
  sign_onComplete_4(e) {
    wx.hideLoading()
  },
  sign_onFail_4(e) {
    // do something
  },
  sign_onPreview_4(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  sign_onRemove_4(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            sign_fileList_4: fileList.filter((n) => n.uid !== file.uid),
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

  //05
  sign_onChange_5(e) {
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
  sign_onSuccess_5(e) {
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
        cid: "13"
      },
      success(res) {
        // do something
      }
    })
  },
  sign_onComplete_5(e) {
    wx.hideLoading()
  },
  sign_onFail_5(e) {
    // do something
  },
  sign_onPreview_5(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  sign_onRemove_5(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            sign_fileList_5: fileList.filter((n) => n.uid !== file.uid),
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


  // 图纸
  //00
  drawing_onChange_0(e) {
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
  drawing_onSuccess_0(e) {
    let nbID = wx.getStorageSync("id");
    let khID = wx.getStorageSync("kehuID");
    let lat = wx.getStorageSync("latitude");
    let lon = wx.getStorageSync("longitude");
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    if (e.detail.fileList.length > 0) {
      this.setData({
        drawing_active_1: false
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
        cid: "15"
      },
      success(res) {
        // do something
      }
    })
  },
  drawing_onComplete_0(e) {
    wx.hideLoading()
  },
  drawing_onFail_0(e) {
    // do something
  },
  drawing_onPreview_0(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  drawing_onRemove_0(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            drawing_fileList_0: fileList.filter((n) => n.uid !== file.uid),
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

  //01
  drawing_onChange_1(e) {
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
  drawing_onSuccess_1(e) {
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
        cid: "16"
      },
      success(res) {
        // do something
      }
    })
  },
  drawing_onComplete_1(e) {
    wx.hideLoading()
  },
  drawing_onFail_1(e) {
    // do something
  },
  drawing_onPreview_1(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  drawing_onRemove_1(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            drawing_fileList_1: fileList.filter((n) => n.uid !== file.uid),
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

  // 交底
  //00
  test_onChange_0(e) {
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
  test_onSuccess_0(e) {
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
        cid: "18"
      },
      success(res) {
        // do something
      }
    })
  },
  test_onComplete_0(e) {
    wx.hideLoading()
  },
  test_onFail_0(e) {
    // do something
  },
  test_onPreview_0(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  test_onRemove_0(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            test_fileList_0: fileList.filter((n) => n.uid !== file.uid),
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

  // 开工仪式
  //00
  workRite_onChange_0(e) {
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
  workRite_onSuccess_0(e) {
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
        cid: "24"
      },
      success(res) {
        // do something
      }
    })
  },
  workRite_onComplete_0(e) {
    wx.hideLoading()
  },
  workRite_onFail_0(e) {
    // do something
  },
  workRite_onPreview_0(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  workRite_onRemove_0(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            workRite_fileList_0: fileList.filter((n) => n.uid !== file.uid),
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