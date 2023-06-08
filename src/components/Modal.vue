<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center">
        <div class="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>
        <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div class="modal-content py-4 text-left px-6">
                <!-- Contenido del modal -->
                <slot></slot>
            </div>
            <div class="modal-footer py-4 px-6">
                <!-- Botón para cerrar el modal -->
                <button @click="isOpen = false" class="btn">Cerrar</button>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'Modal',
};
</script>
  
<style scoped>
/* Estilos personalizados para el modal */
</style>
  