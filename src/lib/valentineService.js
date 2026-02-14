import { supabase, isSupabaseConfigured } from './supabase'

const SUBMISSION_ID = 'main'

/**
 * Save questionnaire answers to Supabase (shared backend).
 * Also saves to localStorage as fallback.
 */
export async function saveAnswers(answers) {
  // Always save to localStorage for offline/fallback
  localStorage.setItem('userAnswers', JSON.stringify(answers))

  if (!isSupabaseConfigured()) return { success: true, source: 'local' }

  const { error } = await supabase.from('valentine_submissions').upsert(
    {
      id: SUBMISSION_ID,
      answers,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'id' }
  )

  return { success: !error, source: error ? 'local' : 'supabase', error }
}

/**
 * Save valentine proposal answer (yes) to Supabase.
 */
export async function saveValentineAnswer(answer) {
  localStorage.setItem('valentineAnswer', answer)

  if (!isSupabaseConfigured()) return { success: true, source: 'local' }

  // Use update to preserve existing answers (or upsert if no row exists yet)
  const { data: existing } = await supabase
    .from('valentine_submissions')
    .select('id')
    .eq('id', SUBMISSION_ID)
    .single()

  const { error } = existing
    ? await supabase
        .from('valentine_submissions')
        .update({ valentine_answer: answer, updated_at: new Date().toISOString() })
        .eq('id', SUBMISSION_ID)
    : await supabase.from('valentine_submissions').insert({
        id: SUBMISSION_ID,
        valentine_answer: answer,
        updated_at: new Date().toISOString(),
      })

  return { success: !error, source: error ? 'local' : 'supabase', error }
}

/**
 * Mark that questions have been answered.
 */
export function markQuestionsAnswered() {
  localStorage.setItem('questionsAnswered', 'true')
}

/**
 * Fetch the latest submission from Supabase.
 * Falls back to localStorage if Supabase isn't configured or fails.
 */
export async function getSubmission() {
  // Try Supabase first if configured
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('valentine_submissions')
      .select('*')
      .eq('id', SUBMISSION_ID)
      .single()

    if (!error && data) {
      return {
        userAnswers: data.answers || null,
        valentineAnswer: data.valentine_answer || null,
        source: 'supabase',
      }
    }
  }

  // Fallback to localStorage
  const answers = localStorage.getItem('userAnswers')
  const vAnswer = localStorage.getItem('valentineAnswer')
  return {
    userAnswers: answers ? JSON.parse(answers) : null,
    valentineAnswer: vAnswer || null,
    source: 'local',
  }
}

/**
 * Sync any existing localStorage data to Supabase.
 * Call on app load so her previous answers (from before Supabase) are shared right away.
 */
export async function syncLocalStorageToSupabase() {
  if (!isSupabaseConfigured()) return

  const answersStr = localStorage.getItem('userAnswers')
  const vAnswer = localStorage.getItem('valentineAnswer')
  const answers = answersStr ? JSON.parse(answersStr) : null

  if (!answers && !vAnswer) return

  await supabase.from('valentine_submissions').upsert(
    {
      id: SUBMISSION_ID,
      ...(answers && { answers }),
      ...(vAnswer && { valentine_answer: vAnswer }),
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'id' }
  )
}

/**
 * Clear all submission data (admin action).
 */
export async function clearSubmission() {
  localStorage.removeItem('userAnswers')
  localStorage.removeItem('valentineAnswer')
  localStorage.removeItem('questionsAnswered')

  if (!isSupabaseConfigured()) return { success: true }

  const { error } = await supabase
    .from('valentine_submissions')
    .update({
      answers: null,
      valentine_answer: null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', SUBMISSION_ID)

  return { success: !error, error }
}
