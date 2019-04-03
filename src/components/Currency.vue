<template>
  <md-field>
    <label>{{label}}</label>
    <md-input type="text" v-model="value" @keydown.stop.prevent="valueChange($event)" ></md-input>
  </md-field>

</template>


<script>
  import Vue from 'vue';
  import { MdField } from 'vue-material/dist/components';
  import 'vue-material/dist/vue-material.min.css';
  import 'vue-material/dist/theme/default.css';
  Vue.use(MdField);
  export default {
    name: 'currencyinput',
    props: ['currencyprops', 'testprops'],
    components: {

    },
    data(){
      return{
        label: this.currencyprops.label || '',
        value: this.currencyprops.value || '',
        testprops: this.testprops.events
      }
    },
    watch: {
    },
    mounted: function() {
      this.testprops.events[0]['blur']();
    },


    methods: {
      valueChange(value){
        console.log(this.testprops);
        this.value = this.sanitizeInput(value);
        this.$emit('valueMap', this.value);


      },
      sanitizeInput(value){

        //get only digits
        const element = (value.key === 'Backspace' ? this.value.replace('$','').substr(1) : this.value + value.key)
          .replace(/[^0-9]+/g,'');
        let newElem = element.split('').reverse().map((e,i) => {
          if(i >0 && i %3 === 0){
            return e + ',';
          }
          return e;
        }).reverse().join('');


        return '$' + newElem;

      }

    },
    computed:{

    }
  }

</script>


<style scoped="true">

</style>
