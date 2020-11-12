export default {
	namespaced:true,
	state(){
		return {
			lastfetch:null,
		coaches:[
  {
    id: 'c1',
    firstName: 'Maximilian',
    lastName: 'Schwarzmüller',
    areas: ['frontend', 'backend', 'career'],
    description:
      "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
    hourlyRate: 30
  },
  {
    id: 'c2',
    firstName: 'Julie',
    lastName: 'Jones',
    areas: ['frontend', 'career'],
    description:
      'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
    hourlyRate: 30
  }
]
		}
	},
	mutations:{
		addcoach(state,payload){
		state.coaches.push(payload);
	},
	setcoach(state,payload){
		state.coaches=payload;

	},
	setfetchtime(state){
		state.lastfetch= new Date().getTime();
	}
	},
	getters:{shouldUpdate(state){
		const lastfetch=state.lastfetch;

		if(!lastfetch){
			return true;
		}
		const currrentTimeStamp=new Date().getTime();
		return (currrentTimeStamp-lastfetch)/1000>60;
			
	},
		getcoaches(state){
			
			return state.coaches;
		},
		hascoaches(state){
		return state.coaches&& state.coaches.length>0;
		},
		iscoach(state,getters,rootState ,rootGetters){
			const coaches= getters.getcoaches;
			const userId=rootGetters.userId;
			return coaches.some(coach=>coach.id===userId);
		}
	},
	actions:{

		async saved(context,data){
			const coachID =context.rootGetters.userId;
			const coachdata={
				
		firstName:data.first,
		lastName:data.last,
		description:data.des,
		hourlyRate:data.rate,
		areas:data.areas,
			};
			const token = context.rootGetters.token;
			const response = await fetch(`https://vue--finalproject.firebaseio.com/coaches/${coachID}.json?auth=`+token,{
			method:'PUT',
			body:JSON.stringify(coachdata)

			});
			// const respData=await response.json();
			if(!response.ok){
			//..error
			}

			context.commit('addcoach',{
				id:coachID,
				...coachdata,
				
				
				
			});


		},

	
async loadcoach(context,payload){
	console.log(payload.forceRefresh);
	
	if(!payload.forceRefresh&&!context.getters.shouldUpdate){
console.log(context.getters.shouldUpdate);
		return ;
	}
const response=	await fetch(`https://vue--finalproject.firebaseio.com/coaches.json`);
const responseData= await response.json();
if(!response.ok){
const error = new Error (responseData.message|| 'failed to fetch');
  throw error;  }

    const coaches=[];
    for(const key in responseData){
const coach ={
id:key,
firstName:responseData[key].firstName,
		lastName:responseData[key].lastName,
		description:responseData[key].description,
		hourlyRate:responseData[key].hourlyRate,
		areas:responseData[key].areas,
    };
    coaches.push(coach);
	}
	context.commit("setcoach",coaches);
	context.commit('setfetchtime');
}
}
}