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
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        summary:
          'The GAD-7 is a 7-item self-report questionnaire designed to screen for Generalized Anxiety Disorder and to measure anxiety symptom severity over the past 2 weeks.',
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
        questions: [],
      },
      {
        id: 'bdi-ii',
        name: 'Beck Depression Inventory - II',
        summary: '9-item self-report for depression over the past 2 weeks',
        questions: [],
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
        questions: [
          {
            id: 'q1',
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people find that sometimes they are listening to someone talk and they suddenly realize that they did not hear part or all of what was said.',
            type: 'slider',
            scale: { min: 0, max: 100 },
            breakpoints: 10,
          },
          {
            id: 'q1',
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
            text: 'Answer this question based on how often do you experience this in your daily life when you are not under the influence of drugs or alcohol? Choose the answer that shows what percentage of the time you have the experience: Some people have the experience of finding themselves dressed in clothes that they don’t remember putting on.',
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
]
