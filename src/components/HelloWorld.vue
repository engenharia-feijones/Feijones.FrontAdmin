<template>
  <v-container>
    <v-row

    > 
      <v-col
        cols="12"
        sm="6"
        md="4"
        
      >
        <v-hover
          v-slot="{ hover} "
        >
        
            <v-card 
              to="/cadastrar"
              :elevation="hover ? 12: 2"
              min-height="120px"
            >
              <v-card-title>Cadastro</v-card-title>
              <v-card-subtitle>Area para cadastro de novos clientes</v-card-subtitle>
            </v-card>
        </v-hover>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="4"
      >
         <v-hover
          v-slot="{ hover} "
        >
        
            <v-card 
              to="/listar"
              :elevation="hover ? 12: 2"
              min-height="120px"
            >
              <v-card-title>Visualizar Cadastros</v-card-title>
              <v-card-subtitle>Area para visualizar cadastros e adicionar endereços aos cadastros.</v-card-subtitle>
            </v-card>
        </v-hover>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
         <v-hover
          v-slot="{ hover} "
        >
        
            <v-card 
              to="/geolocalizacao"
              :elevation="hover ? 12: 2"
              min-height="120px"
            >
              <v-card-title>Visualizar Localização</v-card-title>
              <v-card-subtitle>Area para visualizar localização dos clientes no mapa.</v-card-subtitle>
            </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
     
    }),
  }
</script>


<style >
  
</style>