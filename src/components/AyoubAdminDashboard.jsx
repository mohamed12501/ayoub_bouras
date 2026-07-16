import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import {
  getCloudinaryVideoPosterUrl,
  getGoogleDriveFileId,
  getGoogleDriveThumbnailUrl,
  getOpenVideoUrl,
  getPlayableVideoUrl,
  uploadVideoToCloudinary,
} from '../lib/cloudinary'

export default function AyoubAdminDashboard() {
  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [authForm, setAuthForm] = useState({ email: '', password: '' })
  const [authError, setAuthError] = useState('')
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ title: '', url: '', description: '', thumbnail: '' })
  const [videoFile, setVideoFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const editingVideo = videos.find((video) => video.id === editingId)

  function resetForm() {
    setForm({ title: '', url: '', description: '', thumbnail: '' })
    setVideoFile(null)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setAuthLoading(false)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      if (nextSession) {
        fetchVideos()
      } else {
        setVideos([])
      }
    })

    return () => authListener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) fetchVideos()
  }, [session])

  async function handleSignIn(e) {
    e.preventDefault()
    setAuthError('')

    const { error } = await supabase.auth.signInWithPassword({
      email: authForm.email,
      password: authForm.password,
    })

    if (error) {
      setAuthError(error.message)
      return
    }

    setAuthForm({ email: '', password: '' })
  }

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut()
    if (error) alert(error.message)
  }

  async function fetchVideos() {
    setLoading(true)
    const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false })
    if (error) console.error('fetch videos error', error)
    else setVideos(data || [])
    setLoading(false)
  }

  async function handleAddOrUpdate(e) {
    e.preventDefault()
    if (!form.title) return alert('title required')

    setSubmitting(true)

    try {
      let videoUrl = form.url.trim()
      let thumbnailUrl = form.thumbnail.trim()

      if (videoFile) {
        const uploadResult = await uploadVideoToCloudinary(videoFile, { folder: 'ayoub-portfolio' })
        videoUrl = uploadResult.secure_url || uploadResult.url || ''
        if (!thumbnailUrl) {
          thumbnailUrl = getCloudinaryVideoPosterUrl(videoUrl)
        }
      } else if (videoUrl.includes('drive.google.com')) {
        const fileId = getGoogleDriveFileId(videoUrl)
        if (!fileId) {
          throw new Error('Use a Google Drive file link, not a folder or home page link')
        }

        videoUrl = getPlayableVideoUrl(videoUrl)
      }

      if (!videoUrl) {
        throw new Error('Select a video file to upload or provide a video URL')
      }

      const payload = {
        title: form.title.trim(),
        url: videoUrl,
        description: form.description.trim(),
        thumbnail: thumbnailUrl || null,
      }

      const query = editingId
        ? supabase.from('videos').update(payload).eq('id', editingId)
        : supabase.from('videos').insert([payload])

      const { error } = await query
      if (error) throw error

      setEditingId(null)
      resetForm()
      fetchVideos()
    } catch (error) {
      alert(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  function startEdit(v) {
    setEditingId(v.id)
    setForm({ title: v.title || '', url: v.url || '', description: v.description || '', thumbnail: v.thumbnail || '' })
    setVideoFile(null)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this video?')) return
    const { error } = await supabase.from('videos').delete().eq('id', id)
    if (error) return alert(error.message)
    fetchVideos()
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#07111f] text-slate-100 flex items-center justify-center px-4">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-5 text-sm text-slate-300 shadow-2xl shadow-black/20 backdrop-blur-xl">
          Loading admin access...
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#07111f] text-slate-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="mb-6">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Secure Access
            </div>
            <h1 className="text-2xl font-black text-white">Admin sign in</h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Sign in with your Supabase auth account to manage the portfolio videos.
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">Email</span>
              <input
                type="email"
                placeholder="admin@example.com"
                value={authForm.email}
                onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">Password</span>
              <input
                type="password"
                placeholder="••••••••"
                value={authForm.password}
                onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20"
              />
            </label>

            {authError && (
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">
      <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_top_right,_rgba(34,197,94,0.18),_transparent_28%),radial-gradient(circle_at_20%_20%,_rgba(59,130,246,0.22),_transparent_22%),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:auto,auto,28px_28px,28px_28px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Admin Studio
              </div>
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Manage videos with a cleaner, faster workflow.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Edit the portfolio library, keep thumbnails aligned with the cards, and review uploads from a dashboard built for speed.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Total</div>
                <div className="mt-1 text-2xl font-bold text-white">{videos.length}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Editing</div>
                <div className="mt-1 text-2xl font-bold text-white">{editingId ? '1' : '0'}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Status</div>
                <div className="mt-1 text-2xl font-bold text-emerald-300">Live</div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex w-fit items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[380px_minmax(0,1fr)] lg:px-8 lg:py-8">
        <section className="h-fit rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto lg:self-start">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">{editingId ? 'Edit video' : 'Add video'}</h2>
              <p className="mt-1 text-sm text-slate-400">
                {editingId ? 'Update the selected item and keep the portfolio consistent.' : 'Create a new portfolio entry with matching preview data.'}
              </p>
            </div>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null)
                  resetForm()
                }}
                className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {editingVideo && (
            <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
              Editing <span className="font-semibold">{editingVideo.title}</span>
            </div>
          )}

          <form onSubmit={handleAddOrUpdate} className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">Title</span>
              <input
                placeholder="e.g. Final Butterfly"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20"
              />
            </label>

          {/*  <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">Video File</span>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                className="w-full rounded-2xl border border-dashed border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:border-emerald-400/40"
              />
              <p className="mt-2 text-xs leading-5 text-slate-500">
                {videoFile
                  ? `Selected file: ${videoFile.name}`
                  : 'Choose a video to upload to Cloudinary. The saved DB record will use the returned URL.'}
              </p>
            </label>*/}

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">Video URL</span>
              <input
                placeholder="Cloudinary, mp4, or Google Drive file link"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20"
              />
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Google Drive links need to point to a file or share link. Home or folder pages cannot be played as videos.
              </p>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">Thumbnail URL</span>
              <input
                placeholder="Optional poster image"
                value={form.thumbnail}
                onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">Description</span>
              <textarea
                placeholder="Short context shown in the admin library"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows="5"
                className="w-full resize-none rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20"
              />
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
            >
              {submitting ? 'Uploading...' : editingId ? 'Update video' : 'Create video'}
            </button>
          </form>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Video library</h2>
              <p className="mt-1 text-sm text-slate-400">Preview, open, edit, and delete portfolio items.</p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
              {loading ? 'Loading' : `${videos.length} items`}
            </div>
          </div>

          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="aspect-video rounded-2xl bg-white/10" />
                  <div className="mt-4 h-4 w-3/4 rounded bg-white/10" />
                  <div className="mt-3 h-3 w-full rounded bg-white/10" />
                  <div className="mt-2 h-3 w-2/3 rounded bg-white/10" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {videos.map((video) => (
                <article key={video.id} className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-black/30">
                  <div className="relative aspect-video overflow-hidden bg-slate-900">
                    {video.thumbnail || getCloudinaryVideoPosterUrl(video.url) || getGoogleDriveThumbnailUrl(video.url) ? (
                      <img
                        src={video.thumbnail || getCloudinaryVideoPosterUrl(video.url) || getGoogleDriveThumbnailUrl(video.url)}
                        alt={video.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-slate-500">
                        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.55-2.27A1 1 0 0121 8.61v6.78a1 1 0 01-1.45.89L15 14m0 0V8m0 6l-4.55 2.27A1 1 0 019 15.39V8.61a1 1 0 011.45-.89L15 10z" />
                        </svg>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
                      {video.category || 'Uncategorized'}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                      <a
                        href={getOpenVideoUrl(video.url)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/20"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7m0 0v7m0-7L10 14" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5h5M5 5v14h14v-5" />
                        </svg>
                        Open
                      </a>
                      <a
                        href={getOpenVideoUrl(video.url)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-emerald-400/90 p-2 text-slate-950 transition hover:bg-emerald-300"
                        aria-label={`Open ${video.title} in a new tab`}
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="space-y-4 p-4">
                    <div>
                      <h3 className="text-base font-semibold text-white">{video.title}</h3>
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-400">
                        {video.description || 'No description provided.'}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => startEdit(video)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(video.id)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-200 transition hover:border-rose-400/40 hover:bg-rose-500/20 hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              {videos.length === 0 && (
                <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-10 text-center text-slate-400 md:col-span-2 xl:col-span-3">
                  No videos yet. Add the first one from the panel on the left.
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
