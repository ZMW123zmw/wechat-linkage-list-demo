//index.js
//获取应用实例
const app = getApp()
Page({
	data: {
		menuList: [],
		activeTypeLeft: -1,
		activeTypeRight: -1,
		sectionTopArr: [],
		containerTop: 0,
		scrollArr: [],
	},
	onLoad() {
		wx.request({
			url: 'https://www.fastmock.site/mock/c0ebb836c3915714c28c1099f1e61c3a/linkageMenu/api/getList',
			success: res => {
				console.log(res)
				this.setData({
					menuList: res.data.data,
					activeTypeLeft: res.data.data[0].id,
					activeTypeRight: res.data.data[0].id
				})
				// 获取节点信息
				var q = wx.createSelectorQuery();
				// 获取右侧每个子元素与页面顶部的距离
				q.selectAll(".section").boundingClientRect(res => {
					this.data.sectionTopArr = res.map(r => r.top)
				})
				// 获取联动菜单容器距离顶部的距离
				q.select(".container").boundingClientRect(res => {
					this.data.containerTop = res.top
				})
				// 调用获取节点信息
				q.exec();
			}
		})
	},
	changeType(e) {
		this.setData({
			activeTypeLeft: e.currentTarget.dataset.type,
			activeTypeRight: e.currentTarget.dataset.type
		})
	},
	scroll(e) {
		// 将每个子元素与页面顶部的距离减去容器与页面顶部的距离，获取每个子元素距离容器顶部的距离
		var arr = this.data.sectionTopArr.map(r => r - this.data.containerTop)
		// 列表第一个元素的id值
		var t = this.data.menuList[0].id
		for (var i = arr.length - 1; i >= 0; i--) {
			if (arr[i] <= e.detail.scrollTop) {
				t = this.data.menuList[i].id
				break
			}
		}
		if (t !== this.data.activeTypeLeft) {
			this.setData({
				activeTypeLeft: t
			})
		}
	},

})