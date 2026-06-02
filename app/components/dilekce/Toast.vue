<script setup lang="ts">
const { message, visible } = useToast()
</script>

<template>
  <div class="toast" :class="{ 'is-show': visible }" role="status" aria-live="polite">
    <DilekceIcon name="check" :size="15" />
    <span>{{ message }}</span>
  </div>
</template>
