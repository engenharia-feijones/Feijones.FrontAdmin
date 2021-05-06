<template>

        <v-card>
            <v-card-title>{{ this.editarEndereco ?  "Editar": "Cadastrar" }} Endereços</v-card-title>
            <v-form
                lazy-validation
                v-model="valido"
                ref="form"
            >
                <v-container>
                    <v-row>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                label="CEP"
                                v-model="cep"
                                v-mask="'#####-###'"
                                required
                                @blur="buscarCEP"
                                @keyup="buscarCEP"
                                :rules="cepRules"
                            >
                            </v-text-field>

                        </v-col>

                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                label="Estado"
                                v-model="estado"
                                :rules="estadoRules"
                                oninput="if(this.value.length > 2) this.value = this.value.slice(0, 2).toUpperCase();"
                                blur="if(this.value.length > 2) this.value = this.value.slice(0, 2).toUpperCase();"
                                required
                            >
                            </v-text-field>
                        </v-col>
                        
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                label="Cidade"
                                v-model="cidade"
                                :rules="cidadeRules"
                                required
                            >
                            </v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                label="Rua"
                                v-model="endereco"
                                :rules="padraoRules"
                                required
                            >
                            </v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                label="Bairro"
                                v-model="bairro"
                                :rules="padraoRules"
                                required
                            >
                            </v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                label="Complemento"
                                v-model="complemento"
                                :rules="padraoRules"
                                required
                            >
                            </v-text-field>
                        </v-col>
            
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                label="Numero"
                                v-model="numero"
                                required
                            >
                            </v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                label="Nome"
                                v-model="nome_end"
                                :rules="padraoRules"
                                required
                            >
                            </v-text-field>
                        </v-col>
                        
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                label="Telefone do Endereço"
                                v-model="tel_end"
                                :rules="padraoRules"
                                v-mask="'(##) # ####-####'"
                                required
                            >
                            </v-text-field>
                        </v-col>

                        <v-card-actions>
                            <v-btn
                                text
                                @click="fecharFormulario"
                            >
                                Cancelar
                            </v-btn>

                             <v-btn
                                text
                                @click="limparCampos"
                            >
                                Limpar
                            </v-btn>
                            
                            <v-btn
                                
                                v-if="this.editarEndereco"
                                :disabled="!valido"
                                @click="validate();"
                            >
                                Salvar
                            </v-btn>
                            
                            <v-btn
                                v-else
                               :disabled="!valido"
                               @click="validate();"
                            >
                                Cadastrar
                            </v-btn>

                    <!-- ANIMAÇÃO DE REQUISIÇÃO  -->
                   <v-dialog v-model="loading" :hide-overlay=true max-width="300px">
                        <v-card>
                            <v-card-text>Atualizando Dados
                                <v-progress-linear
                                    indeterminate
                                ></v-progress-linear>
                            </v-card-text>
                            
                        </v-card>
                    </v-dialog>
                        </v-card-actions>
                    </v-row>


                </v-container>
            </v-form>
        </v-card>
</template>

<script>
import axios from 'axios'
import cep from 'cep-promise'

