<template>
  <v-app>

  <v-sheet
      > 
        <v-navigation-drawer v-model="drawer"
              temporary
              absolute
              :width=150
              left
              app
          >
            <v-list
              nav
              dense
            >
              <v-list-item-group>
                <v-list-item v-for="(item, index) in items"
                  :key="index"
                  :to="{ path: item.path }"
                >
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title >{{ item.name }}</v-list-item-title>
                </v-list-item>
          </v-list-item-group>
        </v-list> 
      </v-navigation-drawer> 
 
    <v-card class="overflow-hidden">
      <v-toolbar
        dark
        color="indigo"
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title><p class="logo"><a :to="{ path: '/' }">Feijones</a></p></v-toolbar-title>   

        <template> 
        
          <v-tabs
            class="hidden-sm-and-down"
            v-model="tab"
            align-with-title
            
          >
          <v-tab
              v-for="(item, index) in items"
              :key="index"
              :to="{ path: item.path}"
            >
              {{ item.name }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
    </v-card>
    
    
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-sheet>

    <v-bottom-navigation
        background-color="indigo"
        app
        grow
        shift
        height="50"
        dark
        class="hidden-sm-and-up"
    >
      <v-btn v-for="(item, index) in items" :key="index"
        :to="{ path: item.path }"
        v-show="index < 4"
        text  
        height="50"
        class="py-4"
      >
          <span>{{ item.name }}</span>
          <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
  </v-bottom-navigation>
</v-app>
  
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    drawer: false,
    tab: null,
    items: [
      {
        name: "Home",
        path: "/",
        icon: "mdi-home"
      },

      {
        name: 'Cadastro',
        path: '/cadastrar',
        icon: 'mdi-account-multiple-plus'
      },

      {
        name: "Clientes",
        path: '/listar',
        icon: 'mdi-magnify',
      },
      
      {
        name: "Inventario",
        path: "/inventario",
        icon: 'mdi-package-variant'
      },
      
      {
        name: "Produtos",
        path: "/produtos",
        icon: 'mdi-package-variant'
      },
      
      {
        name: "Localização",
        path: "/geolocalizacao",
        icon: 'mdi-crosshairs'
      },

    ],
    
  }),

  methods: {
    home() {
      this.$router.push({ name: 'Home' })
    }
  }
};
</script>

<style>
  .logo a {
    cursor: pointer;
    position: relative;
    text-decoration: none;
    color: white !important;
    top: 7px;
    padding-right: 10px;
  }
  .router-link-v-tab {
    text-decoration: none;
    color: white !important;
  }
</style>
