import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from './router.js';



Vue.use(Vuex);


export default new Vuex.Store({
  state: {
      routeData: {
          routes: ['route1', 'route2', 'route3'],
          fakeData: 'abc',
          formData: ['route1', 'route2', 'route3'].reduce((accum,e) => {
            accum[e] = {};
            return accum;
          },{}),
          routeMapping: {
              route1: {
                  next: 'route2',
                  prev: null
              },
              route2: {
                  next: 'route3',
                  prev: 'route1'
              },
              route3: {
                  next: null,
                  prev: 'route2'
              }
          },
          visitedRoutes: [],
          showSpinner: false
      }
  },
  getters: {
    countLinks: function(state){
      return state.links.length;
    },
    formData: (state) => (route) => {
        return state.routeData.formData[route] || {};
    }


  },
  mutations: {
    MENU_CLICK: function(state, value){
      router.push(value);
      state.routeData.visitedRoutes.push(value);


    },
    SUBMIT_FORM: function(state, data){
      //simulate ajax
      state.routeData.showSpinner = true;
      setTimeout(()=> {
        const {formData, currRoute, nextRoute} = data;
        //store data
        state.routeData.formData[currRoute] = formData;
        //move to next route
        router.push(nextRoute);
        state.routeData.showSpinner = false;
      },1200);

    },
    TESTING_DELAY: function(state, value){
      const alpha = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(',');
      const alphaStr = [1,2,3].reduce((accum)=>{
        accum += alpha[Math.floor(Math.random()*26)];
        return accum;
      },'');
      setTimeout(() => {
        state.routeData.fakeData = alphaStr;
      },1000);
    }
  },
  actions: {
    menuClick: function(context, value){
        value = value.replace(/\s+/g,'').toLowerCase();
        context.commit('MENU_CLICK',value);

    },
    testingDelay: function(context){
      context.commit('TESTING_DELAY');
    },
    submitForm: function(context, data){
      const {formData, forward} = data;
      const rd = this.state.routeData;
      const currRoute = router.currentRoute.name.toLowerCase();
      let nextRoute;
      if(forward.forward){
        nextRoute = rd.routeMapping[currRoute].next;
      }
      else{
        nextRoute = rd.routeMapping[currRoute].prev;
      }

      context.commit('SUBMIT_FORM', {formData, currRoute, nextRoute});


    },



    testAjaxGet: function(){
        return axios.get('http://jsonplaceholder.typicode.com/posts');

    }
  }

})
