<template>
    <div>
        <v-card>
            <v-card-title class="d-flex justify-space-between">Editar dados do cliente: {{ dados.id }}
                <v-btn
                    color="red"
                    dark
                    @click="deletarCliente()"
                >Deletar Cliente</v-btn>
            </v-card-title>
            <v-card-text>
                <v-form
                    lazy-validation
                    ref="form"
                    v-model="valido"
                >
                    <v-row>
                        <v-col
                            cols="12"
                            >
                                <v-radio-group
                                    v-model="tipo"
                                    row
                                >
                                    <v-radio
                                        value="fisica"
                                        label="Fisica"
                                    ></v-radio>

                                    <v-radio
                                        value="jurudica"
                                        label="Juridica"
                                    ></v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-text-field
                                v-if="tipo === 'fisica'"
                                v-model="dados.cpf"
                                v-mask="['###.###.###-##']"
                                label="CPF"
                                :rules="cpfRules"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-else
                                v-model="dados.cnpj"
                                v-mask="['##.###.###/####-##']"
                                label="CNPJ"
                                :rules="cnpjRules"
                                required
                            ></v-text-field>
                        </v-col> 
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-text-field
                                v-if="tipo === 'fisica'"
                                label="Nome"
                                required
                                :rules="nomeRules"
                                v-model="dados.nome"
                            >
                            ></v-text-field>
                            
                            <v-text-field
                                v-else
                                v-model="dados.razaoSoci"
                                :rules="razaoSocialRules"
                                label="Razao Social"
                                required></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-text-field
                                label="Data de Nascimento"
                                v-model="dados.dtNas"
                                v-mask="['##/##/####']"
                                required
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-text-field
                                label="Telefone"
                                v-model="dados.tel"
                                v-mask="['(##) # ####-####']"
                                :rules="telefoneRules"
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            md="12"
                        >
                            <v-text-field
                                label="Email"
                                v-model="dados.email"
                                :rules="emailRules"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-space-between mx-4">
                <v-btn :to="{path: '/listar'}">Cancelar</v-btn>
                <v-btn
                    color="primary"
                    @click="validate()"
                    :disabled="!valido"
                >Salvar Edições</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "Editar-Cliente",

    data: () => ({
        dados: {},
        tipo: '',
        emailRules: [],
        telefoneRules: [],
        nomeRules: [],
        cpfRules: [],
        cnpjRules: [],
        razaoSocialRules: [],
        valido: false,
     
    }),

    methods: {
        async buscarDadosCliente () {
            await axios.get(`http://feijones.azurewebsites.net/api/cliente/${this.$route.params.id}`)
                .then( (result) => this.dados = result.data)
        },

        async atualizarDados () {

             const dadosTratados = { ...this.dados,
                tel: this.dados.tel.replace(/[^A-Z0-9]/ig, ""),
                cnpj: !this.dados.cnpj  ? null : this.dados.cnpj.replace(/[^A-Z0-9]/ig, ""),
                cpf: !this.dados.cpf  ? null : this.dados.cpf.replace(/\D/g, ''),
                dtNas: this.dados.dtNas.replace(/[^A-Z0-9]/ig, "")
            }


            await axios.put(`http://feijones.azurewebsites.net/api/cliente/${this.$route.params.id}`, {
                nome: dadosTratados.nome,
                email: dadosTratados.email,
                tel: dadosTratados.tel,
                dtNas: dadosTratados.dtNas,
                cpf: dadosTratados.cpf,
                cnpj: dadosTratados.cnpj,
                razaoSoci: dadosTratados.razaoSoci
            })
        },

        async deletarCliente() {
            await axios.delete(`http://feijones.azurewebsites.net/api/cliente/${this.$route.params.id}`)
                .then(() => this.$router.push('/listar'))
        },

        validate () {
            this.$refs.form.validate()

            if (this.$refs.form.validate())
                this.atualizarDados()
                this.$router.push('/listar')
        },


    },

    async mounted () {
        await this.buscarDadosCliente()
        this.tipo = this.dados.cpf ? "fisica" : "jurudica"
        
        this.emailRules = [
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Insira um email válido"
        ],

        

        this.telefoneRules = [
            v => ((v.length === 0 || v.length === 16)) || "Digite um número válido"
        ],

        this.nomeRules = [
            v => v.length > 0 || "Insira um nome"
        ],

        this.cpfRules = [
            v => (v && v.length === 14) || "Insira um CPF valido"
        ],

        this.cnpjRules = [
             v => (v  && v.length === 18) || "Insira um CNPJ valido"
        ],

        this.razaoSocialRules = [
            v => (v && v.length === 0 || v.length >= 3 ) || "Insira uma Razão Social Valida"
        ]
    }
}
</script>