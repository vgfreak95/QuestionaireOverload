<template>
  <header>
    <h1>
      Before getting started with the assessment, make sure that these are the correct categories.
    </h1>
    <h3>
      Below, the list shows the assessments that will be taken, but not in any particular order.
    </h3>
  </header>

  <AssessmentList></AssessmentList>
</template>

<script setup lang="ts">
import AssessmentList from '@/components/AssessmentList.vue'
</script>

<style scoped>
h1,
h3 {
  margin: 1em;
  justify-content: center;
  text-align: center;
}
</style>
