<template>
  <v-container>
     
      <div
        v-if="mostrar"
      >
        <GoogleMap :coords="coords" 
         />

      </div>
      
    <!-- //PASSAR UM ARRAY DE OBJECTOS COM AS COORDENADAS ENCAPSULADAS -->
  </v-container>
</template>

<script>
import axios from 'axios'
import GoogleMap from './GoogleMap'
export default {
    name: "Geolocalizacao",
    data: () => ({
        cep: ' ',
        estado: ' ',
        enderecos: [],
        cordenadas: {},
        coords: [],
        mostrar: false,
    }),
     methods: {
      
        async getCordenates (){
            let result = await  axios.get(`https://feijonesadminapi.azurewebsites.net/api/endereco/`)
                
            result.data.forEach((endereco, position)=>{
                     this.coords[position] = {
                         position: {
                             lat: +endereco.latitude,
                             lng: +endereco.longitude,
                         },

                         nome: endereco.nome_end
                     }
            })
            
            this.mostrar = true
        },
        
        cepComHifen (cep) {
            return   cep.indexOf("-") === -1 ? cep.slice(0, 5) + '-' + cep.slice(5) : cep
        }
        
    },
    
   async created () {
       await this.getCordenates()       
    },
    components: {
        GoogleMap
    }
}
   
</script>