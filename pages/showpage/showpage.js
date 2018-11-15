// pages/showpage/showpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urls: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541843916047&di=7f304778575c0fd6f6e18801f04554aa&imgtype=0&src=http%3A%2F%2Fimg.315che.com%2Fs%2FA201%2F101S%2F6eze%2Ftooc%2FaLU0%2FU0.gif',
      'http://h.hiphotos.baidu.com/image/pic/item/63d0f703918fa0ec37b6b2622b9759ee3d6ddb68.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541843916047&di=7f304778575c0fd6f6e18801f04554aa&imgtype=0&src=http%3A%2F%2Fimg.315che.com%2Fs%2FA201%2F101S%2F6eze%2Ftooc%2FaLU0%2FU0.gif',
      'http://h.hiphotos.baidu.com/image/pic/item/63d0f703918fa0ec37b6b2622b9759ee3d6ddb68.jpg',
    ],
    cont:'',
    fwteam:'',
    imgArray:'',
    nameText:''
  },


  previewImage(e) {
    const { current } = e.currentTarget.dataset
    const { imgArray } = this.data
    console.log(current);

    wx.previewImage({
      current,
      urls: imgArray.url,
    })
  },


  gosecond:function(){
    wx.navigateTo({
      url: '/pages/people/people',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    console.log(options.id);
    let khid = wx.getStorageSync("id");
    // options.id = 3;
    let kehuidid = options.id ? options.id : khid;
    console.log(kehuidid);
    // console.log("展示页面所用id:"+options.id);
    // var id = wx.getStorageSync('id') || []
    // console.log(typeof ("hello:" + id));
    // 根据id获取当前身份具体人的案例列表信息
    // wx.request({
    //   url: 'https://request.hejianzhiyang.com/Shouji/cc?id=' + options.id,
    //   method: "GET",
    //   data: {},//openid 用于获取对应信息
    //   success: function (res) {
    //     console.log(res);
    //     _this.setData({
    //       // cont: res.data
    //     });
    //   }
    // });
    wx.request({
      url: 'https://request.hejianzhiyang.com/Jinguanjia/getcontent',
      method:"POST",
      data:{
        kehuID: kehuidid,
      },
      success:function(res){
        console.log(res);
        _this.setData({
          cont:res.data
        });
      }
    });
    wx.request({
      url: 'https://request.hejianzhiyang.com/Jinguanjia/getcontents',
      method: "POST",
      data: {
        kehuID: kehuidid,
      },
      success: function (res) {
        console.log(res);
        _this.setData({
          fwteam: res.data
        });
      }
    });
    wx.request({
      url: 'https://request.hejianzhiyang.com/Jinguanjia/getcontent_img',
      method: "POST",
      data: {
        kehuID: kehuidid,
      },
      success: function (res) {
        console.log(res);
        _this.setData({
          imgArray: res.data
        });
      }
    });
    wx.request({
      url: 'https://request.hejianzhiyang.com/Jinguanjia/getcontent_header',
      method: "POST",
      data: {
        kehuID: kehuidid,
      },
      success: function (res) {
        console.log(res);
        _this.setData({
          nameText: res.data
        });
      }
    });
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