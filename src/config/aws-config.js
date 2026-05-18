// ============================================================
// AWS Cognito Configuration
// Reads from Vite environment variables (VITE_ prefix).
//
// Local dev: set values in .env
// Production: set in Vercel → Project Settings → Environment Variables
//
// Required variables:
//   VITE_AWS_REGION
//   VITE_COGNITO_USER_POOL_ID
//   VITE_COGNITO_CLIENT_ID          ← matches Vercel env var name
//   VITE_API_BASE_URL
// ============================================================

const region         = import.meta.env.VITE_AWS_REGION;
const userPoolId     = import.meta.env.VITE_COGNITO_USER_POOL_ID;
const userPoolClientId = import.meta.env.VITE_COGNITO_CLIENT_ID;   // ← KEY FIX
const apiBaseUrl     = import.meta.env.VITE_API_BASE_URL;

// ── Hard guard: fail loudly if any required var is missing ──
const missing = [];
if (!region)           missing.push('VITE_AWS_REGION');
if (!userPoolId)       missing.push('VITE_COGNITO_USER_POOL_ID');
if (!userPoolClientId) missing.push('VITE_COGNITO_CLIENT_ID');
if (!apiBaseUrl)       missing.push('VITE_API_BASE_URL');

if (missing.length > 0) {
  const msg = `[aws-config] Missing required environment variables:\n  ${missing.join('\n  ')}\n\nSet them in .env (local) or Vercel → Project Settings → Environment Variables.`;
  console.error(msg);
  // Throw in dev so engineers see it immediately; warn silently in prod
  if (import.meta.env.DEV) throw new Error(msg);
}

const awsConfig = {
  region,
  userPoolId,
  userPoolClientId,
  apiBaseUrl,

  // Cognito Groups — must match the exact group names in your User Pool
  groups: {
    ADMIN:     'Admin',
    TEACHER:   'Teacher',
    SCHEDULER: 'Scheduler',
    STUDENT:   'Student',
  },
};

export default awsConfig;
