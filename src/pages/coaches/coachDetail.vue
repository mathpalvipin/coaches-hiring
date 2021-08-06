<template>
	<div>
<section>
	<base-card>
		<h2>{{fullname}}</h2>
		<h3>${{rate}}/hour</h3>

	</base-card>
	<base-card>
	<router-view></router-view>
</base-card>
</section>
<section>
	<base-card>
		<base-button link :to='contactlink' >Contact ME</base-button>
	</base-card>
</section>
<section>
	<base-card>
		<base-badge v-for='area  in areas' :key='area' :type='area' :title='area'></base-badge>
		<p>{{description}}</p>
	</base-card>
</section>
</div>
</template>
<script type="text/javascript">

	export default{
		props:['id'],
		data(){
			return {
				selectcoach:null
			};
		},
		created(){
			
      this.selectcoach=this.$store.getters['coaches/getcoaches'].find(coach =>coach.id===this.id);
     

    },
		computed:{
			description(){
				return this.selectcoach.description;
			},
			contactlink(){
				return '/coaches/'+this.selectcoach.id+'/contact';
			},
			areas(){
				return this.selectcoach.areas;
			},
			fullname(){
				return this.selectcoach.firstName +" "+this.selectcoach.lastName;

			},rate(){
				return this.selectcoach.hourlyRate;
			}
		}
	}
</script>