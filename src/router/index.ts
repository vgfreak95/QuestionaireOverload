import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AssessmentPreviewView from '../views/AssessmentPreviewView.vue'
import QuizView from '@/views/QuizView.vue'
import ScoreView from '@/views/ScoreView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/preview', name: 'preview', component: AssessmentPreviewView },
    { path: '/quiz', name: 'quiz', component: QuizView },
    { path: '/scores', name: 'scores', component: ScoreView },
  ],
})

export default router
