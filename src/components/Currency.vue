<template>
  <section data-component="currency-input">
    <md-field>
      <label>{{label}}</label>
      <md-input type="text" v-model="value" @keydown="valueChange($event)" ></md-input>
    </md-field>

  </section>


</template>


<script>
  import Vue from 'vue';
  import { MdField } from 'vue-material/dist/components';
  import 'vue-material/dist/vue-material.min.css';
  import 'vue-material/dist/theme/default.css';
  Vue.use(MdField);
  export default {
    name: 'currencyinput',
    props: ['currencyprops', 'events'],
    components: {

    },
    data(){
      return{
        label: this.currencyprops.label || '',
        value: this.currencyprops.value || '',
        masterEvents: this.events
      }
    },
    watch: {
    },
    mounted: function() {
      const eventsWL = ['blur','change','click','input','keyup','keydown','keypress','hover'];
      const self = this;
      if(this.masterEvents ){
        const keys = Object.keys(this.masterEvents);
        keys.map((e) => {

          if(eventsWL.includes(e)){
            const elem = self.$el.querySelector("[data-component='currency-input'] [type=text]");

            if(elem){
              console.log(self.masterEvents[e]);
              elem.addEventListener(e, self.masterEvents[e]);
            }
          }
        })

      }
    },


    methods: {
      valueChange(value){
        const wl = ['Tab'];
        if(wl.includes(value.code)) return true;
        this.value = this.sanitizeInput(value);
        this.$emit('valueMap', this.value);


      },
      sanitizeInput(value){

        //get only digits
        const element = (value.key === 'Backspace' ? this.value.replace('$','').slice(0,-1) : this.value + value.key)
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
  .md-field{
    margin-bottom: 0;
  }
</style>
