<template>
	<div>
		<div class="weui-panel weui-panel_access">
			<div class="weui-panel__hd">图文组合列表</div>
			<div class="weui-panel__bd">
				<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg" v-for="movice in movices|filterBy searching in 'title'">
					<div class="weui-media-box__hd">
						<img class="weui-media-box__thumb" :src="movice.images.medium" alt="">
					</div>
					<div class="weui-media-box__bd">
						<h4 class="weui-media-box__title">{{movice.title}}</h4>
						<p class="weui-media-box__desc">上映日期:{{movice.mainland_pubdate}}</p>
					</div>
				</a>
				<div class="weui-panel__ft">
					<a href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link">
						<div class="weui-cell__bd" @click="loadMore()">查看更多</div>
						<span class="weui-cell__ft"></span>
					</a>
				</div>
			</div>
		</div>
		<div class="weui-loadmore" v-if="load">
			<i class="weui-loading"></i>
			<span class="weui-loadmore__tips">正在加载</span>
		</div>
		<div id="loadingToast" v-show="toast">
			<div class="weui-mask_transparent"></div>
			<div class="weui-toast">
				<i class="weui-loading weui-icon_toast"></i>
				<p class="weui-toast__content">数据加载中</p>
			</div>
		</div>
	</div>
</template>
<script>
    export default{
        data:function () {
            return{
                apikey:"0b2bdeda43b5688921839c8ecb20399b",
                city:"广州",
                start:0,
                count:5,
				movices:[],
				toast:true,
				load:''
            }
        },
        methods:{
            loadMore:function () {
                this.load = true;
                this.$http.jsonp('https://api.douban.com/v2/movie/in_theaters',{
                    params:{
                        apikey:this.apikey,
                        city:this.city,
                        start:this.start++,
                        count:this.count
                    }
                }).then(function (data) {
                    this.movices = this.movices.concat(data.data.subjects);
                    this.toast = false;
                    this.load = false;
					console.log(data.data)
                })
            }
        },
        mounted:function () {
            this.loadMore();
        },
		computed:{
            searching(){
                return this.$store.state.search
			}
		}
    }
</script>
