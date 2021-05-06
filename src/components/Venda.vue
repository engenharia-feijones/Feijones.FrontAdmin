<template>

    <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step :complete="e1>1" step="1">
                Cliente
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1>2" step="2">
                    Endereco
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">
                    Produto
                </v-stepper-step>

            </v-stepper-header>
            <v-stepper-items>
                <v-card>
                    <v-stepper-content step="1">
                        <VendasClientes @proximo-passo-01="proximoPasso01($event)" />
                    </v-stepper-content>
                </v-card>
                <v-stepper-content step="2">
                    <v-card >
                        <VendasEnderecos :id_cliente="id_cliente" 
                            @voltar-passo-01="voltarPasso01($event)" @proximo-passo-02="proximoPasso02($event)"
                        />
                    </v-card>                                        
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-card v-if="e1 == 3">
                        <VendasProdutos @voltar-passo-02="voltarPasso02($event)" 
                            :id_cliente="id_cliente" :id_end="id_end"
                        />
                    </v-card>
                </v-stepper-content>

            </v-stepper-items>
    </v-stepper>
</template>

<script>
import axios from 'axios'
import VendasClientes from './VendasClientes'
import VendasEnderecos from './VendasEnderecos'
import VendasProdutos from './VendasProdutos'

export default {
    name: "venda",

    data: () => ({
        dialog:false,
        itemSelect:false,
        qtdItem:false,

        id_cliente: 0,
        id_end: [],
        
        e1:1,
    }),

    methods: {

        proximoPasso01 (e) {
            this.e1 = e.step
            this.id_cliente = e.id_cliente
        },

        proximoPasso02 (e) {
            this.e1 = e.step
            this.id_end = e.enderecoInfo.iD_end
        },

        limparList(){

            this.selectedItem ='',
            this.precoProd ='',
            this.qtdProd=''

        },

        async postVenda_item(){


            

            console.log(this.produtoList)
            await this.produtoList.forEach(produtos =>{

                 axios.post(`http://192.168.10.97:5000/api/vendaitem`,{
    
                    id_prod:+produtos.id_prod,
                    qtd: +produtos.qtd,
                    preco:parseFloat(produtos.preco)
                    
                    
                }).then((res => alert("cadastrado")))       
            })

            

            

        },

        mascaraCPF(cpf){
            return `${cpf.slice(0,3)}.${cpf.slice(3,6)}.${cpf.slice(6,9)}-${cpf.slice(9)}`

        },
        mascaraCnpj(cnpj){

             return `${cnpj.slice(0,2)}.${cnpj.slice(2,5)}.${cnpj.slice(5,8)}/${cnpj.slice(8,12)}-${cnpj.slice(12)}`

        },
        voltarPasso01 (e) {
            this.e1 = e
            this.id_cliente = 0;
        },

        voltarPasso02 (e) {
            this.e1 = e
        }

    },



    components: {
        VendasClientes,
        VendasEnderecos,
        VendasProdutos 
    }
}
</script>