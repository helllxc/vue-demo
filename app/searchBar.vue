<template>
	<div class="weui-search-bar" :class="{'weui-search-bar_focusing':isSearch}" id="search_bar">
		<form class="weui-search-bar__form">
			<div class="weui-search-bar__box">
				<i class="weui-icon-search"></i>
				<input type="search" class="weui-search-bar__input"  @focus="search()" id="search_input" placeholder="搜索" v-model="searching" @keyup="changeSearch()"/>
				<a href="javascript:" class="weui-icon-clear" id="search_clear"></a>
			</div>
			<label for="search_input" class="weui-search-bar__label" id="search_text">
				<i class="weui-icon-search"></i>
				<span>搜索</span>
			</label>
		</form>
		<a href="javascript:" class="weui-search-bar__cancel-btn" id="search_cancel" @click="cancle">取消</a>
	</div>
</template>
<script>
	export default{
	    data:function () {
			return{
				isSearch:false,
				searching:''
			}
        },
		methods:{
			search:function () {
				this.isSearch = true
            },
			cancle:function () {
				this.isSearch = false;
            },
            changeSearch:function () {
				this.$store.commit('setSearch',this.searching)
            }
		}
	}
</script>
