<template>
    <div>
        <v-data-table v-model="selectedEnd"
            :headers="headersEnd" :items="enderecos"
            single-select show-select hide-default-footer
            item-key="iD_end" mobile-breakpoint="0"
        ></v-data-table>
        <v-row>
            <v-col
            align="center"
            >

            <v-btn class="mr-10" color="error"
            @click="voltar()"
            >
                VOLTAR
            </v-btn>

            <v-btn :disabled="!ativo" color="primary"
                @click="proximoPasso()"
            >
            PROXIMO
            </v-btn>

            </v-col> 
        </v-row> 
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: "VendasEnderecos",

    data: () => ({
        selectedEnd: [],
        
        ativo: false,
        
        headersEnd: [
            { text:'RUA', align:'left', sortable: false, value:'endereco', width:'100px', fixed:true },
            { sortable:false, text:'BAIRRO', align:'left', value:'bairro', width:'200px', fixed:true }
        ],
        enderecos: [],

    }),

    props: {
        id_cliente: {
            type: Number,
            default: 0,
            required: true,
        }
    },

    methods: {
        async getEnderecos () {
            await axios.get(`https://feijonesadminapi.azurewebsites.net/api/clienteendereco/${this.id_cliente}`).then((result) => this.enderecos = result.data)
        },

        voltar () {
            this.enderecos = []
            this.selectedEnd = []
            this.$emit("voltar-passo-01", 1)
        },

        proximoPasso () {
            this.$emit("proximo-passo-02", { step: 3, enderecoInfo: this.selectedEnd[0] })
        }
    },

    watch: {

         async id_cliente () {
                this.id_cliente &&  await this.getEnderecos()
        },

        selectedEnd () {
            this.ativo = this.selectedEnd.length > 0 ? true : false
        }
    }

    
}
</script>