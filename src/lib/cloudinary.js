export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
export const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET

function normalizeCloudinaryPathPart(value) {
  return String(value || '').replace(/^\/+|\/+$/g, '')
}

function getCloudinaryApiBaseUrl() {
  if (!CLOUDINARY_CLOUD_NAME) {
    throw new Error('Missing VITE_CLOUDINARY_CLOUD_NAME')
  }

  return `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}`
}

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

async function sha1(message) {
  const encodedMessage = new TextEncoder().encode(message)
  const digest = await crypto.subtle.digest('SHA-1', encodedMessage)
  return toHex(digest)
}

function buildSignaturePayload(params) {
  return Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
}

function isGoogleDriveUrl(videoUrl) {
  return typeof videoUrl === 'string' && videoUrl.includes('drive.google.com')
}

export function isGoogleDriveVideoUrl(videoUrl) {
  return Boolean(getGoogleDriveFileId(videoUrl))
}

export function getGoogleDriveFileId(videoUrl) {
  if (!isGoogleDriveUrl(videoUrl)) return ''

  const fileMatch = videoUrl.match(/\/file\/d\/([^/]+)/i)
  if (fileMatch?.[1]) return fileMatch[1]

  const openMatch = videoUrl.match(/[?&]open=([^&]+)/i)
  if (openMatch?.[1]) return openMatch[1]

  const queryMatch = videoUrl.match(/[?&]id=([^&]+)/i)
  if (queryMatch?.[1]) return queryMatch[1]

  return ''
}

export function getPlayableVideoUrl(videoUrl) {
  const fileId = getGoogleDriveFileId(videoUrl)
  if (fileId) {
    return `https://drive.google.com/uc?export=download&id=${fileId}`
  }

  return videoUrl || ''
}

export function getOpenVideoUrl(videoUrl) {
  const fileId = getGoogleDriveFileId(videoUrl)
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/view`
  }

  return videoUrl || ''
}

export function getGoogleDrivePreviewUrl(videoUrl) {
  const fileId = getGoogleDriveFileId(videoUrl)
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`
  }

  return ''
}

export function getGoogleDriveThumbnailUrl(videoUrl) {
  const fileId = getGoogleDriveFileId(videoUrl)
  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1280`
  }

  return ''
}

async function createCloudinarySignature(params) {
  if (!CLOUDINARY_API_SECRET) {
    throw new Error('Missing VITE_CLOUDINARY_API_SECRET')
  }

  const payload = buildSignaturePayload(params)
  return sha1(`${payload}${CLOUDINARY_API_SECRET}`)
}

export function buildCloudinaryVideoUrl(publicId, options = '') {
  const normalizedOptions = normalizeCloudinaryPathPart(options)
  const normalizedPublicId = normalizeCloudinaryPathPart(publicId)

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${normalizedOptions ? `${normalizedOptions}/` : ''}${normalizedPublicId}`
}

export function getCloudinaryVideoPosterUrl(videoUrl) {
  if (!videoUrl || !videoUrl.includes('/video/upload/')) return ''

  return videoUrl
    .replace('/video/upload/', '/video/upload/so_0/')
    .replace(/\.(mp4|mov|webm)(\?.*)?$/i, '.jpg$2')
}

export async function uploadVideoToCloudinary(file, options = {}) {
  if (!file) {
    throw new Error('Select a video file first')
  }

  if (!CLOUDINARY_API_KEY) {
    throw new Error('Missing VITE_CLOUDINARY_API_KEY')
  }

  const timestamp = Math.floor(Date.now() / 1000).toString()
  const folder = normalizeCloudinaryPathPart(options.folder)
  const publicId = normalizeCloudinaryPathPart(options.publicId)
  const signatureParams = { timestamp }

  if (folder) {
    signatureParams.folder = folder
  }

  if (publicId) {
    signatureParams.public_id = publicId
  }

  const signature = await createCloudinarySignature(signatureParams)
  const formData = new FormData()

  formData.append('file', file)
  formData.append('api_key', CLOUDINARY_API_KEY)
  formData.append('timestamp', timestamp)
  formData.append('signature', signature)

  if (folder) {
    formData.append('folder', folder)
  }

  if (publicId) {
    formData.append('public_id', publicId)
  }

  const response = await fetch(`${getCloudinaryApiBaseUrl()}/video/upload`, {
    method: 'POST',
    body: formData,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.error?.message || 'Cloudinary upload failed')
  }

  return data
}
