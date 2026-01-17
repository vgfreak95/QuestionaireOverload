<template>
  <ListGroup :items="myItems" />
  <button class="btn btn-primary m-3" @click="startAssessments">Start Assessment!</button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAssessmentStore } from '@/stores/assessment.ts'
import ListGroup from '@/components/FancyListGroup/ListGroup.vue'
import { categories } from '@/data/categories.ts'
import { useRouter } from 'vue-router'

const assessmentStore = useAssessmentStore()
const router = useRouter()

const myItems = computed(() => {
  return assessmentStore.queue.map((assessment, index) => {
    return {
      heading: assessment.name,
      content: assessment.summary,
      meta: `${assessment.questions.length} questions`,
      subtext: getCategoryName(assessment.id),
      // active: index === store.currentIndex,
    }
  })
})

function getCategoryName(assessmentId: string) {
  const category = categories.find((c) => c.assessments.some((a) => a.id === assessmentId))
  return category?.name ?? ''
}

function startAssessments() {
  // Shuffle the current list of assessments
  const currentAssessmentQueue = assessmentStore.queue
  assessmentStore.randomizeQueue(currentAssessmentQueue)

  // Swap to the quiz view
  router.push({ name: 'quiz' })
}
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}

.list-slider {
  max-height: 200px;
  overflow-y: auto;
}
</style>
