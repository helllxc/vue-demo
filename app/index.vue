<template>
	<div>
		<tab-bar></tab-bar>
		<search></search>
		<panel></panel>
	</div>
</template>
<script>
	import tabBar from './tabBar.vue';
	import search from './searchBar.vue';
	import panel from './panel.vue'
	export default{
	    components:{
	        'tabBar':tabBar,
			'search':search,
			'panel':panel
		}
	}
</script>