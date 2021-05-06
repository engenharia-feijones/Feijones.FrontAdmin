<template>
    <v-container>
        <v-card class="mb-3">

            <v-expansion-panels v-model="panel">
                <v-expansion-panel  v-model="panel" class="mb-1">
                    <v-expansion-panel-header>Cadastrar Produto</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <ProdutoCadastrar @atualizar-produtos="atualizarInventario()"/>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-divider></v-divider>
                <v-expansion-panel v-model="panel">
                    <v-expansion-panel-header>Lançar Produto No Inventario</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <Lancamentos v-if="produtosCadastrados.length > 0" 
                            :produtosCadastrados="produtosCadastrados" 
                            @atualizar-inventario="atualizarInventario()"
                        />
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card>
        <v-card>
            <v-card-title class="d-flex justify-center">Feijones Inventario
                <v-spacer></v-spacer>
                <v-text-field
                    v-model='filtro'
                    label="Pesquisar"
                    append-icon="mdi-magnify"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-card-text>
                <v-data-table :headers="cabecalho" :items="produtosCadastrados"
                    :search="filtro"
                    hide-default-footer no-data-text="Nenhum produto cadastrado."
                    mobile-breakpoint="0"
                ></v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import axios from 'axios'
import Lancamentos from './Lancamentos'
import ProdutoCadastrar from './ProdutoCadastrar'

export default {
    name: "Inventario",

    data: () => ({
        panel: [],
        produtosCadastrados: [],
        cabecalho: [
                { text: 'Nome', align: 'start', value: 'nome', groupable: false },
                { text: 'Qtd', value: 'qtd', align: 'start' },
        ],
        filtro: '',
    }),

    methods: {
        
        async buscarProdutos() {
            await axios.get(`http://192.168.10.97:5000/api/produto`).then((result) => {
                result.data.forEach((produto) => {
                    this.produtosCadastrados = [ ...this.produtosCadastrados, produto ]
                })
            })

        },

        atualizarInventario () {
            this.panel = null
            this.produtosCadastrados = []
            this.buscarProdutos()
        }
    },

    async mounted () {
        await this.buscarProdutos()
        console.log(this.produtosCadastrados)
    },

    components: {
        ProdutoCadastrar,
        Lancamentos
    }
}
</script>