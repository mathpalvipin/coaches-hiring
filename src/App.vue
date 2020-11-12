<template>
	<theheader></theheader>
	<router-view v-slot='slotProps'>
		<transition name='route' mode='out-in'>
			<component :is='slotProps.Component'>
				
			</component> 
		</transition>

	</router-view>
</template>
<script type="text/javascript">
	import theheader from './components/layout/Theheader.vue';
	export default {
		components:{
			theheader,
		},
		created(){
			this.$store.dispatch('autologin');
		}
	}
</script>
<style type="text/css">
	@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}
.route-enter-from{
opacity: 0;
transform: translateY(-30px;)
}
.route-enter-active{
	transition: all 0.3s ease-out;

}
.route-enter-to{
	opacity: 1;
	transform: translateY(0px); 
}
.route-leave-from{
	opacity: 1;
	transform: translateY(0px);
}
.route-leave-active{
	transition: all 0.3s ease-in;
}
.route-leave-to{
	opacity: 0;
	transform: translateY(30px);
}
</style>