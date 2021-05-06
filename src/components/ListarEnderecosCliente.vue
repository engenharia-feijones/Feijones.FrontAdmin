<template>
    <v-container>
        <v-card>
            <v-card-title
               class="d-flex justify-space-between"
            >
                {{ nome_razao_social }}
                <v-card-actions >
                    <v-btn
                        color="primary"
                        dark
                        @click="mostrarFormulario = true; novoEndereco = true"
                    >
                        <v-icon class="mr-2">mdi-map-marker-plus</v-icon>
                        Novo Endereço
                        
                    </v-btn>
                </v-card-actions>
            </v-card-title>
            <v-card-subtitle>Quantidade de Endereços {{ enderecosCliente.length }}</v-card-subtitle>
            
        </v-card>


        <!-- O V-IF FORÇA A AATUALIZAÇÃO DO FORMULARIO -->
        <v-dialog
            v-model="mostrarFormulario"
            max-height="800px"
            max-width="800px"
            v-if="mostrarFormulario"
        >
            <FormularioEndereco
                :chave="cpf_cnpj"
                :novoEndereco="novoEndereco"
                :editarEndereco="editarEndereco"
                :enderecoDados="editarEnderecoDados"
                @fechar-formulario="mostrarFormulario = false; editarEndereco = false; novoEndereco = false"
                @atualizar-lista="buscarEnderecosCliente()"
                @redefinir-flags="editarEndereco = false; novoEndereco = false"
            />
        </v-dialog>



        <v-divider></v-divider>   

        <v-expansion-panels>

            <v-expansion-panel
                v-for="endereco in enderecosCliente"
                :key="endereco.id"
                class="my-1"
            >

                <v-expansion-panel-header>{{ endereco.bairro }}</v-expansion-panel-header>
                
                <v-expansion-panel-content>
                    CEP: {{ endereco.cep }}
                </v-expansion-panel-content>
                
                <v-expansion-panel-content>
                    Estado: {{ endereco.estado }}
                </v-expansion-panel-content>
                
                <v-expansion-panel-content>
                    Cidade: {{ endereco.cidade }}
                </v-expansion-panel-content>
                
                <v-expansion-panel-content>
                    Bairro: {{ endereco.bairro }}
                </v-expansion-panel-content>

                <v-expansion-panel-content>
                    Complemento: {{ endereco.complemento }}
                </v-expansion-panel-content>

                <v-expansion-panel-content>
                    Numero: {{ endereco.numero }}
                </v-expansion-panel-content>

                    <v-expansion-panel-content>
                    Nome: {{ endereco.nome_end }}
                </v-expansion-panel-content>

                <v-expansion-panel-content>
                    Telefone: {{ endereco.tel_end }}
                </v-expansion-panel-content>

                <v-expansion-panel-content>
                    <v-row>
                        <v-col cols="6" md="12">
                            <v-btn
                                    @click="editarEnderecoForm(endereco)"
                            >
                                Editar
                            </v-btn>
                        </v-col>

                        <v-col cols="6" md="12">
                            <v-btn @click="deletarEndereco(endereco.iD_end); loading = true">
                                Deletar
                            </v-btn>
                        </v-col>
                    </v-row>

                    <v-dialog v-model="loading" hide-overlay>
                        <v-card>
                            <v-card-text>Atualizando Dados
                                <v-progress-linear
                                    indeterminate
                                ></v-progress-linear>
                            </v-card-text>
                            
                        </v-card>
                    </v-dialog>

                    
            </v-expansion-panel-content>
        </v-expansion-panel>
        </v-expansion-panels> 
    </v-container>
</template>

<script>
import axios from 'axios'
import FormularioEndereco from './FormularioEndereco.vue'

export default {
    name: "ListarEnderecosCliente",

    data: () => ({
        novoEndereco: false,
        loading: false,
        mostrarFormulario: false,
        editarEndereco: false,
        enderecosCliente: [],
        clienteDados: {},
        editarEnderecoDados: null,
    }),
    
    props: {
        cliente: Object,
    },

    methods: {
        
        async buscarEnderecosCliente() {
            let result = await axios.get(`https://feijonesadminapi.azurewebsites.net/api/clienteendereco/${this.$route.params.id}`)
            this.enderecosCliente = result.data
        },

        async buscarDadosCliente () {
            let result = await axios.get(`https://feijonesadminapi.azurewebsites.net/api/cliente/${this.$route.params.id}`)
            this.clienteDados = result.data
        },

        async deletarEndereco (iD_end) {
            await axios.delete(`https://feijonesadminapi.azurewebsites.net/api/endereco/${iD_end}`)
            this.buscarEnderecosCliente()
        },

        editarEnderecoForm (endereco) {
            this.mostrarFormulario = true
            this.editarEndereco = true
            this.editarEnderecoDados = endereco
        }

    },

    computed: {
        nome_razao_social () {
            return this.clienteDados.nome  ? this.clienteDados.nome : this.clienteDados.razaoSoci
        },

         cpf_cnpj () {
             return this.clienteDados.cpf  ? this.clienteDados.cpf : this.clienteDados.cnpj
         }
    },

    async mounted () {
        await this.buscarDadosCliente()
        await this.buscarEnderecosCliente()
    },

    components: {
        FormularioEndereco
    },

    watch: {
        loading (value) {
            if (!value)
                return
            setTimeout(() => this.loading = false, 1500)
        }
    }

}
</script>