<template>
    <v-sheet>
    <v-form v-model="formulario">
        <v-row>
            <v-col cols="12" sm="12" md="4" >
                <v-autocomplete v-model="produto" :items="produtosNome" 
                    no-data-text="Nenhum produto encontrado." label="Produto a ser lançado"
                    hide-selected  single-line
                ></v-autocomplete>
            </v-col>

            <v-col cols="12" sm="12" md="1">
                <v-text-field
                    v-model="qtd"
                    type="number"
                    label="Quantidade"
                    single-line
                    min="1"
                    oninput="validity.valid || (value='')"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="2">
                <v-btn min-height="50" rounded
                    color="red" dark
                    @click="limpar()" type="button"
                >
                    Cancelar
                    <v-icon dark right>mdi-cancel</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="12" sm="12" md="2">
                <v-btn min-height="50" :disabled="!proceed"
                    type="button" rounded
                    @click="lançarProduto(produto)"
                   color="primary"
                >
                    Lançar
                    <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
    </v-sheet>
</template>

<script>
import axios from 'axios'
export default {
    name: "Lancamentos",
    data: () => ({
        formulario: null,
        produto: null,
        produtosNome: [],
        qtd: null,
        proceed: false
    }),

    props: {
        produtosCadastrados: {
            type: Array,
            default: () => [{}],
            required: true,
        }
    },

    watch: {

        produto () {
            this.proceed = ((this.produto && this.produto.length) > 0 && +this.qtd) ? true : false
        },

        qtd () {
            this.proceed = ((this.produto && this.produto.length > 0) && this.qtd > 0) ? true : false
        }
    },


    methods: {
        lançarProduto () {
            let produto = this.produtosCadastrados.filter(produto => produto.nome === this.produto)[0]
            axios.put(`http://192.168.10.97:5000/api/produto/${produto.id}`, {
                qtd: +this.qtd + produto.qtd,
                nome: produto.nome,
                descricao: produto.descricao
            })

            this.limpar()
            this.$emit("atualizar-inventario", 1)
        },

        limpar () {
            this.produto = ''
            this.qtd = ''
        }
    },

    created () {
        this.produtosCadastrados.forEach((produto) => {
            this.produtosNome = [ ...this.produtosNome, produto.nome ]
        })
    }

    
}
</script>