<template>
  <div class="answers">
    <label v-for="(response, index) in responses" :key="index">
      <input type="radio" :value="index" v-model="selected" />
      {{ response }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  responses: string[]
  name: string
  modelValue?: number
}>()

const emit = defineEmits<{
  (e: 'update', value: number): void
}>()

const selected = ref<number | null>(props.modelValue ?? null)

watch(selected, (value) => {
  if (value !== null) emit('update', value)
})
</script>

<style scoped>
.answers label {
  display: block; /* Stack answers vertically */
  margin-bottom: 8px;
  cursor: pointer; /* Makes it clear it's clickable */
}

.answers input[type='radio'] {
  margin-right: 8px; /* Space between radio and text */
}
</style>
