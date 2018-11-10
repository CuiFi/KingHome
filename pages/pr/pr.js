// import { $wuxGallery } from '../../wuxdist/index'

Page({
  data: {
    urls: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541843916047&di=7f304778575c0fd6f6e18801f04554aa&imgtype=0&src=http%3A%2F%2Fimg.315che.com%2Fs%2FA201%2F101S%2F6eze%2Ftooc%2FaLU0%2FU0.gif',
      'http://h.hiphotos.baidu.com/image/pic/item/63d0f703918fa0ec37b6b2622b9759ee3d6ddb68.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541843916047&di=7f304778575c0fd6f6e18801f04554aa&imgtype=0&src=http%3A%2F%2Fimg.315che.com%2Fs%2FA201%2F101S%2F6eze%2Ftooc%2FaLU0%2FU0.gif',
      'http://h.hiphotos.baidu.com/image/pic/item/63d0f703918fa0ec37b6b2622b9759ee3d6ddb68.jpg',
    ],
  },

  previewImage(e) {
    const { current } = e.currentTarget.dataset
    const { urls } = this.data

    wx.previewImage({
      current,
      urls,
    })
  },
})
