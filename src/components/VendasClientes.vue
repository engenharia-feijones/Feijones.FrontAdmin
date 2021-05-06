<template>
    <div>
        <v-text-field v-model="search"
            label="Pesquisar"
            single-line hide-details
        ></v-text-field>
        <v-data-table v-model="selectedCli"
            :headers="headersCli" :items="clientes"
            single-select show-select
            :search="search" item-key="id"
            mobile-breakpoint="0" hide-default-footer
            no-data-text="Nenhum cliente encontrado"
        ></v-data-table>
                            
        <div class="text-center">
            <v-btn :disabled="!ativo" color="primary"
                class="text-center" @click="proximoStep()"
                >
                    PROXIMO
            </v-btn>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "VendasClientes",
    
    data: () => ({
        search: '',
        
        clientes: [],
        
        selectedCli: [],
        headersCli:[
            { text:'NOME/R.SOCIAL', align:'left', sortable: false, value:'nome', width:'50px', fixed:true },
            { sortable: false,text: 'CPF/CNPJ', value: 'dado', width:'150px', fixed:'true' },
            { sortable: false,text: 'TEL', value: 'tel', width:'100px', fixed:'true' },
        ],
        ativo: false,
    }),


    methods: {
        async getClientes () {
            await axios.get(`https://feijonesadminapi.azurewebsites.net/api/cliente`).then( (result) => {
                result.data.forEach((cliente) => this.clientes = [  ...this.clientes, { ...cliente, dado: cliente.cpf ? cliente.cpf : cliente.cnpj, nome: cliente.nome ? cliente.nome : cliente.razaoSoci } ]) 
            })
        },

        proximoStep () {
            this.$emit("proximo-passo-01", {step: 2, id_cliente: this.selectedCli[0].id})
        }
    },

    watch: {
        selectedCli () {
            this.ativo = this.selectedCli.length > 0 ? true : false
        }
    },

    mounted () {
        this.getClientes()
    }
}
</script>