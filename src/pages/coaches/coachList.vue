<template>
	<div>
	<base-dailog :show='!!error' title="error occurred" @close='handleError'>
		<p>{{error}}</p>
	</base-dailog>
	<section>
		<set-filter @change-filter='setfilters'></set-filter>
	</section>
	<section>
		<base-card>
		<div class="controls">
			<base-button mode="outline"  @click='loadcoaches(true)'  >Refresh</base-button>
			<base-button v-if='!isauth'
		link to='/auth?redirect=register'>Login as Mentor</base-button>
		<base-button v-if='!iscoach&&!isloading&&isauth
		'  link to='/register'> Register </base-button>
		</div>
		<div v-if='hascoaches'><h2>List of Mentor</h2>
<ul>
	<div v-if='isloading'>
		<base-spinner></base-spinner>
	</div>
<coach-item v-else v-for='coach in coaches'
:key='coach.id'
:id='coach.id'
:lastName='coach.lastName'
:firstName='coach.firstName'
:rate='coach.hourlyRate'
:areas='coach.areas'></coach-item>
</ul>
</div>
<div  v-else-if='!isloading'><h2> No coache register yet</h2></div>
		</base-card>
	</section>
</div>
</template>
<script type="text/javascript">
	import coachItem from '../../components/coaches/coachItem.vue';
	import setFilter from '../../components/coaches/filter.vue';
	export default {
		data(){
           return {
        isloading:true,
        error:null,
activefilter:{
frontend:true,
backend:true,
career:true
}
           };
		},
		components:{coachItem,
		setFilter
		},
		computed:{isauth(){

return this.$store.getters.isauthenticated;
		},
			iscoach(){
				return this.$store.getters['coaches/iscoach'];
			},
		coaches(){
	let user=this.$store.getters['userId'];
		
		const coaches =this.$store.getters['coaches/getcoaches'];
		return coaches.filter(coach=>{
			if(coach.id==user){
		
				return false;
			}
			if(this.activefilter.frontend&&coach.areas.includes('frontend')){
				return true;
			}

			if(this.activefilter.backend&&coach.areas.includes('backend')){
				return true;
			}
			if(this.activefilter.career&&coach.areas.includes('career')){
				return true;
			}

			return false;
		});
		
		},
		
		hascoaches(){
			
			return this.$store.getters['coaches/hascoaches'];
		}
		}
		,
		created(){
			this.loadcoaches();
		},
		methods:{
			handleError(){
this.error=null;
			},
			async loadcoaches(refresh=false){
				this.isloading=true;
				try{
			await	this.$store.dispatch('coaches/loadcoach',{forceRefresh:refresh});
		}
		catch(error){
			
			this.error=error.messaage||'SOmthin went wrong!';


		}
			this.isloading=false;

			},
			setfilters(updatedfilters){
             this.activefilter=updatedfilters;
			}
		}
	}
</script>
<style type="text/css">
	ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>