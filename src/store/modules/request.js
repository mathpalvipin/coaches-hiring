export default {
	namespaced:true,
	state(){
		return  {
			requests:[]
		}
	},
	mutations:{
		addrequest(state,payload){
			state.requests.push(payload);
		},
	loadrequests(state,payload){
				state.requests=payload;
			
		}
	},
	actions:{
		async loadrequests(context){
	const coachID =context.rootGetters.userId;
const token=context.rootGetters.token;
 const response =await fetch(`https://vue--finalproject.firebaseio.com/requests/${coachID}.json?auth=`+token);

const responseData= await response.json();


if(!response.ok){
const error = new Error (responseData.message|| 'failed to fetch');
  throw error;  }

    const requests=[];
    for(const key in responseData){
    const request={
   id:key,
				coachId:responseData[key].coachId,
				userEmail:responseData[key].userEmail,
				message:responseData[key].message
			};

			requests.push(request);
		}
context.commit('loadrequests',requests);

},
		async contactCoach(context,payload){
			const newrequest ={
				id:new Date().toISOString(),
				coachId:payload.coachId,
				userEmail:payload.email,
				message:payload.message
			};
	
 const response =await fetch(`https://vue--finalproject.firebaseio.com/requests/${payload.coachId}.json`,
{
	method:'POST',
	body:JSON.stringify(newrequest)
});
 if(!response.ok){
const error = new Error( responseData.message||"failes to send request ");
throw error;
 }
 const responseData=await response.json();
 newrequest.id=responseData.name;

			context.commit('addrequest',newrequest);
		}
	},
	getters:{
		getrequests(state,getters,rootState,rootGettters){
			const coachId=rootGettters.userId;

			return state.requests.filter(req=>req.coachId=coachId);
		},
		hasrequest(state,getters){
			return getters.getrequests&&getters.getrequests.length>0
		}
	}
}