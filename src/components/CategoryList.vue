<template>
  <body>
    <ul class="list-group m-3">
      <li
        v-for="(category, index) in categories"
        :key="index"
        class="list-group-item"
        :class="{ active: selected.includes(index) }"
        @click="toggle(index)"
      >
        {{ category.name }}
      </li>
    </ul>
  </body>
  <div v-if="noCategorySelectedError" class="alert alert-warning m-3">
    {{ noCategorySelectedError }}
  </div>
  <button class="btn btn-primary m-3" @click="start">Diagnose Me!</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { categories, type Assessment } from '@/data/categories.ts'
import { useAssessmentStore } from '@/stores/assessment.ts'

// reactive selected indexes
const selected = ref<number[]>([])

// reactive array to store displayed selection
const displaySelected = ref<string[]>([])

// error
const noCategorySelectedError = ref<string | null>(null)

const assessmentStore = useAssessmentStore()
const router = useRouter()

// Stores selected categories in queue
function start() {
  noCategorySelectedError.value = null

  // Error when no categories are selected
  if (selected.value.length === 0) {
    noCategorySelectedError.value = 'Please select at least one category to continue'
    return
  }

  refreshSelected()

  const selectedCategoryIds: string[] = selected.value.map((i) => categories[i].id)

  const assessments: Assessment[] = categories
    .filter((c) => selectedCategoryIds.includes(c.id))
    .flatMap((c) => c.assessments.map((a) => a))

  // Set the assessments in the queue
  assessmentStore.setQueue(assessments)

  // Move to next page
  router.push({ name: 'preview' })
}

// toggle selection
const toggle = (index: number) => {
  const i = selected.value.indexOf(index)
  console.log(i)
  if (i === -1) selected.value.push(index)
  else selected.value.splice(i, 1)
}

// refresh displayed selected items on button click
const refreshSelected = () => {
  displaySelected.value = selected.value.map((i) => categories[i].id)
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
