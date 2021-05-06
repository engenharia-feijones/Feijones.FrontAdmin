<template>
    <v-container>

    
        <v-form
            v-model="valido"
            ref="form"
            lazy-validation
        >
            <v-row>
                <v-col
                    cols="12"
                    md="1"
                >
                    <v-text-field
                        
                        v-model="produto.nome"
                        label="Nome do Produto"
                        :rules="produtoRules"
                        required
                    ></v-text-field>

                </v-col>

                <v-col
                    cols="12"
                    md="3"
                >
                    <v-text-field

                        v-model="produto.descricao"
                        label="O que vai no produto"
                        :rules="descricaoRules"
                        required
                    ></v-text-field>            
                    
                </v-col>
                <v-col
                    cols="12"
                    md="3"
                >
                    <v-text-field v-model="produto.preco"
                        label="Preço do produto" required
                        type="number" min="0" v-mask="['##.##', '###.##']"
                    ></v-text-field>            
                    
                </v-col>

                <v-col cols="12" sm="12"
                    md="3"
                >
                    <v-btn
                        color="red" dark
                        rounded small
                        min-height="45"
                        @click="limparCampos"
                        
                    >
                        Apagar Campos
                        <v-icon dark right>mdi-cancel</v-icon>
                    </v-btn>
                </v-col>
                
                <v-col cols="12" sm="6"
                   md="2"
                >
                    <v-btn
                        color="primary" submit 
                        rounded  small
                        min-height="45"
                        :disabled="!valido"
                        @click="validate()"                        
                    >
                        Salvar
                    <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
                    </v-btn>
                </v-col>

                <v-col
                    cols="6"
                    sm="6"
                >
                </v-col>

            </v-row>
        </v-form>
    </v-container>
</template>

<script>
import axios from 'axios'




export default {
    name: "ProdutoCadastrar",

    data: () => ({
        valido: true,
        cadastroFeito: null,
        dialog: false,

        produto: {
            nome:'',
            descricao: '',
            preco: ''
        },

        produtosCadastrados: [],

        produtoRules: [],
        descricaoRules: [
            v => v.length > 0 || "Por favor, descreva o que vai no feijão"
        ],

    }),
    
    props: {
        produtoEditar: Object
    },
    
  
    methods: {
        limparCampos () {
            
            this.produto = {
                
                nome: '',
                descricao: '',
                preco: '',
                qtd: '',
            } 
         },
        
        validate() {
            this.$refs.form.validate()
            
            if(this.$refs.form.validate())
                this.acao()
        },
        reset () {
            this.$refs.form.reset()
        },

        fecharDialog() {
            this.dialog = false
        },

         async cadastrarProduto() {
             await axios.post('http://192.168.10.97:5000/api/produto', {
                    descricao: this.produto.descricao,
                    nome: this.produto.nome,
                    preco: parseFloat(this.produto.preco)
            }).then((res) => this.cadastroFeito = (res.status) ? true : false)
            this.limparCampos()
            this.dialog = false
            this.$emit('atualizar-produtos')

         },

         async editarProduto () {
             await axios.put(`http://192.168.10.97:5000/api/produto/${this.produtoEditar.id}`, {
                    descricao: this.produto.descricao,
                    nome: this.produto.nome,
                    preco: parseFloat(this.produto.preco)
             }).then((res) => this.cadastroFeito = (res.status) ? true : false)
            this.$emit('atualizar-produtos', 0)
            this.limparCampos()
         },

         async buscarProdutos () {
             await axios.get(`http://192.168.10.97:5000/api/produto`).then(result => this.produtosCadastrados = result.data)
         },

         acao () {
             if (this.produtoEditar) 
                 return this.editarProduto()
            this.cadastrarProduto()             
         }



    },

    computed: {
        
        cadastroMensagem() {
            return this.cadastroFeito ? "Cadastro Realizado" : "Houve um erro ao cadastrar."
        }
    },


    watch: {
        
        dialog (val) {
            if (!val) return

            setTimeout(() => (this.dialog = false), 8000)
        },

       cadastroFeito () {
           this.dialog = !this.dialog
        },

        'produto.nome' () {
            if (this.produtoEditar)
                return
        },

        'produto.preco' () {
           if (+this.produto.preco <= 0) {
               this.produto.preco = null
               console.log("h")
           }
        }



    },


    async mounted() {
        await this.buscarProdutos()
        if (this.produtoEditar) {
            this.produto.nome = this.produtoEditar.nome
            this.produto.descricao = this.produtoEditar.descricao
            this.produto.preco = this.produtoEditar.preco
              this.produtoRules = [
                v => v.length != 0 || "Nome do produto ?",
            ]
        } else {
            this.produtoRules = [
                v => v.length != 0 || "Nome do produto ?",
                v => this.produtosCadastrados.filter(produto => produto.nome === v).length === 0 || "Produto ja existe"
            ]

        }

    },
    
}
</script>

<style scoped>
    /*R remove arrows from input type number */
    ::v-deep input::-webkit-outer-spin-button,
    ::v-deep input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>