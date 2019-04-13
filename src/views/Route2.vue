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

    <md-button :disabled="!(formData.favSport.length > 0 && formData.favBand.length > 0 && formData.description.length > 0)" class="md-raised md-primary" @click = clickSubmit()>Prev</md-button>

    <md-button :disabled="!(formData.favSport.length > 0 && formData.favBand.length > 0 && formData.description.length > 0)" class="md-raised md-primary">Next</md-button>


  </section>

</template>
<script>
  // @ is an alias to /src
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
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
