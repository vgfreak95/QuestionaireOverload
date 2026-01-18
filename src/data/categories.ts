export const assessment_from_category = {}

export interface Category {
  id: string
  name: string
  assessments: Assessment[]
}

export interface QuestionBase {
  id: string
  text: string
  type: 'multiple-choice' | 'slider'
}

export interface Assessment {
  id: string
  name: string
  summary: string
  scoreExplanation: string
  scoreEvaluation?: (score: number) => string
  scoreCalculation?: (score: number) => number
  options?: string[]
  scale?: { min: number; max: number; split: number }
  questions: Question[]
}

export interface MultipleChoiceQuestion extends QuestionBase {
  type: 'multiple-choice'
  options?: string[]
}

export interface SliderQuestion extends QuestionBase {
  type: 'slider'
  scale: { min: number; max: number }
  breakpoints: number
}

export type Question = MultipleChoiceQuestion | SliderQuestion

export function resolveResponses(
  question: Question,
  assessment: Assessment,
): string[] | { min: number; max: number; breakpoints: number } {
  if (question.type === 'multiple-choice') {
    return question.options ?? assessment.options ?? []
  }

  // slider
  return {
    min: question.scale?.min ?? assessment.scale?.min ?? 0,
    max: question.scale?.max ?? assessment.scale?.max ?? 10,
    breakpoints: question.breakpoints,
  }
}

