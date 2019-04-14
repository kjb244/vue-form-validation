<template>
  <section>
    <h3 class="md-display-1">Route 3</h3>

    <div class="form-group">
      <md-field>
        <label>Website</label>
        <md-input v-model="formData.website"></md-input>
      </md-field>
    </div>

    <div class="form-group">
      <md-field>
        <label>Email</label>
        <md-input v-model="formData.email"></md-input>
      </md-field>
    </div>

    <div class="form-group">
      <md-field>
        <label>Description</label>
        <md-textarea v-model="formData.description"></md-textarea>
      </md-field>
    </div>

    <buttons :buttonProps="{route: 'route3', formValid: formData.website.length && formData.email.length, formData: formData}"></buttons>





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
  import utils from '../utils/Utils.js';
  Vue.use(MdField);
  Vue.use(MdButton);






  export default {
    name: 'route3',
    components: {
      buttons

    },
    data(){
      return{
        formData: {
          website: '',
          email: '',
          description: ''
        }

      }
    },

    methods: {

    },
    created: function(){
      utils.fillInputs(this, 'route3');
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
