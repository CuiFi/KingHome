Page({
  data: {
    fileList: [],
    phone:''
    // fileList: [{
    //   uid: 0,
    //   status: 'uploading',
    //   url: 'http://pbqg2m54r.bkt.clouddn.com/qrcode.jpg',
    // },
    // {
    //   uid: 1,
    //   status: 'done',
    //   url: 'http://pbqg2m54r.bkt.clouddn.com/qrcode.jpg',
    // },
    // {
    //   uid: 2,
    //   status: 'error',
    //   url: 'http://pbqg2m54r.bkt.clouddn.com/qrcode.jpg',
    // }
    // ],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getSystemInfo({
      success:function(e){
        console.log(e.brand);
        _this.setData({
          phone:e.brand
        })
      }
    });
    
    wx.request({
      url: 'https://request.hejianzhiyang.com/Shouji/cc', //获取已上传图片列表
      method: "GET",
      success(res) {
        _this.setData({
          fileList:res
        });
        // console.log(res.data)
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




  getloc:function(){
    wx.getLocation({
      success: function(res) {
        console.log(res);
        console.log("维度:"+res.latitude);
        console.log("经度:"+res.longitude);
        wx.request({
          url: 'https://request.hejianzhiyang.com/Shouji/dd',
          method:'POST',
          data:{
            wd:res.latitude,
            jd:res.longitude
          }
        });
      },
    })
  },

  getopen:function(){
    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 28
        })
      }
    })
  },


  onChange(e) {
    console.log('onChange', e)
    const { file } = e.detail
    if (file.status === 'uploading') {
      this.setData({
        progress: 0
      })
      wx.showLoading()
    } else if (file.status === 'done') {
      // do something
    } else if (file.status === 'remove'){
      console.log("我要告诉后台删除图片");
      console.log(e.detail.file.uid);
    }
  },
  onSuccess(e) {
    console.log('onSuccess', e);
    console.log(e.detail.file.res.data);
    var _this = this;
    wx.request({
      url: 'https://request.hejianzhiyang.com/Shouji/cc', //获取已上传图片列表
      method: "POST",
      data:{
        uid:e.detail.file.uid,
        status:e.detail.file.status,
        phone:_this.data.phone,
        sha1:e.detail.file.res.data
      },
      success(res) {
        // _this.setData({
        //   fileList: res
        // });
        console.log(res.data.uid)
      }
    })
  },
  onFail(e) {
    console.log('onFail', e)
  },
  onComplete(e) {
    console.log('onComplete', e)
    wx.hideLoading()
  },
  onProgress(e) {
    console.log('onProgress', e)
    this.setData({
      progress: e.detail.file.progress,
    })
  },
  onPreview(e) {
    console.log('onPreview', e);
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  onRemove(e) {
    console.log(e);
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            fileList: fileList.filter((n) => n.uid !== file.uid),
          });
        }
      },
    })
  },
})