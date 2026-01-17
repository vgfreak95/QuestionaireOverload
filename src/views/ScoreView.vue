<template>
  <header></header>

  <body>
    <h1>Assessment Scores</h1>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Assessment</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="assessment in tableData" :key="assessment.id">
          <td>{{ assessment.name }}</td>
          <td>{{ assessment.score }}</td>
        </tr>
      </tbody>
    </table>
  </body>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAssessmentStore } from '@/stores/assessment'

const assessmentStore = useAssessmentStore()

const tableData = computed(() => {
  return Object.entries(assessmentStore.localScores).map(([id, score]) => {
    const assessment = assessmentStore.queue.find((a) => a.id === id)
    return {
      id,
      name: assessment ? assessment.name : id,
      score,
    }
  })
})
</script>

<style scoped>
h1,
h3 {
  margin: 1em;
  justify-content: center;
  text-align: center;
}
th {
  text-align: center;
}
</style>
