<template>
  <div class="list-group">
    <ListGroupItem v-for="(item, index) in items" :key="index" :item="item" />
  </div>
</template>

<script setup lang="ts">
import ListGroupItem from './ListGroupItem.vue'

interface ListItem {
  heading: string
  content: string
  meta: string
  subtext: string
  active?: boolean
}

const props = defineProps<{
  items: ListItem[]
}>()
</script>
