<template>
	<div>a:{{id}}</div>
</template>
<style>
	div{
		color:red
	}
</style>
<script>
	export default{
	    data:function () {
			return{
			    id:''
			}
        },
	    mounted:function () {
			this.id = this.$route.params.id
        }
	}
</script>