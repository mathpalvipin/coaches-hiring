<template>
<base-card>
<h3> Filter your cach</h3>
<span>
<input type="checkbox" id='frontend' checked @change='setfilter'>
<label for='frontend'> frontend</label>
</span>
<span>
<input type="checkbox" id='backend' checked @change='setfilter'>
<label for='backend'> backend</label>
</span>
<span>
<input type="checkbox" id='career' checked @change='setfilter'>
<label for='career'> career</label>
	</span>
	</base-card>
</template>
<script type="text/javascript">
	export default{
		emits:['change-filter'],
		data(){
			return {
filters:{
frontend:true,
backend:true,
career:true
}}
		},
		methods:{
			setfilter(event){
				const inputId =event.target.id;
				const isactive=event.target.checked;
				const updatefilters={
					...this.filters,
					[inputId]:isactive
				};
				this.filters=updatefilters;
				this.$emit('change-filter' ,updatefilters);
			}
		}
	}
</script>
<style type="text/css" scoped>
	h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>