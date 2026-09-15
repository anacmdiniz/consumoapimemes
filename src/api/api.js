const BASE_URL = 'https://justmeme.wtf/api/v1';

async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok || data.success === false) {
    throw new Error(data.error || `Erro na requisição (status ${res.status})`);
  }
  return data;
}

export async function getTrending() {
  const res = await fetch(`${BASE_URL}/trending`);
  const data = await handleResponse(res);
  return data.trending;
}

export async function getTemplates({ page = 1, limit = 20, category } = {}) {
  const params = new URLSearchParams({ page, limit });
  if (category) params.append('category', category);
  const res = await fetch(`${BASE_URL}/templates?${params.toString()}`);
  return handleResponse(res);
}

export async function searchTemplates(query) {
  const res = await fetch(
    `${BASE_URL}/templates/search?q=${encodeURIComponent(query)}`
  );
  const data = await handleResponse(res);
  return data.templates;
}

export async function getTemplateBySlug(slug) {
  const res = await fetch(`${BASE_URL}/templates/${slug}`);
  const data = await handleResponse(res);
  return data.template || data;
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/categories`);
  const data = await handleResponse(res);
  return data.categories;
}

export async function getRandomTemplate() {
  const res = await fetch(`${BASE_URL}/random`);
  const data = await handleResponse(res);
  return data.template || data;
}