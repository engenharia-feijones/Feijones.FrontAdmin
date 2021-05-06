<template>
    <v-container>
        <h1>Clientes Cadastrados</h1>

        <!-- Animação de loading ao buscar dados na API -->
        <v-dialog
            v-model="loading"
            persistent
            min-width="200px"
            max-width="500px"
        >
            <v-card
                color="primary"
                dark
            >
                <v-card-text>Buscando Dados...
                    <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
            
        </v-dialog>

        <!-- FIM Animação de Busca -->


        <!--Fim do dialog do cliente  -->
        
        <!-- Listagem de cliente -->
        <v-expansion-panels
            multiple
            class="mt-3"
        >
            <v-expansion-panel
                v-for="(cliente, index) in clientesListados"
                :key="index"
            >
          
                    <v-expansion-panel-header>{{cliente.nome ? cliente.nome : cliente.razaoSoci}}</v-expansion-panel-header>
                    <v-expansion-panel-content>{{ cliente.cpf ? "CPF: " : "CNPJ: "}} {{ cliente.cpf ? cliente.cpf : cliente.cnpj }}</v-expansion-panel-content>
                    <v-expansion-panel-content>Data de nascimento: {{ dtNasFormatado(cliente.dtNas) }}</v-expansion-panel-content>
                    <v-expansion-panel-content>Email:{{ cliente.email }}</v-expansion-panel-content>
                    <v-expansion-panel-content>Telefone:{{ cliente.tel }}</v-expansion-panel-content>
                    <v-expansion-panel-content>
                        <v-row >
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-btn
                                    :to="{ path: `/editar/${cliente.id}` }"
                                >
                                    Editar Cliente
                                </v-btn>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-btn
                                    @click="mostrarEnderecos(cliente.id, true)"
                                    :to="{ path: `/listar/${cliente.id}`}"
                                >
                                    Mostrar Endereços
                                </v-btn>
                            </v-col>
                        </v-row>
                        
                        

                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>


    </v-container>
</template>

<script>
import axios from "axios"
export default {
    name: "ListarClientes",
    

    data: () => ({
        clientesListados: null,
        mostrarEndereco: false,
        mostrarFormulario: false,
        editarEndereco: false,
        editarEnderecoDados: {},
        enderecoCliente: [],
        loading : false,
    }),

    methods: {

        async buscarClientes () {
            // Cancelar a animação quando os dados estiverem prontos
            axios.get('https://feijonesadminapi.azurewebsites.net/api/cliente/')
                .then(async (result) => {
                    // let result = await axios.get('https://feijonesadminapi.azurewebsites.net/api/cliente/')
                    this.clientesListados = result.data
                    this.loading = false
                })
        },

        async mostrarEnderecos (id, flag) {
            let result = await axios.get(`https://feijonesadminapi.azurewebsites.net/api/clienteendereco/${id}`)
            if (flag) {
                this.mostrarEndereco = !this.mostrarEndereco
                this.enderecoCliente = result.data
                console.log(this.enderecoCliente)
            } else {
                this.enderecoCliente = result.data
            }
            
        },

        async deletarEndereco (iD_end, iD_cliente) {
            await axios.delete(`https://feijonesadminapi.azurewebsites.net/api/endereco/${iD_end}`).then(() => this.loading = false)
            await this.mostrarEnderecos (iD_cliente)
        },


        mostrarForm() {
            this.mostrarFormulario = !this.mostrarFormulario
        },

        editarForm(endereco) {
            this.mostrarFormulario = !this.mostrarFormulario
            this.editarEndereco = !this.editarEndereco
            this.editarEnderecoDados = endereco
        },

        fecharFormulario (e) {
            this.mostrarFormulario = e
            this.editarEndereco = e
        },

        dtNasFormatado (data) {
            if (data)
                return `${data.slice(0, 2)}/${data.slice(2, 4)}/${data.slice(4)}`
            return data
        }
    },


    mounted () {
        this.buscarClientes()
        this.loading  = true
    },

    // watch: {
    //     loading (value) {
    //         if (value)
    //             setTimeout( () => (this.loading = false), 1700)
    //         else
    //             return
    //     }
    // },

    components: {
    }
}
</script>