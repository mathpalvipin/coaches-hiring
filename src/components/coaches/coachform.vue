<template>
	<form @submit.prevent='submitform'>
<div class="form-control" :class='{invalid:!firstName.isValid}'>
<label for='firstName'>FirstName</label>
<input type="text" id='firstName' v-model.trim='firstName.val' @blur="	clearvalidity('firstName')">
<p v-if='!firstName.isValid'> firstName is not valid</p>		
</div>
<div class="form-control" :class='{invalid:!lastName.isValid}'>
<label for='lastName'>lastName</label>
<input type="text" id='lastName'  v-model.trim='lastName.val'  @blur="	clearvalidity('lastName')">	
<p v-if='!lastName.isValid'> lastName is not valid</p>		
</div>
<div class="form-control" :class='{invalid:!description.isValid}'>
<label for='description'>Description</label>
<textarea row='5' id='description' v-model.trim='description.val'></textarea><p v-if='!description.isValid'  @blur="	clearvalidity('description')"> Description is invalid</p>
</div>
<div class="form-control"  :class='{invalid:!rate.isValid}' >
<label for='rate'>Hourly Rate</label>
<input type="text" id='rate' v-model.number='rate.val'  @blur="	clearvalidity('rate')">
<p v-if='!rate.isValid'> rate must be greater than 0 and not empty</p>		
</div>
<div class="form-control "  :class='{invalid:!areas.isValid}'>
<h2>Ares of expertise</h2>
<div>
<input type="checkbox" id='frontend' value="frontend" v-model='areas.val'  @blur="	clearvalidity('areas')">
<label for="frontend">frontend</label>
</div>
<div>
<input type="checkbox" id='backend' value="backend" v-model='areas.val'  @blur="	clearvalidity('areas')">
<label for="backend">backend</label>
</div>
<div>
<input type="checkbox" id='career' value="career" v-model='areas.val'  @blur="	clearvalidity('areas')">
<label for="career">career</label>
<p v-if='!areas.isValid'> area is invalid</p>
</div>
</div>
<p v-if='!isValid'>pleaze fix the above error an retry</p>
<base-button>REGISter</base-button>
</form>
</template>
<script type="text/javascript">
	export default {
		emits:['saved-data'],
		data(){
			return{isValid:true,
				firstName:{
					val:'',
					isValid:true},

				lastName:{
					val:'',
					isValid:true},
				description:{
					val:'',
					isValid:true},
				rate:{
					val:null,
					isValid:true},
				areas:{
					val:[],
					isValid:true,

			}
		};
		},
		methods:{
			validation(){
 this.formisvalid=true;
 if(this.firstName.val==''){
this.firstName.isValid=false;
this.isValid=false;
}
if(this.lastName.val==''){
this.lastName.isValid=false;
this.isValid=false;
}
if(this.description.val==''){
this.description.isValid=false;
this.isValid=false;
}if(!this.rate.val||this.rate.val<0){
this.rate.isValid=false;
this.isValid=false;
}
if(this.areas.val.length==0){
this.areas.isValid=false;
this.isValid=false;
}
console.log(this.isValid);
			},
			clearvalidity(input){
				
				
				this[input].isValid=true
			},

			submitform(){
				this.validation();
				if(!this.isValid){
					return ;
				}
				const formdata ={
				first:this.firstName.val,
				last:this.lastName.val,
				rate:this.rate.val,
				des:this.description.val,
				areas:this.areas.val


			}
			console.log(formdata);
			this.$emit('saved-data',formdata);
		}
	}}
</script>
<style type="text/css" scoped>
	.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>