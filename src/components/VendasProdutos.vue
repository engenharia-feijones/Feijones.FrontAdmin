<template>
    <div>
        <v-data-table :headers="headersProd" :items="carrinho"
            hide-default-footer no-data-text="Nenhum produto no carrinho."
            mobile-breakpoint="0" class="elevation-1"
        >

            <template v-slot:top>
                <v-toolbar flat>
                <v-spacer></v-spacer>

                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                        <v-row>
                            <v-col>

                                <v-btn color="primary" dark
                                    v-bind="attrs" v-on="on"
                                    medium
                                >
                                    ADICIONAR PRODUTOS
                                </v-btn>

                            </v-col>
                        </v-row>   
                    </template>
                    <v-card>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="12">
                                        <v-autocomplete :items="nomeProd" v-model="selectedItem"
                                            label="Item" clearable
                                            color="primary" solo
                                            required
                                        > </v-autocomplete>

                                        <v-text-field v-model="precoProd" label="PRECO" prefix="R$"></v-text-field>
                                                                        
                                        <v-text-field v-model="qtdCompra" :rules="qtdRules"
                                            label="QTD" required
                                            type="number"
                                        ></v-text-field>

                                        <div v-if="qtdProd[selectedItem] > 0">
                                            <label :disabled="true" for="qtd">Em estoque:  {{ qtdProd[selectedItem] }}</label><br />
                                            <label :disabled="true" for="qtd" v-if="carrinho.length">No Carrinho:  {{ totalCarrinhoQtd[selectedItem] }}</label>
                                        </div>

                                        <div v-else>
                                            <label :disabled="true" for="qtd">Em estoque: 0 </label><br />
                                            <label :disabled="true" for="qtd" v-if="carrinho.length">No Carrinho:  {{ totalCarrinhoQtd[selectedItem] }}</label>
                                        </div> 

                                        

                                        <v-row>
                                            <v-col  align="center">
                                                <v-btn @click="adicionarCarrinho(),dialog=false;"
                                                    color="primary" :disabled="!adicionar"
                                                >ADICIONAR</v-btn>
                                            </v-col>
                                        </v-row>

                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                    </v-dialog>
                </v-toolbar>
            </template> 

            </v-data-table>
                <v-row> 
                <v-col align="center">
                    <v-btn class="mr-10" color="error"
                        @click="voltarPasso02()"
                    >VOLTAR</v-btn>

                    <v-btn color="primary"
                        @click="finalizarVenda()"
                    >FINALIZAR</v-btn>
                </v-col>                                         
            </v-row>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: "VendasProdutos",

    data: () => ({
        dialog: false,
        adicionar: false,

        headersProd: [
            { text:'NOME', sortable:false, align:'left', value:'nome', width:'100px', fixed:true },
            { sortable:false, text:'PRECO', align:'left', value:'preco', width:'50px', fixed:true },
            { sortable:false, text:'QTD', align:'left', value:'qtd', width:'50px', fixed:'true' }
        ],

        produtoList: [],
        nomeProd: [],
        qtdRules: [],
        carrinho: [],
        
        selectedItem: '',
        precoProd: '',
        qtdProd: {},
        qtdCompra: null,

        totalCarrinhoQtd: {}

    }),

    props: {
        id_cliente: {
            type: Number,
            required: true
        },

        id_end: {
            type: Number,
            required: true
        }
    },

    methods: {
        voltarPasso02 () {
            this.$emit('voltar-passo-02', 2)
        },

        limparAutocomplete () {
            this.precoProd = ''
            this.qtdCompra = null
            this.qtdRules = []
            // this.selectedItem = ''
        },

        adicionarCarrinho () {
            this.carrinho = [ ...this.carrinho, { 
                    nome: this.selectedItem,
                    preco: +this.precoProd,
                    qtd: +this.qtdCompra,
                    id: this.produtoList.filter(produto => produto.nome === this.selectedItem )[0].id 
                }
            ]
         
            this.limparAutocomplete()
        },


        async getProdutos () {
            await axios.get(`http://feijones.azurewebsites.net/api/produto`).then((result) => {
                this.produtoList = result.data
                this.produtoList.forEach((produto) => { this.nomeProd = [ ...this.nomeProd, produto.nome ] })
                this.qtdProd = this.produtoList.reduce((acc, cur) => {
                    acc[cur.nome] = acc[cur.nome] + cur.qtd || cur.qtd
                    return acc
                }, {})

                console.log(this.qtdProd)
            })
        },

        finalizarVenda () {
            
            // this.carrinho.forEach(async produto => {
                //    await axios.post(`http://192.168.10.97:5000/api/vendaitem`, {
                    //         id_prod: .id_prod,
            //         qtd: +produtos.qtd, 
            //         preco:parseFloat(produtos.preco)
            //     })
            // })
            let total = this.carrinho.reduce((acc, { preco, qtd }) => acc += preco * qtd, 0)
            console.log(this.id_cliente, this.id_end, total, this.id + 1)
            this.postVendaItem()
        },

        async getIdVendaItem () {
            await axios.get(`http://feijones.azurewebsites.net/api/vendaitem/`).then((res) => {
                this.id = res.data[res.data.length - 1].id
            })
        },

        async postVendaItem () {
            this.carrinho.forEach( async (produto) => {
                // await axios.post(`http://192.168.10.97:5000/api/vendaitem`, {
                //     id_prod: produto.id,
                //     qtd: produto.qtd,
                //     preco: parseFloat(produto.preco)
                // })

                console.log(produto.qtd)
            })
        }
    },

    computed: {
        produtoDisponivel () {
            return [ this.selectedItem, this.qtdCompra ].join('|')
        },

        quantidadeProdutoCarrinho () {
            return [ this.qtdCompra, this.selectedItem, this.carrinho ]
        }
    },

    watch: {
        selectedItem () {
            if (!this.selectedItem) {
                this.limparAutocomplete()
                return
            } 

            this.precoProd = this.produtoList.filter((produto) => produto.nome === this.selectedItem)[0].preco
        },

        qtdCompra () {
            if (!this.qtdCompra) return

            if (this.qtdProd[this.selectedItem])
                this.qtdRules = [ valor => valor <= this.qtdProd || "Sem estoque" ]
        },

        produtoDisponivel () {
            let [ item, qtdCompra ] = this.produtoDisponivel.split('|')
            
            this.adicionar =  (item.length === 0  || (qtdCompra == 0 || qtdCompra > this.qtdProd[this.selectedItem])) ? false : true
        },

       

        carrinho () {
             this.totalCarrinhoQtd = this.carrinho.reduce((prevCar, curCar) => {
                prevCar[curCar.nome] = prevCar[curCar.nome] + curCar.qtd || curCar.qtd
                return prevCar
            }, {})
            
            if (typeof(this.totalCarrinhoQtd[this.selectedItem]) == "number") {
                this.qtdProd[this.selectedItem] -= this.totalCarrinhoQtd[this.selectedItem]
                if (this.qtdProd <= 0)
                    this.adicionar = false
            }
        }
    },

    async mounted () {
        await this.getProdutos()
        await this.getIdVendaItem()

    }
}
</script>