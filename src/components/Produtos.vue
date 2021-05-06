<template>
    <v-container>
        <v-card>
            <v-card-title>
                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-header>Cadastrar Produto</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <ProdutoCadastrar  @atualizar-produtos="buscarProdutos()" />
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-title>
                <!-- <v-btn small class="elevation-4"
                        @click="cadastrarForm = true"
                        >
                            Cadastrar Produtos
                    </v-btn>
                     <v-dialog v-model="cadastrarForm"
                            lazy-validation
                        >
                            <ProdutoCadastrar @atualizar-produtos="buscarProdutos()" />
                        </v-dialog> -->
            <v-card-text>
                    <v-expansion-panels>
                        <v-expansion-panel
                            v-for="(produto, index) in produtosCadastrados"
                            :key="index"
                        >
                            <v-expansion-panel-header>{{ produto.nome }}</v-expansion-panel-header>
                            <v-expansion-panel-content>Descrição: {{ produto.descricao }}</v-expansion-panel-content>
                            <v-expansion-panel-content>
                                <v-row>
                                    <v-col cols="4">
                                        <v-btn @click="editarForm = true">Editar</v-btn>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-btn @click="deletarProduto(produto.id)">Deletar</v-btn>
                                    </v-col>
                                     <v-dialog v-model="editarForm"
                                        lazy-validation
                                        max-width="1200px"
                                    > 
                                        <v-card >
                                            <v-card-text>

                                                    <ProdutoCadastrar v-if="editarForm"
                                                        :produtoEditar="produto" 
                                                        @atualizar-produtos="buscarProdutos(); editarForm = false"
                                                    />
                                            </v-card-text>
                                        </v-card>
                                    </v-dialog> 
                                </v-row>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import axios from 'axios'
import ProdutoCadastrar from './ProdutoCadastrar'



export default {
    name: "CadastrarProduto",

    data: () => ({

        editarForm: false,
        cadastrarForm: false,
        produtosCadastrados: []

    }),
  
    methods: {
         async buscarProdutos () {
             await axios.get(`http://192.168.10.97:5000/api/produto`).then(result => this.produtosCadastrados = result.data)
         },

         async deletarProduto (id) {
             await axios.delete(`http://192.168.10.97:5000/api/produto/${id}`).then(() => this.buscarProdutos())
         }
    },



    components: {
        ProdutoCadastrar,
    },


    async mounted() {
        await this.buscarProdutos()
    },
    
}
</script>