import {createStore} from 'vuex';
import coachesmodules from './modules/coaches.js';
import requestsmodules from './modules/request.js';
const store = createStore({
	modules:{
		coaches:coachesmodules,
		requests:requestsmodules
	},
	state(){
		return {
			token:null,
			userId:null,
			tokenExpiration:null
		}
	},
	getters:{
		userId(state){
			return state.userId;
		},
		token(state){
			return state.token;
		},
		isauthenticated(state){
			
			return !!state.token; 
		}
	},
	mutations:{
		signup(state,payload){
			state.token=payload.token;
			state.userId=payload.userId;
			state.tokenExpiration=payload.tokenExpiration

		},
		setuser(state,payload){
state.token=payload.token,
			state.userId=payload.userId,
			state.tokenExpiration=payload.tokenExpiration

		}

	},
	actions:{
	autologin(context){
			const token =localStorage.getItem('token');
			const userId =localStorage.getItem('userId');
				if(token&& userId){

				context.commit('setuser',{
					token:token,
					userId:userId,
					tokenExpiration:null
				});
			}


		},
 logout(context){
	localStorage.removeItem('token');
localStorage.removeItem('userId');
	
	

context.commit('setuser',{
token:null,
userId:null,
tokenExpiration:null});

},
		



		async login(context,payload){

			const res =await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBL8XtfE9KiX-SpcUz6WSx-Io3I8zUaPQ0',
{method:'POST',
body:JSON.stringify({
email:payload.email,
password:payload.password,
returnSecureToken:true
})

				});

			const responseData = await res.json();
			if(!res.ok){
		const error = new Error (responseData['error'].message||'failed to authenicate'); 
	throw error;		}
	localStorage.setItem('token',responseData.idToken);
	localStorage.setItem('userId',responseData.localId);

	
	context.commit('signup',{
		token:responseData.idToken,
		userId:responseData.localId,
		tokenExpiration:responseData.expireIn

	});
	


		},
async signup(context, payload){

const res =await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBL8XtfE9KiX-SpcUz6WSx-Io3I8zUaPQ0',
{method:'POST',
body:JSON.stringify({
email:payload.email,
password:payload.password,
returnSecureToken:true
})

				});
			const responseData = await res.json();
			if(!res.ok){
			const error = new Error (responseData['error'].message||'failed to authenicate'); 
	throw error;		}
	
	context.commit('signup',{
		token:responseData.idToken,
		userId:responseData.localId,
		tokenExpiration:responseData.expireIn

	});




		}
	}
});
export default store;