import {defineAsyncComponent} from 'vue'; 
import {createRouter, createWebHistory} from 'vue-router';
import coachList from './pages/coaches/coachList.vue';
//import coachDetail from './pages/coaches/coachDetail.vue';
import coachRegister from './pages/coaches/coachRegister.vue';
import contactcoach from './pages/requests/contactCoach.vue';
import notfound from './pages/notfound/notfound.vue';
import  requestReceived from './pages/requests/requestReceived.vue';
import  userAuth from './pages/userAuth.vue';
import store from './store/index.js';

const coachDetail=defineAsyncComponent(()=>import('./pages/coaches/coachDetail.vue')); 


 const router=createRouter({
history:createWebHistory(),
routes:[
{path:'/' , component:coachList},
{path:'/coaches' , component:coachList},
{path:'/coaches/:id',
props:true,//to share id from one page to another and search coache using id 
component:coachDetail,
children:[
{path:'contact',component:contactcoach}, ///coaches/c1/contact
]
},
{path:'/register',component:coachRegister ,meta:{Auth:true}},
{path:'/requests',component:requestReceived,meta:{Auth:true}},
{path:'/Auth',component:userAuth, meta:{unAuth:true}},
{path:'/:notfound(.*)',component:notfound}
]
 });
 router.beforeEach(function(to,from,next){
    console.log(store.getters.isauthenticated);
if(to.meta.Auth&&!store.getters.isauthenticated){
	next('/auth');
}else if(to.meta.unAuth&&store.getters.isAuthenticated){
	next('/coaches');
}else{next();

}

});


export default router;