// pages/advice/advice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text_value:'',
    phone_value:'',
    adv_fileList_0: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let onlyID = Math.random().toString(36).substr(2);
    wx.setStorageSync("onlyID", "vip--"+onlyID)
  },

  //00
  adv_onChange_0(e) {
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
  adv_onSuccess_0(e) {
    let khID = wx.getStorageSync("id");
    let onlyid = wx.getStorageSync("onlyID");
    // console.log(khID);
    let shall = JSON.parse(e.detail.file.res.data);
    // 判断当前上传图片列表中是否有图片
    // if (e.detail.fileList.length > 0) {
    //   this.setData({
    //     server_active_1: false
    //   });
    // }

    var _this = this;
    wx.request({
      url: 'https://request.hejianzhiyang.com/Jinguanjia/uploadimg_advice',
      method: "POST",
      data: {
        uid: e.detail.file.uid,
        status: e.detail.file.status,
        sha1: shall.sha1,
        khid: khID,
        onlyid: onlyid
      },
      success(res) {
        // do something
      }
    })
  },
  adv_onFail_0(e) {
    // console.log('onFail', e)
  },
  adv_onComplete_0(e) {
    // console.log('onComplete', e)
    wx.hideLoading()
  },
  adv_onPreview_0(e) {
    // console.log('onPreview', e);
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  adv_onRemove_0(e) {
    // console.log(e);
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            adv_fileList_0: fileList.filter((n) => n.uid !== file.uid),
          });
          wx.request({
            url: 'https://request.hejianzhiyang.com/Jinguanjia/deelteimg_advice',
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


  formSubmit: function (e) {
    var _this = this;
    let khID = wx.getStorageSync("id");
    let onlyid = wx.getStorageSync("onlyID");
    var formData = e.detail.value;
    var only = {"onlyid": onlyid};
    var khonly = { "khid":khID};
    var all = Object.assign(formData, only, khonly);
    // console.log(all);
    if (all.advice_content) {
      // console.log(formData.q1);
      console.log(formData);
      wx.request({
        url: 'https://request.hejianzhiyang.com/Jinguanjia/add_advice',
        method: "POST",
        data: all,
        success: function (res) {
          wx.showModal({
            // title: '警告',
            content: '感谢您的反馈',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                _this.setData({
                  phone_value:'',
                  text_value:'',
                  adv_fileList_0:[]
                });
                let sonlyID = Math.random().toString(36).substr(2);
                wx.setStorageSync("onlyID", "vip--" + sonlyID)
              }
            }
          })
        }
      });
    } else {
      wx.showModal({
        title: '警告',
        content: '请填写您的意见',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

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