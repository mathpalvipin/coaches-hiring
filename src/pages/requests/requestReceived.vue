<template>
	<div>
	<section>
		
		<base-card>
			<header>
				<h2 >Request Received</h2>
				
			</header>
			<ul >
				<request-item  :key='request.id'  v-for='request in getrequests'

				:email='request.userEmail'
				:message='request.message'></request-item>
			</ul>
			<h3 v-if='!hasrequest' >you havn;t receved any request yet</h3>
		</base-card>
	</section>
</div>
</template>
<script >
	import requestItem from '../../components/requests/requests.vue'
	export default {
		components:{
			requestItem
		},
		created(){
		this.$store.dispatch('requests/loadrequests');
		},
		computed:{
			getrequests ()
			{console.log(this.$store.getters['requests/getrequests']);
				return this.$store.getters['requests/getrequests'];
			},
			hasrequest(){
				return this.$store.getters['requests/hasrequest'];
			} 
		}
	}
</script>
<style type="text/css" scoped>
	header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>