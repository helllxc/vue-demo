<template>
	<div>
		<article class="weui-article">
			<h1>{{news.title}}</h1>
			<section>
				<section>
					<p>
						{{news.summary}}
					</p>
					<p>
						<img :src="img" @click="gallery(news.images.large)" alt="">
						<!--&lt;!&ndash;&lt;!&ndash;<img src="images/1.jpg" @click="gallery('images/1.jpg')" alt="">&ndash;&gt;&ndash;&gt;-->
					</p>
				</section>
			</section>
		</article>
		<!--<div ng-bind-html="html"></div>-->
		<div class="weui-gallery" :isGallery ="isGallery">
			<span class="weui-gallery__img" :style="{background: 'url('+imgUrl+')'}"></span>
			<div class="weui-gallery__opr">
				<a href="javascript:" class="weui-gallery__del" @click="isGallery=false">
					<i class="weui-icon-delete weui-icon_gallery-delete"></i>
				</a>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
	    data:function () {
			return {
			    news:{},
                apikey:"0b2bdeda43b5688921839c8ecb20399b",
                city:"广州",
			    id:'',
                isGallery:false,
			    imgUrl:'',
				img:''
			}
        },
		methods:{
            gallery:function (Url) {
				this.imgUrl = Url
//				console.log(this.imgUrl)
            }
		},
        mounted:function () {
            this.id = this.$route.params.id;
            this.$http.jsonp('http://api.douban.com/v2/movie/subject/'+this.id,{
                params:{
					apikey:this.apikey,
					city:this.city
				}
            }).then(function(data){
                this.news = data.data;
                console.log(this.news)
				this.img = this.news.images.large
			})
        }
	}
</script>