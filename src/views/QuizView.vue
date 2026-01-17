<template>
  <header>
    <h1>
      Random Assessment {{ assessmentStore.currentIndex + 1 }} of {{ assessmentStore.queue.length }}
    </h1>
  </header>

  <body>
    <div class="question-box">
      <QuizBox
        v-for="(question, index) in assessmentStore.currentAssessment?.questions ?? []"
        :key="`${assessmentStore.currentAssessment?.id}-${question.id}`"
        :question="question"
        :assessment="assessmentStore.currentAssessment!"
        :id="`question-${question.id}`"
      />

      <div class="d-flex justify-content-between px-5 button-container">
        <button class="btn btn-primary" @click="previousAssessment">Previous</button>
        <button class="btn btn-primary" @click="nextAssessment">{{ nextButtonText }}</button>
      </div>
    </div>
  </body>
</template>

<script setup lang="ts">
import QuizBox from '@/components/QuestionBox.vue'
import { useAssessmentStore } from '@/stores/assessment.ts'
import { ref, computed } from 'vue'
import type QuestionBoxType from '@/components/QuestionBox.vue'
import { useRouter } from 'vue-router'

const assessmentStore = useAssessmentStore()
const router = useRouter()
const questionRefs = ref<Record<string, InstanceType<typeof QuestionBoxType> | null>>({})

import { onMounted, onUnmounted } from 'vue'

function handleKeydown(e: KeyboardEvent) {
  if (e.key.toLowerCase() === 'x') {
    autoFillAssessment()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

function autoFillAssessment() {
  console.log('Auto filling assessment')
  const assessment = assessmentStore.currentAssessment
  if (!assessment) return

  for (const question of assessment.questions) {
    const answer = randomAnswerForQuestion(question, assessment)
    console.log(answer)
    if (answer !== null) {
      assessmentStore.saveAnswer(question.id, answer)
    }
  }
}

function randomAnswerForQuestion(question: any, assessment: any) {
  // Question-level options override assessment-level options
  if ('options' in question && question.options?.length) {
    return Math.floor(Math.random() * question.options.length)
  }

  if (assessment.options?.length) {
    return Math.floor(Math.random() * assessment.options.length)
  }

  // Slider question
  if ('scale' in question) {
    const { min, max } = question.scale
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  return null
}

const nextButtonText = computed(() => {
  return assessmentStore.currentIndex === assessmentStore.queue.length - 1 ? 'Finish' : 'Next'
})

function validateAssessment(): boolean {
  const currentResponses =
    assessmentStore.assessmentsResponses[assessmentStore.currentIndex]?.responses ?? {}
  const questions = assessmentStore.currentAssessment?.questions ?? []

  // Find the first unanswered question
  const firstUnanswered = questions.find((q) => currentResponses[q.id] === undefined)
  if (firstUnanswered) {
    const el = document.getElementById(`question-${firstUnanswered.id}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })

    // Optional: highlight unanswered question
    el?.classList.add('unanswered-highlight')
    setTimeout(() => el?.classList.remove('unanswered-highlight'), 2000)

    return false
  }
  return true
}

function nextAssessment() {
  const isAssessmentValid = validateAssessment()
  const assessmentFinished = assessmentStore.currentIndex === assessmentStore.queue.length - 1

  if (!isAssessmentValid) {
    console.log('Please answer all questions before continuing')
    return
  }

  assessmentStore.saveScore()

  if (assessmentFinished) {
    router.push({ name: 'scores' })
  } else {
    assessmentStore.nextAssessment()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function previousAssessment() {
  if (assessmentStore.currentIndex > 0) {
    assessmentStore.previousAssessment()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<style scoped>
h1 {
  margin: 1em;
}

h2 {
  margin: 1em;
  justify-content: center;
  text-align: center;
}

.btn {
  width: 120px;
  height: 40px;
}

.question-box {
  margin-bottom: 50px;
}

.unanswered-highlight {
  animation: flash 0.5s ease-in-out 2;
}
@keyframes flash {
  0%,
  100% {
    background-color: transparent;
  }
  60% {
    background-color: #dc3545;
  }
}
</style>
