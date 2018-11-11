// pages/oil/oil.js
Page({

  /**
   * 页面的初始数据
   * active页面加载时从服务器获取,并且每次离开当前页面或者退出小程序的时候要进行active的提交服务器保存
   */
  data: {
    // 储存页面渲染完成要加载的tab
    oil_active_index: 0,

    // 用于设置tab显示与隐藏的数据绑定
    // 服务团队
    // oil_active_0: false,



    // 用于显示列表图片
    // 电工施工
    oil_fileList_0: [],

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
          // 电工施工
          oil_fileList_0: res.data.tag45,
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
  oil_onChange_0(e) {
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
  oil_onSuccess_0(e) {
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
  oil_onFail_0(e) {
    // console.log('onFail', e)
  },
  oil_onComplete_0(e) {
    // console.log('onComplete', e)
    wx.hideLoading()
  },
  oil_onPreview_0(e) {
    // console.log('onPreview', e);
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  oil_onRemove_0(e) {
    // console.log(e);
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            oil_fileList_0: fileList.filter((n) => n.uid !== file.uid),
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