<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <header>
    <NavBar websiteTitle="Kaitlyn's Krazy Questionnaire"></NavBar>
  </header>

  <RouterView />
</template>
