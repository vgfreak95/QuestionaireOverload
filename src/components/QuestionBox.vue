<template>
  <div class="question-container" ref="container">
    <div class="question-text">{{ questionNumber + '.' }} {{ question.text }}</div>

    <MultipleChoiceButtons
      v-if="question.type === 'multiple-choice'"
      :responses="responses as string[]"
      :name="question.id"
      :model-value="savedAnswer"
      @update="onAnswer"
    />

    <SliderChoice v-else-if="question.type === 'slider'" :question="question" />
  </div>
</template>

<script setup lang="ts">
import { useAssessmentStore } from '@/stores/assessment.ts'
import MultipleChoiceButtons from './quiz/MultipleChoiceButtons.vue'
import SliderChoice from './quiz/SliderChoice.vue'
import type { Assessment, Question } from '@/data/categories'
import { resolveResponses } from '@/data/categories'
import { computed, ref } from 'vue'

const props = defineProps<{
  question: Question
  assessment: Assessment
}>()

const container = ref<HTMLDivElement | null>(null)

defineExpose({
  container,
})

const assessmentStore = useAssessmentStore()

const responses = computed(() => resolveResponses(props.question, props.assessment))

const questionNumber = computed(() => Number(props.question.id.replace(/\D/g, '')))

const savedAnswer = computed(() => {
  return assessmentStore.assessmentsResponses[assessmentStore.currentIndex]?.responses[
    props.question.id
  ] as number | undefined
})

function onAnswer(value: number) {
  assessmentStore.saveAnswer(props.question.id, value)
}
</script>

<style scoped>
.question-container {
  border: 2px solid black; /* Black border around the whole container */
  padding: 16px; /* Space inside the border */
  margin-left: 1em;
  margin-right: 1em;
  margin-bottom: 16px; /* Space between questions */
  border-radius: 8px; /* Optional rounded corners */
  background-color: #fff; /* Optional background */
}

.question-text {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 12px; /* Space between question and answers */
}
</style>
