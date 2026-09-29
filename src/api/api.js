
// o endereço base de onde vão vir todas as nossas informações de memes
const BASE_URL = 'https://justmeme.wtf/api/v1';

// uma função genérica para conferir se a resposta da api veio bonitinha ou com erro
async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok || data.success === false) {
    throw new Error(data.error || `Erro na requisição (status ${res.status})`);
  }
  return data;
}

// busca os memes que estão bombando no momento para a nossa tela de lista
export async function getTrending() {
  const res = await fetch(`${BASE_URL}/trending`);
  const data = await handleResponse(res);
  return data.trending;
}

// busca templates paginados ou filtrados por categoria, caso precise no futuro
export async function getTemplates({ page = 1, limit = 20, category } = {}) {
  const params = new URLSearchParams({ page, limit });
  if (category) params.append('category', category);
  const res = await fetch(`${BASE_URL}/templates?${params.toString()}`);
  return handleResponse(res);
}

// faz a busca no campo de texto por nome de meme (ex: "drake")
export async function searchTemplates(query) {
  const res = await fetch(
    `${BASE_URL}/templates/search?q=${encodeURIComponent(query)}`
  );
  const data = await handleResponse(res);
  return data.templates;
}

// pega os detalhes de um único meme usando a chave amigável (slug) dele
export async function getTemplateBySlug(slug) {
  const res = await fetch(`${BASE_URL}/templates/${slug}`);
  const data = await handleResponse(res);
  return data.template || data;
}

// traz todas as categorias disponíveis na api
export async function getCategories() {
  const res = await fetch(`${BASE_URL}/categories`);
  const data = await handleResponse(res);
  return data.categories;
}

// puxa um meme totalmente aleatório
export async function getRandomTemplate() {
  const res = await fetch(`${BASE_URL}/random`);
  const data = await handleResponse(res);
  return data.template || data;
}