<template>
    <div class="cadastro">
        <ListarEnderecosCliente />
    </div>
</template>

<script>
import ListarEnderecosCliente from '@/components/ListarEnderecosCliente'

export default {
    name: "EnderecosDoCliente",

    
    components: {
        ListarEnderecosCliente
    }
}
</script>