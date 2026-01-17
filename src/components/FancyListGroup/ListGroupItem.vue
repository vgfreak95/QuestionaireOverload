<template>
  <a href="#" class="list-group-item flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{{ item.heading }}</h5>
      <small :class="item.active ? '' : 'text-muted'">{{ item.meta }}</small>
    </div>
    <p class="mb-1">{{ item.content }}</p>
    <small :class="item.active ? '' : 'text-muted'">{{ item.subtext }}</small>
  </a>
</template>

<script setup lang="ts">
interface ListItem {
  heading: string
  content: string
  meta: string
  subtext: string
  active?: boolean
}

const props = defineProps<{
  item: ListItem
}>()
</script>