export default {
    name: "FormularioEndereco",

    data: () => ({
            loading: false,
            valido: true,
            cep: ' ',
            estado: ' ',
            cidade: ' ',
            bairro: ' ',
            endereco: ' ',
            numero: ' ',
            tel_end: ' ',
            nome_end: ' ',
            complemento: ' ',
            longitude:'',
            latitude:'',

            estadoRules: [
                v => (v.length == 2) || "Estado Invalido"
            ],

            cidadeRules: [
                v => (v.length > 3) || "Cidade Desconhecida"
            ],

            cepRules: [
                v => (v.length === 9) || "CEP invalido"
            ],
            
            padraoRules: [
                v => (v.length > 0) || "Campo Obrigatorio"
            ],
        
    }),

    methods: {
        fecharFormulario () {
            this.$emit("fechar-formulario", false)
        },

        async enviarFormulario () {
            await this.pegarCoordernadas()
            await axios.post(`https://feijonesadminapi.azurewebsites.net/api/clienteendereco/${this.chave}`, {
                nome_end: this.nome_end,
                tel_end: this.tel_end.replace(/[^A-Z0-9]/ig, ""),
                cep: this.cep,
                endereco: this.endereco,
                numero: this.numero,
                complemento: this.complemento,
                bairro: this.bairro,
                cidade: this.cidade,
                estado: this.estado,
                Longitude: this.longitude,
                Latitude: this.latitude,
                
            }).then(() => {
                this.atualizarLista()
                this.limparCampos()
                this.fecharFormulario()
            })
            .catch(() => {
                this.atualizarLista()
                this.limparCampos()
                this.fecharFormulario()
            })
        },

        async editarFormulario () {
            await this.pegarCoordernadas()
            await axios.put(`https://feijonesadminapi.azurewebsites.net/api/endereco/${this.enderecoDados.iD_end}`, { 
                iD_cliente: +this.enderecoDados.iD_cliente,
                nome_end: this.nome_end,
                tel_end: this.tel_end.replace(/[^A-Z0-9]/ig, ""),
                cep: this.cep,
                endereco: this.endereco,
                numero: this.numero,
                complemento: this.complemento,
                bairro: this.bairro,
                cidade: this.cidade,
                estado: this.estado,
                Longitude: this.longitude,
                Latitude: this.latitude,
            }).then(() => {
                this.limparCampos()
                this.atualizarLista()
                this.loading = true
                this.fecharFormulario()
            })
        },

        async buscarCEP () {
            if (this.cep.length > 7) {
                let error
                let cepExiste = await axios.get(`https://brasilapi.com.br/api/cep/v1/${this.cep}`).catch(err => error = err)
                   
                   //Busca em um outro servidor o cep, caso exista, retorna 200 nos status
                    if (typeof(error) == "undefined" && cepExiste.status === 200  ){
                            let { state, city, street } = await cep(this.cep, { timeout: 2000 })
                            this.estado = state
                            this.cidade = city
                            this.endereco = street
    
                            return
                        }  else if (typeof(error) == "object") {
                            console.log("nao")
                            this.estado = ""
                            this.cidade = ""
                            this.endereco = ""
                        }
                  
                    }
                        
        },

         async pegarCoordernadas (cep, estado) {
            let result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.cep}+${this.estado}&key=AIzaSyD-tYZPzEoP3t1R_0vKXy6epwDSFsh8yMU`)
            // Caminho para a latiude e longitude result.data.results[0].geometry.location
            
            let { lat, lng } = result.data.results[0].geometry.location
            
            
            this.latitude = String(lat)
            this.longitude = String(lng)

            console.log(this.latitude, this.longitude)

        },

        atualizarLista () {
            this.$emit("atualizar-lista")
        },

         atualizarListaEditada () {
            this.$emit("atualizar-lista-atualizada", this.enderecoDados.iD_cliente)
        },

        limparCampos () {
            this.cep = ' '
            this.estado = ' '
            this.cidade = ' '
            this.bairro = ' '
            this.endereco = ' '
            this.numero = ' '
            this.tel_end = ' '
            this.nome_end = ' '
            this.complemento = ' '
            this.longitude = ' '
            this.latitude = ' '
        },



        //  Função do vuetify para verificar se o formulario pde ser enviado, caso algumas das rules não esteja ok, bloqueia
        validate () {

            this.$emit("redefinir-flags")
            console.log(typeof(this.editarEndereco))
            this.$refs.form.validate()

            if (this.editarEndereco  && this.$refs.form.validate()){
                this.loading = true
                this.editarFormulario()
            } else if ((this.editarEndereco === false) && this.$refs.form.validate()){
                this.loading = true
                this.enviarFormulario()
            }
        },

    },



    props: {
        
        chave: {
            type: String
        },

        novoEndereco: {
            type: Boolean
        },

        editarEndereco : {
            type: Boolean,
        },

        enderecoDados: {
            type: Object
        }
    },

    watch: {
        loading (value) {
            if (!value)
                return
            setTimeout(() => this.loading = false, 2000)
        }
    },

    created () {
        if(this.editarEndereco) {
            this.cep = this.enderecoDados.cep
            this.estado = this.enderecoDados.estado
            this.cidade = this.enderecoDados.cidade
            this.bairro = this.enderecoDados.bairro
            this.endereco = this.enderecoDados.endereco
            this.numero = this.enderecoDados.numero
            this.tel_end = this.enderecoDados.tel_end
            this.nome_end = this.enderecoDados.nome_end
            this.complemento = this.enderecoDados.complemento
        } else {
            this.cep = ''
            this.estado = ''
            this.cidade = ''
            this.bairro = ''
            this.endereco = ''
            this.numero = ''
            this.tel_end = ''
            this.nome_end = ''
            this.complemento = ''

        }

    }
}
</script>