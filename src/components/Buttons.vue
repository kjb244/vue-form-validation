<template>
  <section data-component="buttons">
    <div v-show="showPrev">
      <md-button  class="md-raised md-primary" @click="clickSubmit(true,false)">Prev</md-button>

    </div>
    <div v-show="showNext">
      <md-button :disabled="!buttonProps.formValid"  class="md-raised md-primary" @click="clickSubmit(true,true)">Next</md-button>

    </div>

  </section>


</template>


<script>
  import Vue from 'vue';
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
  import { MdField } from 'vue-material/dist/components';
  import 'vue-material/dist/vue-material.min.css';
  import 'vue-material/dist/theme/default.css';
  Vue.use(MdField);
  export default {
    name: 'buttons',
    props: ['buttonProps'],
    components: {
    },
    data(){
      return{
        buttonsProps: this.buttonProps,
        showPrev: false,
        showNext: false,
        showSpinner:false
      }
    },



    methods: {

      ...mapActions([
        'submitForm'
      ]),

      clickSubmit(valid, type) {

        if(valid){
          this.showSpinner = true;
          const formData = this.buttonProps.formData;
          const forward= { forward: type};
          this.submitForm({formData, forward});
        }
      }


    },
    computed:{
      ...mapState([
        'routeData'
      ]),
    },
    created: function(){
      const route = this.buttonsProps.route;
      if (route){
        this.showPrev = this.routeData.routeMapping[route].prev !== null;
        this.showNext = this.routeData.routeMapping[route].next !== null;
      }


    }
  }

</script>


<style scoped="true">
  .md-field{
    margin-bottom: 0;
  }

  [data-component="buttons"]{
    display: flex;
  }


</style>