export const categories: Category[] = [
  {
    id: 'anxiety',
    name: 'Anxiety Disorders',
    assessments: [
      {
        id: 'gad-7',
        name: 'Generalized Anxiety Disorder - 7',
        scoreExplanation:
          '0–4: Minimal anxiety 5–9: Mild anxiety 10–14: Moderate anxiety 15–21: Severe anxiety Score ≥10 → probable GAD',
        scoreEvaluation: (score) => {
          if (score >= 0 && score <= 4) return 'Miminal Anxiety'
          if (score >= 5 && score <= 9) return 'Mild Anxiety'
          if (score >= 10 && score <= 14) return 'Moderate Anxiety'
          if (score >= 15 && score <= 21) return 'Severe Anxiety'
          return "Couldn't Evaluate"
        },
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        summary:
          '7-item self-report screening tool used to: Identify probable Generalized Anxiety Disorder (GAD); Measure severity of anxiety symptoms; Monitor symptom change over time',
        questions: [
          {
            id: 'q1',
            text: 'Over the last two weeks, how often have you been bothered by feeling nervous, anxious, or on edge?',
            type: 'multiple-choice',
          },
          {
            id: 'q2',
            text: 'Over the last two weeks, how often have you been bothered by not being able to stop or control worrying?',
            type: 'multiple-choice',
          },
          {
            id: 'q3',
            text: 'Over the last two weeks, how often have you been bothered by worrying too much about different things?',
            type: 'multiple-choice',
          },
          {
            id: 'q4',
            text: 'Over the last two weeks, how often have you been bothered by trouble relaxing?',
            type: 'multiple-choice',
          },
          {
            id: 'q5',
            text: 'Over the last two weeks, how often have you been bothered by being so restless that it is hard to sit still?',
            type: 'multiple-choice',
          },
          {
            id: 'q6',
            text: 'Over the last two weeks, how often have you been bothered by becoming easily annoyed or irritable?',
            type: 'multiple-choice',
          },
          {
            id: 'q7',
            text: 'Over the last two weeks, how often have you been bothered by feeling afraid, as if something awful might happen?',
            type: 'multiple-choice',
          },
        ],
      },
      {
        id: 'spin',
        name: 'Social Phobia Inventory',
        options: ['Not at all', 'A Little', 'Somewhat', 'Very', 'Extremely'],
        summary: '17-item self-report measure assessing social anxiety symptoms',
        scoreExplanation:
          'A total score of ≥20 is typically used as a screen-positive cutoff for probable Social Anxiety Disorder ; Severity Interpretation (What the Scores Mean) Total Score	Interpretation 0–19	No or minimal social anxiety 20–30	Mild social anxiety 31–40	Moderate social anxiety 41–50	Severe social anxiety 51–68	Very severe social anxiety',
        scoreEvaluation: (score) => {
          if (score >= 0 && score <= 19) return 'Minimal'
          if (score >= 20 && score <= 29) return 'Mild'
          if (score >= 30 && score <= 39) return 'Moderate'
          if (score >= 40) return 'Severe'
          return "Couldn't Evaluate"
        },
        questions: [
          { id: 'q1', text: 'I am afraid of people in authority', type: 'multiple-choice' },
          {
            id: 'q2',
            text: 'I am bothered by blushing in front of people',
            type: 'multiple-choice',
          },
          { id: 'q3', text: 'Parties and social events scare me', type: 'multiple-choice' },
          { id: 'q4', text: 'I avoid talking to people I don’t know', type: 'multiple-choice' },
          { id: 'q5', text: 'Being criticized scares me a lot', type: 'multiple-choice' },
          {
            id: 'q6',
            text: 'I avoid doing things or speaking to people for fear of embarrassment',
            type: 'multiple-choice',
          },
          {
            id: 'q7',
            text: 'Sweating in front of people causes me distress',
            type: 'multiple-choice',
          },
          { id: 'q8', text: 'I avoid going to parties', type: 'multiple-choice' },
          {
            id: 'q9',
            text: 'I avoid activities in which I am the center of attention',
            type: 'multiple-choice',
          },
          { id: 'q10', text: 'Talking to strangers scares me', type: 'multiple-choice' },
          { id: 'q11', text: 'I avoid having to give speeches', type: 'multiple-choice' },
          {
            id: 'q12',
            text: 'I would do anything to avoid being criticized',
            type: 'multiple-choice',
          },
          {
            id: 'q13',
            text: 'Heart palpitations bother me when I am around people',
            type: 'multiple-choice',
          },
          {
            id: 'q14',
            text: 'I am afraid of doing things when people might be watching',
            type: 'multiple-choice',
          },
          {
            id: 'q15',
            text: 'Being embarrassed or looking stupid are among my worst fears',
            type: 'multiple-choice',
          },
          { id: 'q16', text: 'I avoid speaking to anyone in authority', type: 'multiple-choice' },
          {
            id: 'q17',
            text: 'Trembling or shaking in front of others is distressing to me',
            type: 'multiple-choice',
          },
        ],
      },
      {
        id: 'bai',
        name: 'Beck Anxiety Inventory',
        options: ['Not at all', 'Mildly', 'Moderately', 'Severely'],
        summary: '21-item self-report scale assessing severity of anxiety',
        scoreExplanation:
          'Severity Interpretation (What the Scores Mean) Total Score	Anxiety Severity 0–7	Minimal anxiety 8–15	Mild anxiety 16–25	Moderate anxiety 26–63	Severe anxiety',
        scoreEvaluation: (score) => {
          if (score >= 0 && score <= 7) return 'Minimal'
          if (score >= 8 && score <= 15) return 'Mild'
          if (score >= 16 && score <= 25) return 'Moderate'
          if (score >= 26 && score <= 63) return 'Severe'
          return "Couldn't Evaluate"
        },
        questions: [
          {
            id: 'q1',
            text: 'During the past month, how much have you been bothered by: Numbness or tingling',
            type: 'multiple-choice',
          },
          {
            id: 'q2',
            text: 'During the past month, how much have you been bothered by: Feeling hot',
            type: 'multiple-choice',
          },
          {
            id: 'q3',
            text: 'During the past month, how much have you been bothered by: Wobbliness in legs',
            type: 'multiple-choice',
          },
          {
            id: 'q4',
            text: 'During the past month, how much have you been bothered by: Unable to relax',
            type: 'multiple-choice',
          },
          {
            id: 'q5',
            text: 'During the past month, how much have you been bothered by: Fear of worst happening',
            type: 'multiple-choice',
          },
          {
            id: 'q6',
            text: 'During the past month, how much have you been bothered by: Dizzy or lightheaded',
            type: 'multiple-choice',
          },
          {
            id: 'q7',
            text: 'During the past month, how much have you been bothered by: Heart pounding/racing',
            type: 'multiple-choice',
          },
          {
            id: 'q8',
            text: 'During the past month, how much have you been bothered by: Unsteady',
            type: 'multiple-choice',
          },
          {
            id: 'q9',
            text: 'During the past month, how much have you been bothered by: Terrified or afraid',
            type: 'multiple-choice',
          },
          {
            id: 'q10',
            text: 'During the past month, how much have you been bothered by: Nervous',
            type: 'multiple-choice',
          },
          {
            id: 'q11',
            text: 'During the past month, how much have you been bothered by: Feeling of choking',
            type: 'multiple-choice',
          },
          {
            id: 'q12',
            text: 'During the past month, how much have you been bothered by: Hands trembling',
            type: 'multiple-choice',
          },
          {
            id: 'q13',
            text: 'During the past month, how much have you been bothered by: Shaky/unsteady',
            type: 'multiple-choice',
          },
          {
            id: 'q14',
            text: 'During the past month, how much have you been bothered by: Fear of losing control',
            type: 'multiple-choice',
          },
          {
            id: 'q15',
            text: 'During the past month, how much have you been bothered by: Difficulty in breathing',
            type: 'multiple-choice',
          },
          {
            id: 'q16',
            text: 'During the past month, how much have you been bothered by: Fear of dying',
            type: 'multiple-choice',
          },
          {
            id: 'q17',
            text: 'During the past month, how much have you been bothered by: Scared',
            type: 'multiple-choice',
          },
          {
            id: 'q18',
            text: 'During the past month, how much have you been bothered by: Indigestion',
            type: 'multiple-choice',
          },
          {
            id: 'q19',
            text: 'During the past month, how much have you been bothered by: Faint/lightheaded',
            type: 'multiple-choice',
          },
          {
            id: 'q20',
            text: 'During the past month, how much have you been bothered by: Face flushed',
            type: 'multiple-choice',
          },
          {
            id: 'q21',
            text: 'During the past month, how much have you been bothered by: Hot/cold sweats',
            type: 'multiple-choice',
          },
        ],
      },
    ],
  },
  {
    id: 'depressive',
    name: 'Depressive Disorders',
    assessments: [
      {
        id: 'phq-9',
        name: 'Patient Health Questionaire',
        options: ['Not at all', 'Several Days', 'More than half the days', 'Nearly every day'],
        summary: '9-item self-report for depression over the past 2 weeks',
        scoreExplanation:
          'Total Score Depression Severity 0–4	Minimal / none 5–9	Mild depression 10–14	Moderate depression 15–19	Moderately severe depression 20–27	Severe depression Scores ≥10 are commonly used as a cutoff indicating clinically significant depressive symptoms.',
        scoreEvaluation: (score) => {
          if (score >= 0 && score <= 4) return 'Miminal / None'
          if (score >= 5 && score <= 9) return 'Mild Depression'
          if (score >= 10 && score <= 14) return 'Moderate Depression'
          if (score >= 15 && score <= 19) return 'Moderately Severe Depression'
          if (score >= 20 && score <= 27) return 'Severe Severe Depression'
          return "Couldn't Evaluate"
        },
        questions: [
          {
            id: 'q1',
            text: 'Over the last 2 weeks, how often have you been bothered by: Little interest or pleasure in doing things',
            type: 'multiple-choice',
          },
          {
            id: 'q2',
            text: 'Over the last 2 weeks, how often have you been bothered by: Feeling down, depressed, or hopeless',
            type: 'multiple-choice',
          },
          {
            id: 'q3',
            text: 'Over the last 2 weeks, how often have you been bothered by: Trouble falling or staying asleep, or sleeping too much',
            type: 'multiple-choice',
          },
          {
            id: 'q4',
            text: 'Over the last 2 weeks, how often have you been bothered by: Feeling tired or having little energy',
            type: 'multiple-choice',
          },
          {
            id: 'q5',
            text: 'Over the last 2 weeks, how often have you been bothered by: Poor appetite or overeating',
            type: 'multiple-choice',
          },
          {
            id: 'q6',
            text: 'Over the last 2 weeks, how often have you been bothered by: Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
            type: 'multiple-choice',
          },
          {
            id: 'q7',
            text: 'Over the last 2 weeks, how often have you been bothered by: Trouble concentrating on things, such as reading the newspaper or watching television',
            type: 'multiple-choice',
          },
          {
            id: 'q8',
            text: 'Over the last 2 weeks, how often have you been bothered by: Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
            type: 'multiple-choice',
          },
          {
            id: 'q9',
            text: 'Over the last 2 weeks, how often have you been bothered by: Thoughts that you would be better off dead or of hurting yourself in some way',
            type: 'multiple-choice',
          },
        ],
      },
      {
        id: 'bdi-ii',
        name: 'Beck Depression Inventory - II',
        summary: '21-item self-report for depression severity',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        scoreExplanation:
          'Total Score	Depression Severity 0–13	Minimal depression 14–19	Mild depression 20–28	Moderate depression 29–63	Severe depression',
        scoreEvaluation: (score) => {
          if (score >= 0 && score <= 13) return 'Miminal Depression'
          if (score >= 14 && score <= 19) return 'Mild Depression'
          if (score >= 20 && score <= 28) return 'Moderate Depression'
          if (score >= 29 && score <= 63) return 'Severe Depression'
          return "Couldn't Evaluate"
        },
        questions: [
          {
            id: 'q1',
            text: 'Pick the statement in each group that best describes the way you have been feeling during the past two weeks, including today. If several statements in the group seem to apply equally well, choose the highest number for that group. Sadness',
            type: 'multiple-choice',
          },
          {
            id: 'q2',
            text: 'Pick the statement in each group that best describes the way you have been feeling during the past two weeks, including today. If several statements in the group seem to apply equally well, choose the highest number for that group. Pessimism',
            type: 'multiple-choice',
          },
          {
            id: 'q3',
            text: 'Pick the statement in each group that best describes the way you have been feeling during the past two weeks, including today. If several statements in the group seem to apply equally well, choose the highest number for that group. Past Failure',
            type: 'multiple-choice',
          },
          {
            id: 'q4',
            text: 'Pick the statement in each group that best describes the way you have been feeling during the past two weeks, including today. If several statements in the group seem to apply equally well, choose the highest number for that group. Loss of Pleasure',
            type: 'multiple-choice',
          },
          {
            id: 'q5',
            text: 'Pick the statement in each group that best describes the way you have been feeling during the past two weeks, including today. If several statements in the group seem to apply equally well, choose the highest number for that group. Guilty Feelings',
            type: 'multiple-choice',
          },
          {
            id: 'q6',
            text: 'Pick the statement in each group that best describes the way you have been feeling during the past two weeks, including today. If several statements in the group seem to apply equally well, choose the highest number for that group. Punishment Feelings',
            type: 'multiple-choice',
          },
          {
            id: 'q7',
            text: 'Pick the statement in each group that best describes the way you have been feeling during the past two weeks, including today. If several statements in the group seem to apply equally well, choose the highest number for that group. Self-Dislike',
            type: 'multiple-choice',
          },
          {
            id: 'q8',
            text: 'Pick the statement in each group that best describes the way you have been feeling during the past two weeks, including today. If several statements in the group seem to apply equally well, choose the highest number for that group. Self-Criticalness',
            type: 'multiple-choice',
          },
          {
            id: 'q9',
            text: 'Pick the statement in each group that best describes the way you have been feeling during the past two weeks, including today. If several statements in the group seem to apply equally well, choose the highest number for that group. Suicidal Thoughts or Wishes',
            type: 'multiple-choice',
          },
          {
            id: 'q10',
            text: 'Pick the statement in each group that best describes the way you have been feeling during the past two weeks, including today. If several statements in the group seem to apply equally well, choose the highest number for that group. Crying',
            type: 'multiple-choice',
          },
          {
            id: 'q11',
            text: 'Pick the statement in each group that best describes the way you have been feeling during the past two weeks, including today. If several statements in the group seem to apply equally well, choose the highest number for that group. Agitation',
            type: 'multiple-choice',
          },
          {
            id: 'q12',
            text: 'Pick the statement in each group that best describes the way you have been feeling during the past two weeks, including today. If several statements in the group seem to apply equally well, choose the highest number for that group. Loss of Interest',
            type: 'multiple-choice',
          },
          {
            id: 'q13',
            text: 'Pick the statement in each group that best describes the way you have been feeling during the past two weeks, including today. If several statements in the group seem to apply equally well, choose the highest number for that group. Indecisiveness',
            type: 'multiple-choice',
          },
          {
            id: 'q14',
            text: 'Pick the statement in each group that best describes the way you have been feeling during the past two weeks, including today. If several statements in the group seem to apply equally well, choose the highest number for that group. Worthlessness',
            type: 'multiple-choice',
          },
          {
            id: 'q15',
            text: 'Pick the statement in each group that best describes the way you have been feeling during the past two weeks, including today. If several statements in the group seem to apply equally well, choose the highest number for that group. Loss of Energy',
            type: 'multiple-choice',
          },
          {
            id: 'q16',
            text: 'Pick the statement in each group that best describes the way you have been feeling during the past two weeks, including today. If several statements in the group seem to apply equally well, choose the highest number for that group. Changes in Sleeping Pattern',
            type: 'multiple-choice',
          },
          {
            id: 'q17',
            text: 'Pick the statement in each group that best describes the way you have been feeling during the past two weeks, including today. If several statements in the group seem to apply equally well, choose the highest number for that group. Irritability',
            type: 'multiple-choice',
          },
          {
            id: 'q18',
            text: 'Pick the statement in each group that best describes the way you have been feeling during the past two weeks, including today. If several statements in the group seem to apply equally well, choose the highest number for that group. Changes in Appetite',
            type: 'multiple-choice',
          },
          {
            id: 'q19',
            text: 'Pick the statement in each group that best describes the way you have been feeling during the past two weeks, including today. If several statements in the group seem to apply equally well, choose the highest number for that group. Concentration Difficulty',
            type: 'multiple-choice',
          },
          {
            id: 'q20',
            text: 'Pick the statement in each group that best describes the way you have been feeling during the past two weeks, including today. If several statements in the group seem to apply equally well, choose the highest number for that group. Tiredness or Fatigue',
            type: 'multiple-choice',
          },
          {
            id: 'q21',
            text: 'Pick the statement in each group that best describes the way you have been feeling during the past two weeks, including today. If several statements in the group seem to apply equally well, choose the highest number for that group. Loss of Interest in Sex',
            type: 'multiple-choice',
          },
        ],
      },
    ],
  },
  {
    id: 'dissociation',
    name: 'Dissociation',
    assessments: [
      {
        id: 'des-ii',
        name: 'Dissociative Experiences Scale - II',
        summary: '28 symptom self-report to assess disassociation',
        scale: { min: 0, max: 100, split: 10 },
        scoreExplanation:
          'Total Score (%)	Interpretation 0–4	Minimal or no dissociation 5–19	Mild dissociation (often normal) 20–29	Moderate dissociation (may warrant clinical attention) 30+	Severe dissociation (high likelihood of dissociative disorder) Cutoff scores: A DES-II score ≥30% is often used as a screen-positive threshold for clinically significant dissociation',
        scoreEvaluation: (score) => {
          if (score >= 0 && score <= 4) return 'Miminal or No Dissocation'
          if (score >= 5 && score <= 19) return 'Mild Dissociation'
          if (score >= 20 && score <= 29) return 'Moderate Dissociation'
          if (score >= 30) return 'Severe Dissociation'
          return "Couldn't Evaluate"
        },
        scoreCalculation: (score) => Number((score / 28).toFixed(2)),
        questions: [
          {
            id: 'q1',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people find that sometimes they are listening to someone talk and they suddenly realize that they did not hear part or all of what was said.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q2',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people have the experience of finding themselves in a place and have no idea how they got there.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q3',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people have the experience of finding themselves dressed in clothes that they don’t remember putting on. ',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q4',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people have the experience of driving or riding in a car or bus or subway and suddenly realizing that they don’t remember what has happened during all or part of the trip',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q5',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people have the experience of finding new things among their belongings that they do not remember buying.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q6',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people sometimes find that they are approached by people that they do not know, who call them by another name or insist that they have met them before. ',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q7',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people sometimes have the experience of feeling as though they are standing next to themselves or watching themselves do something and they actually see themselves as if they were looking at another person.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q8',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people are told that they sometimes do not recognize friends or family members.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q9',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people find that they have no memory for some important events in their lives (for example, a wedding or graduation).',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q10',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people have the experience of being accused of lying when they do not think that they have lied.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q11',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people have the experience of looking in a mirror and not recognizing themselves.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q12',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people have the experience of feeling that other people, objects, and the world around them are not real.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q13',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people have the experience of feeling that their body does not seem to belong to them.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q14',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people have the experience of sometimes remembering a past event so vividly that they feel as if they were reliving that event.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q15',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people have the experience of not being sure whether things that they remember happening really did happen or whether they just dreamed them.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q16',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people have the experience of being in a familiar place but finding it strange and unfamiliar.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q17',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people find that when they are watching television or a movie they become so absorbed in the story that they are unaware of other events happening around them.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q18',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people find that they become so involved in a fantasy or daydream that it feels as though it were really happening to them.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q19',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people find that they sometimes are able to ignore pain.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q20',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people find that they sometimes sit staring off into space, thinking of nothing, and are not aware of the passage of time.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q21',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people sometimes find that when they are alone they talk out loud to themselves.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q22',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people find that in one situation they may act so differently compared with another situation that they feel almost as if they were two different people.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q23',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people sometimes find that in certain situations they are able to do things with amazing ease and spontaneity that would usually be difficult for them (for example, sports, work, social situations, etc.).',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q24',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people sometimes find that they cannot remember whether they have done something or have just thought about doing that thing (for example, not knowing whether they have just mailed a letter or have just thought about mailing it).',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q25',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people find evidence that they have done things that they do not remember doing.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q26',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people sometimes find writings, drawings, or notes among their belongings that they must have done but cannot remember doing.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q27',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people sometimes find that they hear voices inside their head that tell them to do things or comment on things that they are doing.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q28',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people sometimes feel as if they are looking at the world through a fog, so that people and objects appear far away or unclear.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
        ],
        // questions: [{id:}],
      },
    ],
  },
  {
    id: 'ptsd',
    name: 'PTSD',
    assessments: [
      {
        id: 'pcl-5',
        name: 'PTSD Checklist',
        options: ['Not at all', 'Several Days', 'More than half the days', 'Nearly every day'],
        summary: '9-item self-report for depression over the past 2 weeks',
        scoreExplanation:
          'Total Score	PTSD Severity 0–19	Minimal / unlikely PTSD 20–31	Mild PTSD symptoms 32–50	Moderate PTSD symptoms 51–80	Severe PTSD symptoms Common clinical cutoff: A total score of 33 or higher is often used to indicate probable PTSD and the need for further evaluation.',
        scoreEvaluation: (score) => {
          if (score >= 0 && score <= 19) return 'Minimal / Unlikely PTSD'
          if (score >= 20 && score <= 31) return 'Mild PTSD Symptoms'
          if (score >= 32 && score <= 50) return 'Moderate PTSD Symptoms'
          if (score >= 51 && score <= 80) return 'Severe PTSD Symptoms'
          return "Couldn't Evaluate"
        },
        questions: [
          {
            id: 'q1',
            text: 'Repeated, disturbing, and unwanted memories of the stressful experience?',
            type: 'multiple-choice',
          },
          {
            id: 'q2',
            text: 'Repeated, disturbing dreams of the stressful experience?',
            type: 'multiple-choice',
          },
          {
            id: 'q3',
            text: 'Suddenly feeling or acting as if the stressful experience were actually happening again (as if you were actually back there reliving it)?',
            type: 'multiple-choice',
          },
          {
            id: 'q4',
            text: 'Feeling very upset when something reminded you of the stressful experience?',
            type: 'multiple-choice',
          },
          {
            id: 'q5',
            text: 'Having strong physical reactions when something reminded you of the stressful experience (for example, heart pounding, trouble breathing, sweating)?',
            type: 'multiple-choice',
          },
          {
            id: 'q6',
            text: 'Avoiding memories, thoughts, or feelings related to the stressful experience?',
            type: 'multiple-choice',
          },
          {
            id: 'q7',
            text: 'Avoiding external reminders of the stressful experience (for example, people, places, conversations, activities, objects, or situations)?',
            type: 'multiple-choice',
          },
          {
            id: 'q8',
            text: 'Trouble remembering important parts of the stressful experience?',
            type: 'multiple-choice',
          },
          {
            id: 'q9',
            text: 'Having strong negative beliefs about yourself, other people, or the world (for example, having thoughts such as: I am bad, there is something seriously wrong with me, no one can be trusted, the world is completely dangerous)?',
            type: 'multiple-choice',
          },
          {
            id: 'q10',
            text: 'Blaming yourself or someone else for the stressful experience or what happened after it?',
            type: 'multiple-choice',
          },
          {
            id: 'q11',
            text: 'Having strong negative feelings such as fear, horror, anger, guilt, or shame?',
            type: 'multiple-choice',
          },
          {
            id: 'q12',
            text: 'Loss of interest in activities that you used to enjoy?',
            type: 'multiple-choice',
          },
          {
            id: 'q13',
            text: 'Feeling distant or cut off from other people?',
            type: 'multiple-choice',
          },
          {
            id: 'q14',
            text: 'Trouble experiencing positive feelings (for example, being unable to feel happiness or have loving feelings for people close to you)?',
            type: 'multiple-choice',
          },
          {
            id: 'q15',
            text: 'Irritable behavior, angry outbursts, or acting aggressively?',
            type: 'multiple-choice',
          },
          {
            id: 'q16',
            text: 'Taking too many risks or doing things that could cause you harm?',
            type: 'multiple-choice',
          },
          {
            id: 'q17',
            text: 'Being “superalert” or watchful or on guard?',
            type: 'multiple-choice',
          },
          {
            id: 'q18',
            text: 'Feeling jumpy or easily startled?',
            type: 'multiple-choice',
          },
          {
            id: 'q19',
            text: 'Having difficulty concentrating?',
            type: 'multiple-choice',
          },
          {
            id: 'q20',
            text: 'Trouble falling or staying asleep?',
            type: 'multiple-choice',
          },
        ],
      },
    ],
  },
  {
    id: 'bipolar',
    name: 'Bipolar and Mood Spectrum Disorders',
    assessments: [
      {
        id: 'asrm',
        name: 'Altman Self-Rating Mania Scale',
        summary: '5-item report to assess the presence and/or severity of manic symptoms',
        scoreExplanation:
          'Total Score	Interpretation 0–4	Minimal / no manic symptoms 5–9	Mild mania / hypomania 10–14	Moderate mania / hypomania 15–20	Severe mania / hypomania Screening cutoff: A total score ≥6 is often used as a screen-positive threshold suggesting possible mania or hypomania requiring clinical evaluation.',
        scoreEvaluation: (score) => {
          if (score >= 0 && score <= 4) return 'Minimal / No Manic Symptoms'
          if (score >= 5 && score <= 9) return 'Mild Mania / Hypomania'
          if (score >= 10 && score <= 14) return 'Moderate Mania / Hypomania'
          if (score >= 15 && score <= 20) return 'Severe Mania / Hypomania'
          return "Couldn't Evaluate"
        },
        questions: [
          {
            id: 'q1',
            text: 'Choose the statement that best describes the way you have been feeling for the past week. Positive Mood',
            type: 'multiple-choice',
            options: [
              'I do not feel happier or more cheerful than usual.',
              'I occasionally feel happier or more cheerful than usual.',
              'I often feel happier or more cheerful than usual.',
              'I feel happier or more cheerful than usual most of the time.',
              'I feel happier or more cheerful than usual all of the time.',
            ],
          },
          {
            id: 'q2',
            text: 'Choose the statement that best describes the way you have been feeling for the past week. Self-Confidence',
            type: 'multiple-choice',
            options: [
              'I do not feel more self-confident than usual.',
              'I occasionally feel more self-confident than usual.',
              'I often feel more self-confident than usual.',
              'I feel more self-confident than usual.',
              'I feel extremely self-confident all of the time.',
            ],
          },
          {
            id: 'q3',
            text: 'Choose the statement that best describes the way you have been feeling for the past week. Sleep Patterns',
            type: 'multiple-choice',
            options: [
              'I do not need less sleep than usual.',
              'I occasionally need less sleep than usual.',
              'I often need less sleep than usual.',
              'I frequently need less sleep than usual.',
              'I can go all day and night without any sleep and still not feel tired.',
            ],
          },
          {
            id: 'q4',
            text: 'Choose the statement that best describes the way you have been feeling for the past week. Speech',
            type: 'multiple-choice',
            options: [
              'I do not talk more than usual.',
              'I occasionally talk more than usual.',
              'I often talk more than usual.',
              'I frequently talk more than usual.',
              'I talk constantly and cannot be interrupted.',
            ],
          },
          {
            id: 'q5',
            text: 'Choose the statement that best describes the way you have been feeling for the past week. Activity Level',
            type: 'multiple-choice',
            options: [
              'I have not been more active (either socially, sexually, at work, home or school) than usual.',
              'I have occasionally been more active than usual.',
              'I have often been more active than usual.',
              'I have frequently been more active than usual.',
              'I am constantly active or on the go all the time.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'schitzophenia',
    name: 'Schitzophenia-Spectrum and Psychosis',
    assessments: [
      {
        id: 'pq-b',
        name: 'Prodromal Questionnaire-Brief',
        summary:
          '21-item self-report screening tool used to identify individuals who may be at risk for developing psychosis, particularly during the early or prodromal phase',
        scoreExplanation:
          'Total Yes Responses	≥6 “Yes” responses may indicate increased risk of prodromal psychosis Total Distress Score	≥24 distress points is commonly used as a screen-positive threshold for further evaluation ; These cutoffs are screening guidelines. Positive scores do not confirm psychosis, and a clinical interview with a structured prodromal assessment (e.g., SIPS) is required for diagnosis.',
        scoreEvaluation: (score) => {
          if (score >= 0 && score <= 6) return 'No Indicated Risk of Prodromal Psychosis'
          if (score >= 7 && score <= 24) return 'Indicated Risk of Prodromal Psychosis'
          if (score >= 25) return 'High Risk of Prodromal Psychosis'
          return "Couldn't Evaluate"
        },
        options: [
          'No',
          'Yes, and I STONGLY DISAGREE that when this happens, I feel frightened, concerned, or that it causes problems for me.',
          'Yes, and I DISAGREE that when this happens, I feel frightened, concerned, or that it causes problems for me.',
          'Yes, and I am NEUTRAL to that when this happens, I feel frightened, concerned, or that it causes problems for me.',
          'Yes, and I AGREE that when this happens, I feel frightened, concerned, or that it causes problems for me.',
          'Yes, and I STRONGLY AGREE that when this happens, I feel frightened, concerned, or that it causes problems for me.',
        ],
        questions: [
          {
            id: 'q1',
            text: 'Do familiar surroundings sometimes seem strange, confusing, threatening or unreal to you?',
            type: 'multiple-choice',
          },
          {
            id: 'q2',
            text: 'Have you heard unusual sounds like banging, clicking, hissing, clapping or ringing in your ears?',
            type: 'multiple-choice',
          },
          {
            id: 'q3',
            text: 'Do things that you see appear different from the way they usually do (brighter or duller, larger or smaller, or changed in some other way)?',
            type: 'multiple-choice',
          },
          {
            id: 'q4',
            text: 'Have you had experiences with telepathy, psychic forces, or fortune telling?',
            type: 'multiple-choice',
          },
          {
            id: 'q5',
            text: 'Have you felt that you are not in control of your own ideas or thoughts?',
            type: 'multiple-choice',
          },
          {
            id: 'q6',
            text: 'Do you have difficulty getting your point across, because you ramble or go off the track a lot when you talk?',
            type: 'multiple-choice',
          },
          {
            id: 'q7',
            text: 'Do you feel that other people are watching you or talking about you?',
            type: 'multiple-choice',
          },
          {
            id: 'q8',
            text: 'Do you sometimes feel suddenly distracted by distant sounds that you are not normally aware of?',
            type: 'multiple-choice',
          },
          {
            id: 'q9',
            text: 'Have you had the sense that some person or force is around you, although you couldn’t see anyone?',
            type: 'multiple-choice',
          },
          {
            id: 'q10',
            text: 'Do you worry at times that something may be wrong with your mind?',
            type: 'multiple-choice',
          },
          {
            id: 'q11',
            text: "Have you ever felt that you don't exist, the world does not exist, or that you are dead?",
            type: 'multiple-choice',
          },
          {
            id: 'q12',
            text: 'Have you been confused at times whether something you experienced was real or imaginary?',
            type: 'multiple-choice',
          },
          {
            id: 'q13',
            text: 'Do you hold beliefs that other people would find unusual or bizarre?',
            type: 'multiple-choice',
          },
          {
            id: 'q14',
            text: 'Do you feel that parts of your body have changed in some way, or that parts of your body are working differently?',
            type: 'multiple-choice',
          },
          {
            id: 'q15',
            text: 'Are your thoughts sometimes so strong that you can almost hear them?',
            type: 'multiple-choice',
          },
          {
            id: 'q16',
            text: 'Do you find yourself feeling mistrustful or suspicious of other people?',
            type: 'multiple-choice',
          },
          {
            id: 'q17',
            text: 'Have you seen unusual things like flashes, flames, blinding light, or geometric figures?',
            type: 'multiple-choice',
          },
          {
            id: 'q18',
            text: 'Have you seen things that other people can’t see or don’t seem to see?',
            type: 'multiple-choice',
          },
          {
            id: 'q19',
            text: 'Do people sometimes find it hard to understand what you are saying?',
            type: 'multiple-choice',
          },
        ],
      },
    ],
  },
  {
    id: 'adhd',
    name: 'Attention Deficit/Hyperactivity Disorder',
    assessments: [
      {
        id: 'asrs-1.1',
        name: 'Adult ADHD Self-Report Scale',
        summary:
          '18-item self-report screening measure used to identify symptoms of Attention-Deficit/Hyperactivity Disorder (ADHD) in adults',
        options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'],
        questions: [
          {
            id: 'q1',
            text: 'How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?',
            type: 'multiple-choice',
          },
          {
            id: 'q2',
            text: 'How often do you have difficulty getting things in order when you have to do a task that requires organization?',
            type: 'multiple-choice',
          },
          {
            id: 'q3',
            text: 'How often do you have problems remembering appointments or obligations?',
            type: 'multiple-choice',
          },
          {
            id: 'q4',
            text: 'When you have a task that requires a lot of thought, how often do you avoid or delay getting started?',
            type: 'multiple-choice',
          },
          {
            id: 'q5',
            text: 'How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?',
            type: 'multiple-choice',
          },
          {
            id: 'q6',
            text: 'How often do you feel overly active and compelled to do things, like you were driven by a motor?',
            type: 'multiple-choice',
          },
        ],
      },
    ],
  },
  {
    id: 'substance-use',
    name: 'Substance Use Disorders',
    assessments: [
      {
        id: 'audit',
        name: 'Alcohol Use Disorder Identification Test',
        summary:
          '10-item screening tool developed by the World Health Organization (WHO) to assess alcohol consumption, drinking behaviors, and alcohol-related problems.',
        scoreExplanation:
          'Total Score	Interpretation / Risk Level	Clinical Action 0–7	Low risk / normal drinking	No intervention needed; provide feedback if appropriate 8–15	Hazardous drinking	Brief counseling and education about alcohol risks 16–19	Harmful drinking	Further assessment and counseling; possible referral to specialist 20+	Possible alcohol dependence	Full diagnostic evaluation; specialized treatment recommended Scores ≥8 in general adults suggest clinically significant alcohol use, while lower scores indicate low-risk drinking.',
        scoreEvaluation: (score) => {
          if (score >= 0 && score <= 7) return 'Low Risk, No Intervention Needed'
          if (score >= 8 && score <= 15) return 'Hazardous Drinking, Brief Counseling Needed'
          if (score >= 16 && score <= 19) return 'Harmful Drinking, Possible Referal to Specialist'
          if (score >= 20) return 'Drinking Dependence, Full Diagnostic Needed'
          return "Couldn't Evaluate"
        },
        questions: [
          {
            id: 'q1',
            text: 'How often do you have a drink containing alcohol?',
            type: 'multiple-choice',
            options: [
              'Never',
              'Monthly or less',
              '2 to 4 a month',
              '2 to 3 times a week',
              '4 or more times a week',
            ],
          },
          {
            id: 'q2',
            text: 'How many drinks containing alcohol do you have on a typical day when you are drinking?',
            type: 'multiple-choice',
            options: ['1 or 2', '3 or 4', '5 or 6', '7, 8, or 9', '10 or more'],
          },
          {
            id: 'q3',
            text: 'How often do you have six or more drinks on one occasion?',
            type: 'multiple-choice',
            options: ['Never', 'Less than monthly', 'Monthly', 'Weekly', 'Daily or Almost Daily'],
          },
          {
            id: 'q4',
            text: 'How often during the last year have you found that you were not able to stop drinking once you had started?',
            type: 'multiple-choice',
            options: ['Never', 'Less than monthly', 'Monthly', 'Weekly', 'Daily or Almost Daily'],
          },
          {
            id: 'q5',
            text: 'How often during the last year have you failed to do what was normally expected from you because of drinking?',
            type: 'multiple-choice',
            options: ['Never', 'Less than monthly', 'Monthly', 'Weekly', 'Daily or Almost Daily'],
          },
          {
            id: 'q6',
            text: 'How often during the last year have you needed a first drink in the morning to get yourself going after a heavy drinking session?',
            type: 'multiple-choice',
            options: ['Never', 'Less than monthly', 'Monthly', 'Weekly', 'Daily or Almost Daily'],
          },
          {
            id: 'q7',
            text: 'How often during the last year have you had a feeling of guilt or remorse after drinking?',
            type: 'multiple-choice',
            options: ['Never', 'Less than monthly', 'Monthly', 'Weekly', 'Daily or Almost Daily'],
          },
          {
            id: 'q8',
            text: 'How often during the last year have you been unable to remember what happened the night before because you had been drinking?',
            type: 'multiple-choice',
            options: ['Never', 'Less than monthly', 'Monthly', 'Weekly', 'Daily or Almost Daily'],
          },
          {
            id: 'q9',
            text: 'Have you or someone else been injured as a result of your drinking?',
            type: 'multiple-choice',
            options: ['No', 'Yes, but not in the last year', 'Yes, during the last year'],
          },
          {
            id: 'q10',
            text: 'Has a relative or friend or a doctor or another health worker been concerned about your drinking or suggested you cut down?',
            type: 'multiple-choice',
            options: ['No', 'Yes, but not in the last year', 'Yes, during the last year'],
          },
        ],
      },
      {
        id: 'dast-10',
        name: 'Drug Abuse Screening Test',
        summary: '10-item report which screens for Drug Abuse',
        scoreExplanation:
          'Total Score	Level of Drug Use Problems	Suggested Clinical Action 0	No problems reported	No intervention needed 1–2	Low level	Minimal intervention; education may be helpful 3–5	Moderate level	Brief intervention or counseling recommended 6–8	Substantial level	Intensive assessment and possible treatment referral 9–10	Severe level	Comprehensive assessment and specialized treatment indicated',
        scoreEvaluation: (score) => {
          if (score == 0) return 'No problems'
          if (score >= 1 && score <= 2) return 'Low Level Minimal Intervention'
          if (score >= 3 && score <= 5) return 'Brief Intervention'
          if (score >= 6 && score <= 8) return 'Substantial Intensive Assessment'
          if (score >= 9 && score <= 10) return 'Severe and Comprehensive Assessment Needed'
          return "Couldn't Evaluate"
        },
        options: ['No', 'Yes'],
        questions: [
          {
            id: 'q1',
            text: 'In the past 12 months, have you used drugs other than those required for medical reasons?',
            type: 'multiple-choice',
          },
          {
            id: 'q2',
            text: 'In the past 12 months, do you abuse more than one drug at a time?',
            type: 'multiple-choice',
          },
          {
            id: 'q3',
            text: 'In the past 12 months, are you unable to stop abusing drugs when you want to?',
            type: 'multiple-choice',
          },
          {
            id: 'q4',
            text: 'In the past 12 months, have you ever had blackouts or flashbacks as a result of drug use?',
            type: 'multiple-choice',
          },
          {
            id: 'q5',
            text: 'In the past 12 months, do you ever feel bad or guilty about your drug use?',
            type: 'multiple-choice',
          },
          {
            id: 'q6',
            text: 'In the past 12 months, does your spouse (or parents) ever complain about your involvement with drugs?',
            type: 'multiple-choice',
          },
          {
            id: 'q7',
            text: 'In the past 12 months, have you neglected your family because of your use of drugs?',
            type: 'multiple-choice',
          },
          {
            id: 'q8',
            text: 'In the past 12 months, have you engaged in illegal activities in order to obtain drugs?',
            type: 'multiple-choice',
          },
          {
            id: 'q9',
            text: 'In the past 12 months, have you ever experienced withdrawal symptoms (felt sick) when you stopped taking drugs?',
            type: 'multiple-choice',
          },
          {
            id: 'q10',
            text: 'In the past 12 months, have you had medical problems as a result of your drug use (e.g. memory loss, hepatitis, convulsions, bleeding)?',
            type: 'multiple-choice',
          },
        ],
      },
    ],
  },
  {
    id: 'eating-disorder',
    name: 'Eating Disorders',
    assessments: [
      {
        id: 'scoff',
        name: 'SCOFF Questionnaire',
        summary: '5-item questionnaire to detect the presence of an eating disorder of any type',
        scoreExplanation:
          'Total Score	Level of Drug Use Problems	Suggested Clinical Action 0	No problems reported	No intervention needed 1–2	Low level	Minimal intervention; education may be helpful 3–5	Moderate level	Brief intervention or counseling recommended 6–8	Substantial level	Intensive assessment and possible treatment referral 9–10	Severe level	Comprehensive assessment and specialized treatment indicated',
        scoreEvaluation: (score) => {
          if (score >= 0 && score <= 1) return 'Low Risk'
          if (score >= 2) return 'Likely Eating Disorder'
          return "Couldn't Evaluate"
        },
        options: ['No', 'Yes'],
        questions: [
          {
            id: 'q1',
            text: 'Do you make yourself sick (throw up) because you feel uncomfortably full?',
            type: 'multiple-choice',
          },
          {
            id: 'q2',
            text: 'Do you worry you have lost control over how much you eat?',
            type: 'multiple-choice',
          },
          {
            id: 'q3',
            text: 'Have you recently lost more than one stone (approximately 14 pounds) in a 3-month period?',
            type: 'multiple-choice',
          },
          {
            id: 'q4',
            text: 'Do you believe yourself to be fat when others say you are too thin?',
            type: 'multiple-choice',
          },
          {
            id: 'q5',
            text: 'Would you say you have thoughts and fears about food and weight that dominate your life?',
            type: 'multiple-choice',
          },
        ],
      },
    ],
  },
]
