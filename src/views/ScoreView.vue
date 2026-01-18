<template>
  <div class="container py-5">
    <h1 class="mb-4">Your Assessment Scores</h1>

    <table class="table table-striped table-bordered align-middle">
      <thead class="table-dark">
        <tr>
          <th>Category</th>
          <th>Assessment</th>
          <th>Score Explanation</th>
          <th>Score Evaluation</th>
          <th>Score</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in scoreRows" :key="row.id">
          <td>{{ row.category }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.scoreExplanation }}</td>
          <td>{{ row.scoreEvaluation }}</td>
          <td class="fw-bold">{{ row.score }}</td>
        </tr>
      </tbody>
    </table>

    <div class="mt-4">
      <RouterLink to="/" class="btn btn-primary"> Take Another Assessment </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAssessmentStore } from '@/stores/assessment'
import { categories } from '@/data/categories'

const assessmentStore = useAssessmentStore()

const assessmentMap = computed(() => {
  const map: Record<
    string,
    {
      name: string
      category: string
      scoreExplanation: string
      scoreEvaluation?: (score: number) => string
      scoreCalculation?: (score: number) => number
    }
  > = {}

  for (const category of categories) {
    for (const assessment of category.assessments) {
      map[assessment.id] = {
        name: assessment.name,
        category: category.name,
        scoreExplanation: assessment.scoreExplanation,
        scoreEvaluation: assessment.scoreEvaluation,
        scoreCalculation: assessment.scoreCalculation,
      }
    }
  }

  return map
})

const scoreRows = computed(() => {
  return Object.entries(assessmentStore.localScores).map(([id, score]) => {
    const meta = assessmentMap.value[id]

    const rawScore = score
    const calculatedScore = meta?.scoreCalculation?.(rawScore) ?? rawScore
    const evaluatedScore = meta?.scoreEvaluation?.(calculatedScore)

    console.log(calculatedScore)
    console.log(evaluatedScore)

    return {
      id,
      name: meta?.name ?? `Unknown (${id})`,
      category: meta?.category ?? 'Unknown',
      score: calculatedScore,
      scoreEvaluation: evaluatedScore ?? 'Unknown',
      scoreExplanation: meta?.scoreExplanation ?? 'Unknown',
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
  justify-content: center;
}

.table {
  background: white;
}
</style>
