<template>
	<header>
		<nav>
<h1><router-link to='/'>find coach</router-link></h1>
<router-link to='/coaches'>ALL coach</router-link>
<router-link to='/requests'  v-if='isauth'>Show requests</router-link>
<router-link to='/auth' v-if='!isauth'>Login</router-link>
<router-link to='/auth' @click='logout' v-if='isauth'>Logout</router-link>
</nav>
</header>
</template>
<script type="text/javascript">
	export default{
		computed:{
			isauth(){
				return this.$store.getters.isauthenticated;
			}
		},
		methods:{
			logout(){
				this.$store.dispatch('logout');
			}
		}
	}
</script>
<style type="text/css" scoped>
	header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>