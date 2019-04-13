<template>
  <section>
    <h3 class="md-display-1">Route 1 (Validations)</h3>

    <div class="form-group">
      <md-field>
        <label>First Name</label>
        <md-input v-model="$v.firstName.$model" @blur="firstNameBlur()"></md-input>
      </md-field>

      <div class="error" v-if="firstNameBlurred && !$v.firstName.required">Field is required</div>
      <div class="error" v-if="firstNameBlurred && !$v.firstName.minLength">Name must have at least {{$v.firstName.$params.minLength.min}} letters.</div>
      <div class="error" v-if="firstNameBlurred && !$v.firstName.lettersOnly">Name must be letters only.</div>
    </div>




    <div class="form-group">
      <md-field>
        <label>Last Name</label>
        <md-input  v-model="$v.lastName.$model" @blur="lastNameBlur()"></md-input>
      </md-field>

      <div class="error" v-if="lastNameBlurred && !$v.lastName.required">Field is required</div>
      <div class="error" v-if="lastNameBlurred && !$v.lastName.minLength">Name must have at least {{$v.lastName.$params.minLength.min}} letters.</div>
      <div class="error" v-if="lastNameBlurred && !$v.lastName.lettersOnly">Name must be letters only.</div>
    </div>


    <div class="form-group">
      <currencyinput
        v-model="$v.purchasePrice.$model"
        :currencyprops="{label: 'Purchase Price', value: $v.purchasePrice.$model}"
        :events="{blur: purchasePriceBlur}"
        v-on:valueMap="$v.purchasePrice.$model = $event">
      </currencyinput>


      <div class="error" v-if="purchasePriceBlurred && !$v.purchasePrice.required">Field is required</div>



    </div>

    <div class="form-group">
      <currencyinput
        v-model="$v.downPayment.$model"
        :currencyprops="{label: 'Down Payment', value: $v.downPayment.$model}"
        :events="{blur: downPaymentBlur}"
        v-on:valueMap="$v.downPayment.$model = $event">
      </currencyinput>

      <div class="error" v-if="downPaymentBlurred && !$v.downPayment.required">Field is required</div>
      <div class="error" v-if="downPaymentBlurred && !$v.downPayment.downPaymentValidation">Loan amount must be between $60,000 and $2,000,000</div>
    </div>

    <md-button :disabled="$v.$invalid" class="md-raised md-primary" @click="clickSubmit(!$v.$invalid)">Next</md-button>


  </section>
</template>
<script>
  // @ is an alias to /src
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
  import Vue from 'vue';
  import currencyinput from '../components/Currency.vue';
  import { MdField, MdButton } from 'vue-material/dist/components';
  import 'vue-material/dist/vue-material.min.css';
  import 'vue-material/dist/theme/default.css';

  import Vuelidate from 'vuelidate'
  import { required, minLength, between } from 'vuelidate/lib/validators'
  import utils from '../utils/Utils';

  Vue.use(Vuelidate);
  Vue.use(MdField);
  Vue.use(MdButton);

  const { lettersOnly } = utils;

  const downPaymentValidation =(value, vm) => {
    if (value === '') return true;
    const pp = vm.purchasePrice.replace(/[^0-9]+/g,'') || '0';
    const dp = vm.downPayment.replace(/[^0-9]+/g,'') || '0';
    if (pp - dp < 60000 || pp - dp > 2000000){
      return false;
    }
    return true;
  };



  export default {
    name: 'route1',
    components: {
      currencyinput
    },
    data(){
      return{
        firstName: '',
        firstNameBlurred: false,
        lastName: '',
        lastNameBlurred: false,
        purchasePrice: '',
        purchasePriceBlurred: false,
        downPayment: '',
        downPaymentBlurred: false,
      }
    },
    validations: {
      firstName: {
        required,
        minLength: minLength(3),
        lettersOnly
      },
      lastName: {
        required,
        minLength: minLength(4),
        lettersOnly
      },
      purchasePrice:{
        required

      },
      downPayment: {
        required,
        downPaymentValidation
      }

    },
    created: function(){
      utils.fillInputs(this,'route1');
    },
    methods: {
      ...mapActions([
        'submitForm'
      ]),
      clickSubmit(valid) {

        if(valid){

          const formData = {
            firstName: this.firstName,
            lastName: this.lastName,
            purchasePrice: this.purchasePrice,
            downPayment: this.downPayment
          };
          const forward= { forward: true};
          this.submitForm({formData, forward});
        }
      },

      firstNameBlur() {
        this.firstNameBlurred = true;
        this.$v.firstName.$touch();
      },
      lastNameBlur() {
        this.lastNameBlurred = true;
        this.$v.lastName.$touch();
      },
      purchasePriceBlur() {
        this.purchasePriceBlurred = true;
        this.$v.purchasePrice.$touch();
      },
      downPaymentBlur() {
        this.downPaymentBlurred = true;
        this.$v.downPayment.$touch();
      }
    },
    computed: {
      ...mapState([
        'routeData'
      ]),
    },
  }
</script>

<style scoped>
  .form-group{
    margin-bottom: 6px;
    margin-top: 16px;
  }

  .md-field, [data-component="currency-input"]{
    margin-bottom: 4px;
  }

  .md-button{
    margin-top: 20px;
    margin-left: 0;
  }

  h3{
    text-align: center;
  }

  .error{
    color: #f57f6c;
  }
</style>
