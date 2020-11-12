<template>
	<li>
		<h3>{{fullname}}</h3>
		<h4>${{rate}}/hour</h4>
		<div>
			<base-badge :type='area' :title='area' v-for='area in areas' :key='area'>{{area}}</base-badge>
		</div>
		<div class="actions">
			<base-button mode='outline' link  :to='coachcontactlink'>Contact</base-button>
			<base-button  link :to='coachdetaillink'>Viewdetail</base-button> 
		</div>
	</li>
</template>
<script type="text/javascript">
	export default {
		props:['id','firstName', 'lastName','rate','areas'],
	
	computed:{
		fullname(){
			return this.firstName+this.lastName;
		},
		coachcontactlink(){
			return '/coaches/'+this.id+'/contact/';
		},
		coachdetaillink(){
			return '/coaches/'+this.id;
		}
	}}
</script>
<style type="text/css">
	li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>