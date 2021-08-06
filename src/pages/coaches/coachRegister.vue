<template>
	<div>
	<section>
		<base-card>
	<h2>Register as a Mentor now!</h2>
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
	
		let user =this.$store.getters['userId'];
	
this.$store.dispatch('coaches/saved',data).then(()=> {
	this.$router.replace('/coaches/'+user);
});


			}
		}
	}
</script>
