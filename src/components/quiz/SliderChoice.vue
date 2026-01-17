<template>
  <div class="slider-wrapper">
    <!-- Slider input -->
    <input
      type="range"
      :min="question.scale.min"
      :max="question.scale.max"
      :step="step"
      v-model.number="sliderValue"
      class="slider-input"
    />

    <div class="slider-labels w-100 d-flex justify-content-between">
      <span class="slider-min">{{ question.scale.min }}</span>
      <span class="slider-max">{{ question.scale.max }}</span>
    </div>

    <!-- Current value -->
    <div class="slider-value text-center mt-1">{{ sliderValue }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { SliderQuestion } from '@/data/categories'
import { useAssessmentStore } from '@/stores/assessment'

const props = defineProps<{
  question: SliderQuestion
}>()

const assessmentStore = useAssessmentStore()
const sliderValue = ref<number>(0)

// Step size based on breakpoints
const step = computed(
  () => (props.question.scale.max - props.question.scale.min) / props.question.breakpoints,
)

// Initialize slider with saved answer if it exists
const savedAnswer =
  assessmentStore.assessmentsResponses[assessmentStore.currentIndex]?.responses[props.question.id]
sliderValue.value = savedAnswer ?? props.question.scale.min

// Watch slider and save answer
watch(sliderValue, (val) => {
  assessmentStore.saveAnswer(props.question.id, val)
})
</script>

<style scoped>
/* Slider container */
.slider-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 1.5rem;
}

/* Track */
.slider-input {
  width: 70%;
  height: 16px;
  -webkit-appearance: none; /* remove default styling */
  background: #ddd;
  border-radius: 8px;
  outline: none;
}

/* Webkit thumb (Chrome, Safari, Edge) */
.slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 32px;
  height: 32px;
  background: var(--bs-primary); /* purple thumb */
  border-radius: 50%;
  border: 2px solid #fff;
  cursor: pointer;
  margin-top: -8px; /* vertically center on track */
}

/* Firefox thumb */
.slider-input::-moz-range-thumb {
  width: 32px;
  height: 32px;
  background: var(--bs-primary);
  border-radius: 50%;
  border: 2px solid #fff;
  cursor: pointer;
}

/* Optional: min/max labels */
.slider-labels {
  width: 70%; /* match slider width */
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 1.2rem;
}

.slider-value {
  font-size: 1.4rem; /* bigger than labels */
  font-weight: 600; /* optional bold */
}

.slider-min {
  margin-left: 100px; /* adjust based on thumb width */
}

.slider-max {
  margin-right: 100px;
}
</style>
