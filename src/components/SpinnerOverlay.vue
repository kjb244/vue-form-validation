<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-progress-spinner :md-diameter="60" :md-stroke="4" md-mode="indeterminate"></md-progress-spinner>
    </md-dialog>
  </div>
</template>


<script>
  import Vue from 'vue';
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
  import VueMaterial from 'vue-material'
  import 'vue-material/dist/vue-material.min.css';
  import 'vue-material/dist/theme/default.css';
  Vue.use(VueMaterial);
  export default {
    name: 'spinnerOverlay',
    props: ['spinnerOverlayProps'],
    components: {

    },
    data(){
      return{
        showDialog: false,

      }
    },
    watch: {
      'spinnerOverlayProps.showDialog': function(newVal, oldVal){
        this.showDialog = newVal;


      }
    },



    methods: {

      ...mapActions([
        'submitForm'
      ]),




    },
    computed:{
      ...mapState([
        'routeData'
      ]),
    },
    created: function(){


    }
  }

</script>


<style scoped="true">

  .md-progress-spinner {
    width: 60px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    margin-bottom: 50px;
  }

</style>
