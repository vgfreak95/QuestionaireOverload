// stores/assessmentStore.ts
import type { Assessment } from '@/data/categories'
import { defineStore } from 'pinia'

export interface Response {
  [questionId: string]: number | string
}

export interface AssessmentResponses {
  id: string // assessment ID
  responses: Response // user answers
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array] // copy so we don’t mutate the original
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]] // swap
  }
  return newArray
}

export const useAssessmentStore = defineStore('assessment', {
  state: () => ({
    queue: [] as Assessment[],
    currentIndex: 0, // Active assessment
    currentQuestionIndex: 0,
    assessmentsResponses: [] as AssessmentResponses[], // all responses
    localScores: {} as Record<string, number>,
  }),
  getters: {
    currentAssessment: (state) => state.queue[state.currentIndex],
    isFinished: (state) => state.currentIndex >= state.queue.length,
    currentQuestion: (state) => {
      const assessment = state.queue[state.currentIndex]
      if (!assessment || !assessment.questions.length) return null
      return assessment.questions[state.currentQuestionIndex]
    },
    availableResponses: (state) => {
      const assessment = state.queue[state.currentIndex]
      // console.log('Passed first return')
      // // Always return string[] for the UI
      if (assessment.options) return assessment.options
      // console.log('got here after options')
      if (assessment.scale) {
        const { min, max, split } = assessment.scale
        const step = (max - min) / split
        return Array.from({ length: split + 1 }, (_, i) => (min + step * i).toString())
      }
    },
  },
  actions: {
    setQueue(assessments: Assessment[]) {
      this.queue = assessments
      this.currentIndex = 0
      this.assessmentsResponses = assessments.map((a) => ({
        id: a.id,
        responses: {},
      }))
    },
    randomizeQueue(assessments: Assessment[]) {
      const shuffled = shuffleArray(assessments)
      this.setQueue(shuffled)
    },
    resetQueue() {
      this.queue = []
      this.currentIndex = 0
      this.assessmentsResponses = []
    },
    clearCurrentResponses() {
      const current = this.assessmentsResponses[this.currentIndex]
      if (current) {
        current.responses = {}
      }
    },
    saveAnswer(questionId: string, value: number) {
      let current = this.assessmentsResponses[this.currentIndex]

      if (!current) {
        current = {
          id: this.queue[this.currentIndex].id,
          responses: {},
        }
        this.assessmentsResponses[this.currentIndex] = current
      }

      current.responses[questionId] = value
    },
    computeScore(): number {
      const assessment = this.currentAssessment
      const responses = this.assessmentsResponses[this.currentIndex]?.responses ?? {}
      if (!assessment) return 0

      let score = 0

      for (const question of assessment.questions) {
        const answer = responses[question.id] as number
        if (!answer) continue

        // Handle general scores that are multiple choice
        if (question.type === 'multiple-choice') {
          if (answer !== -1) {
            score += answer
          }
        }

        // Sliders will always add
        if (question.type === 'slider' && typeof answer === 'number') {
          score += answer
        }
      }
      return score
    },
    saveScore() {
      const assessment = this.currentAssessment
      if (!assessment) return

      const score = this.computeScore()
      this.localScores[assessment.id] = score

      // Persist all scores in localStorage
      localStorage.setItem('assessmentScores', JSON.stringify(this.localScores))
    },
    loadScores() {
      const stored = localStorage.getItem('assessmentScores')
      if (stored) {
        this.localScores = JSON.parse(stored)
      }
    },
    nextAssessment() {
      if (this.currentIndex < this.queue.length - 1) {
        this.currentIndex++
      }
    },
    previousAssessment() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    },
  },
})
