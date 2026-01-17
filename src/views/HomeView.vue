<script setup lang="ts">
import CategoryList from '../components/CategoryList.vue'
</script>

<template>
  <header></header>

  <body>
    <h1>Are you ready to get diagnosed?</h1>
    <h3>To get started, start by selecting the categories on the list below.</h3>
    <CategoryList></CategoryList>
  </body>
</template>

<style scoped>
h1,
h3 {
  margin: 1em;
  justify-content: center;
  text-align: center;
}
</style>
