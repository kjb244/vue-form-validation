<template>
  <section>
    <h3 class="md-display-1">Route 2</h3>

    <div class="form-group">
      <md-field>
        <label>Fav Sport</label>
        <md-input v-model="formData.favSport"></md-input>
      </md-field>
    </div>

    <div class="form-group">
      <md-field>
        <label>Fav Band</label>
        <md-input v-model="formData.favBand"></md-input>
      </md-field>
    </div>

    <div class="form-group">
      <md-field>
        <label>Description</label>
        <md-textarea v-model="formData.description"></md-textarea>
      </md-field>
    </div>

    <buttons :buttonProps="{route: 'route2', formValid: formData.favSport.length && formData.favBand.length, formData: formData}"></buttons>



  </section>

</template>
<script>
  // @ is an alias to /src
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
  import buttons from '../components/Buttons.vue';
  import Vue from 'vue';
  import { MdField, MdButton } from 'vue-material/dist/components';
  import 'vue-material/dist/vue-material.min.css';
  import 'vue-material/dist/theme/default.css';
  import utils from '../utils/Utils';


  Vue.use(MdField);
  Vue.use(MdButton);






  export default {
    name: 'route2',
    components: {
      buttons

    },
    data(){
      return{
        formData: {
          favSport: '',
          favBand: '',
          description: ''
        }

      }
    },

    methods: {
      ...mapActions([
        'submitForm'
      ]),
      clickSubmit(){
        const formData = this.formData;
        const forward = {forward: false};


        this.submitForm({formData, forward});

      }

    },
    created: function(){
      utils.fillInputs(this, 'route2');
    },
    computed: {
      ...mapState([
        'routeData'
      ]),
    },
  }
</script>

<style scoped>

</style>
