// API client for frontend → backend communication
// Automatically attaches auth token from localStorage

function getToken() {
  if (typeof window === 'undefined') return null;
  try {
    const session = JSON.parse(localStorage.getItem('we_session') || 'null');
    return session?.access_token || null;
  } catch {
    return null;
  }
}

async function refreshSession() {
  if (typeof window === 'undefined') return null;
  try {
    const session = JSON.parse(localStorage.getItem('we_session') || 'null');
    if (!session?.refresh_token) return null;

    const res = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: session.refresh_token }),
    });

    if (!res.ok) return null;

    const newSession = await res.json();
    localStorage.setItem('we_session', JSON.stringify(newSession));
    return newSession.access_token;
  } catch {
    return null;
  }
}

async function apiFetch(url, options = {}, _retried = false) {
  const token = getToken();
  const headers = { ...options.headers };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401 && !_retried) {
    // Token expired — try refreshing
    const newToken = await refreshSession();
    if (newToken) {
      return apiFetch(url, options, true);
    }
    // Refresh failed — clear session
    if (typeof window !== 'undefined') {
      localStorage.removeItem('we_session');
    }
    throw new Error('Unauthorized');
  }

  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('we_session');
    }
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Request failed');
  }

  return res.json();
}

// ── Public API ──
export const api = {
  // Projects
  getProjects: () => apiFetch('/api/projects'),
  getProject: (id) => apiFetch(`/api/projects/${id}`),
  createProject: (data) => apiFetch('/api/projects', { method: 'POST', body: JSON.stringify(data) }),
  updateProject: (id, data) => apiFetch(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProject: (id) => apiFetch(`/api/projects/${id}`, { method: 'DELETE' }),

  // Clients
  getClients: () => apiFetch('/api/clients'),
  createClient: (data) => apiFetch('/api/clients', { method: 'POST', body: JSON.stringify(data) }),
  updateClient: (id, data) => apiFetch(`/api/clients/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteClient: (id) => apiFetch(`/api/clients/${id}`, { method: 'DELETE' }),

  // Categories
  getCategories: () => apiFetch('/api/categories'),
  createCategory: (data) => apiFetch('/api/categories', { method: 'POST', body: JSON.stringify(data) }),
  deleteCategory: (id) => apiFetch(`/api/categories/${id}`, { method: 'DELETE' }),

  // Upload
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiFetch('/api/upload', { method: 'POST', body: formData });
  },

  // Jobs
  getJobs: () => apiFetch('/api/jobs'),
  getJob: (id) => apiFetch(`/api/jobs/${id}`),
  createJob: (data) => apiFetch('/api/jobs', { method: 'POST', body: JSON.stringify(data) }),
  updateJob: (id, data) => apiFetch(`/api/jobs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteJob: (id) => apiFetch(`/api/jobs/${id}`, { method: 'DELETE' }),

  // Contact
  sendContact: (data) => apiFetch('/api/contact', { method: 'POST', body: JSON.stringify(data) }),

  // Auth
  login: async (email, password) => {
    const res = await apiFetch('/api/auth/callback', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('we_session', JSON.stringify(res));
    }
    return res;
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('we_session');
    }
  },

  getSession: () => {
    if (typeof window === 'undefined') return null;
    try {
      const session = JSON.parse(localStorage.getItem('we_session') || 'null');
      if (!session) return null;
      // Check if expired
      if (session.expires_at && Date.now() / 1000 > session.expires_at) {
        localStorage.removeItem('we_session');
        return null;
      }
      return session;
    } catch {
      return null;
    }
  },
};
