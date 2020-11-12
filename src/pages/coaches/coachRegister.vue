<template>
	<div>
	<section>
		<base-card>
	<h2>regidter as a coach now!</h2>
	<coach-form @saved-data='saved'></coach-form>
</base-card>
</section>
</div>
</template>
<script type="text/javascript">
	import coachForm from '../../components/coaches/coachform.vue';
	export default{
		components:{
		coachForm
		},
		methods:{
		saved(data){
				console.log('formre');
this.$store.dispatch('coaches/saved',data).then(()=> {
	this.$router.replace('/coaches/c3');
});


			}
		}
	}
</script>
