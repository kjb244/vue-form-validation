<template>
  <div class="page-container" id="app">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">

    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">My Title</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Navigation</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="menuVisible = !menuVisible">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>
        <md-list>
          <md-list-item v-for="rec in menuLinks"
                        v-bind:data="rec"
                        v-bind:key="rec.route">
            <md-icon>{{rec.icon}}</md-icon>
            <a class="md-list-item-text" @click="menuClick(rec.route); menuVisible=false; testingDelay()">{{rec.route}}</a>
          </md-list-item>

        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>




<script>
  import Vue from 'vue';
  import VueMaterial from 'vue-material'
  import 'vue-material/dist/vue-material.min.css';
  import 'vue-material/dist/theme/default.css';
  Vue.use(VueMaterial);

  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';


  export default {
  name: 'App',
  data(){
    return{
      menuVisible: false,
      menuLinks: [
        {
          icon: 'move_to_inbox',
          route: 'Route 1'
        },
        {
          icon: 'send',
          route: 'Route 2'
        },
        {
          icon: 'delete',
          route: 'Route 3'
        },
        {
          icon: 'error',
          route: 'Route 4'
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'routeData'
    ]),
  },
  methods: {
    ...mapActions([
      'menuClick', 'testingDelay'
    ]),
  }
}
</script>

<style scoped>

  #app{
    margin: 20px;
  }

  a{
    cursor: pointer;
  }


</style>
