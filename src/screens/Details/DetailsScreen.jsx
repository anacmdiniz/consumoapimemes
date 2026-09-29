import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTemplateBySlug } from '../../api/api';

// base de conhecimento com explicações históricas dos memes clássicos
const KNOWN_TEMPLATES = [
  {
    keywords: ['drake'],
    text: 'Também conhecido como "Drake Hotline Bling", nasceu do clipe de "Hotline Bling" (2015) e virou o formato clássico de recusar uma opção com desdém e aprovar outra com entusiasmo.',
  },
  {
    keywords: ['distracted boyfriend', 'namorado distraido'],
    text: 'Foto de banco de imagens do fotógrafo espanhol Antonio Guillem, tirada em 2015. Começou a circular como meme por volta de 2017 para ilustrar trocas de interesse e tentações.',
  },
  {
    keywords: ['woman yelling at cat', 'mulher gritando com gato'],
    text: 'Combina um still da série "The Real Housewives of Beverly Hills" com a foto de um gato chamado Smudge sentado à mesa. Ficou popular em 2019 como formato de "discussão" entre dois lados.',
  },
  {
    keywords: ['change my mind'],
    text: 'Foto do apresentador Steven Crowder sentado atrás de uma faixa de "Change My Mind", de 2018. Usado para afirmações provocativas que convidam ao debate.',
  },
  {
    keywords: ['two buttons', 'dois botoes'],
    text: 'Tirinha do quadrinista Blue Ollari mostrando um personagem suado escolhendo entre dois botões vermelhos. Representa indecisão diante de duas opções parecidas.',
  },
  {
    keywords: ['is this a pigeon', 'isso e um pombo'],
    text: 'Cena do anime "The Brave Fighter of Sun Fighbird" (1991), redescoberta em 2018. Usado para confundir propositalmente duas coisas completamente diferentes.',
  },
  {
    keywords: ['expanding brain', 'cerebro expandindo'],
    text: 'Sequência de imagens de um cérebro cada vez mais "iluminado", popular desde 2017 para hierarquizar ideias — geralmente de forma irônica, terminando em algo absurdo.',
  },
  {
    keywords: ['surprised pikachu', 'pikachu surpreso'],
    text: 'Still do episódio 28 da primeira temporada do anime Pokémon. Viral desde 2018 para reações de "óbvio que isso ia acontecer".',
  },
  {
    keywords: ['one does not simply', 'nao se simplesmente'],
    text: 'Boromir, personagem de "O Senhor dos Anéis: A Sociedade do Anel" (2001). Um dos memes mais antigos da internet, usado desde meados dos anos 2000.',
  },
  {
    keywords: ['success kid'],
    text: 'Foto de um bebê na praia com o punho cerrado, tirada em 2007. Virou meme pouco depois para celebrar pequenas vitórias do dia a dia.',
  },
  {
    keywords: ['philosoraptor'],
    text: 'Dinossauro desenhado em pose pensativa, popular desde o fim dos anos 2000 para questionamentos filosóficos ou paradoxais.',
  },
  {
    keywords: ['left exit 12', 'saida a esquerda'],
    text: 'Foto de banco de imagens de um motorista fazendo uma curva brusca para pegar uma saída de rodovia. Usada desde 2017 para decisões repentinas e questionáveis.',
  },
  {
    keywords: ['always has been', 'sempre foi'],
    text: 'Ilustração de dois astronautas no espaço, um apontando uma arma para o outro. Popular desde 2018 para revelar uma "verdade" que sempre esteve ali.',
  },
  {
    keywords: ['stonks'],
    text: 'Boneco 3D de banco de imagens vestindo terno, com um gráfico ao fundo. Virou meme em 2017 para ironizar decisões financeiras questionáveis.',
  },
  {
    keywords: ['this is fine'],
    text: 'Tirinha do webcomic "Gunshow", de KC Green (2013). Um cachorro sentado numa sala em chamas dizendo que está tudo bem — símbolo de negação diante do caos.',
  },
  {
    keywords: ['mocking spongebob', 'bob esponja debochado'],
    text: 'Still do episódio "Little Yellow Book" (2012), com a voz de Bob Esponja alternando maiúsculas e minúsculas. Vira meme de deboche desde 2017.',
  },
  {
    keywords: ['roll safe'],
    text: 'Still do vídeo "Hood Documentary" (2016), do ator britânico Kayode Ewumi, tocando na própria têmpora. Representa uma "lógica esperta" (nem sempre válida).',
  },
  {
    keywords: ['batman slapping robin', 'batman dando tapa'],
    text: 'Quadro da revista "World\'s Finest Comics #153" (1965), com Batman dando um tapa em Robin. Um dos memes de quadrinho mais usados desde os anos 2000.',
  },
  {
    keywords: ['ancient aliens', 'aliens antigos'],
    text: 'Still do apresentador Giorgio A. Tsoukalos, do programa "Ancient Aliens". Vira meme em 2013 para explicar qualquer coisa recorrendo a "aliens".',
  },
  {
    keywords: ['trade offer', 'proposta de troca'],
    text: 'Tela do jogo "Yu-Gi-Oh! Forbidden Memories" (1999), popularizada como meme em 2020 para propostas de troca exageradamente desequilibradas.',
  },
  {
    keywords: ['epic handshake', 'aperto de mao epico'],
    text: 'Ilustração de dois braços musculosos apertando as mãos, usada para destacar um ponto em comum inesperado entre dois grupos diferentes.',
  },
  {
    keywords: ['disaster girl', 'menina do desastre'],
    text: 'Foto de 2005 de uma menina sorrindo em frente a uma casa em chamas. Um dos memes fotográficos mais antigos e duradouros da internet.',
  },
  {
    keywords: ['hide the pain harold', 'harold escondendo a dor'],
    text: 'Foto de banco de imagens do modelo húngaro András Arató, sorrindo de forma forçada. Viral desde 2011 como símbolo de sofrimento disfarçado.',
  },
  {
    keywords: ['gru\'s plan', 'plano do gru'],
    text: 'Quadros do filme "Meu Malvado Favorito 3" (2017), usados para ironizar planos cujo próprio criador esquece uma etapa essencial — e ela dá errado.',
  },
  {
    keywords: ['spiderman pointing', 'homem aranha apontando'],
    text: 'Cena do desenho animado "Spider-Man" (1967), com dois Homens-Aranha se apontando. Popularizado como meme a partir de 2011.',
  },
  {
    keywords: ['they\'re the same picture', 'mesma foto'],
    text: 'Still da série "The Office", com a personagem Pam segurando dois cartazes idênticos. Usado quando duas coisas "diferentes" são, na prática, iguais.',
  },
  {
    keywords: ['tuxedo winnie', 'ursinho pooh de terno'],
    text: 'Ilustração do Ursinho Pooh em versão "chique" de smoking ao lado da versão comum, contrastando uma abordagem simples com uma sofisticada.',
  },
  {
    keywords: ['monkey puppet', 'fantoche de macaco'],
    text: 'Still de um vídeo de 2016 com um fantoche de macaco olhando de lado. Usado para expressar constrangimento ao presenciar algo estranho.',
  },
];

// limpa e normaliza os textos para facilitar a comparação sem acentos ou caracteres especiais
function normalize(str = '') {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

// dicionário para dar contexto dinâmico às categorias encontradas
const CATEGORY_FLAVORS = {
  reaction: 'costuma aparecer em respostas rápidas, para expressar surpresa, ironia ou deboche',
  reactions: 'costuma aparecer em respostas rápidas, para expressar surpresa, ironia ou deboche',
  comparison: 'é usado para comparar duas ideias, escolhas ou situações opostas',
  animals: 'ganhou popularidade por causa da expressão do animal na imagem original',
  cartoon: 'vem de um desenho animado e acabou virando um formato reaproveitado à exaustão',
  politics: 'circula bastante em discussões e piadas sobre política e atualidades',
  gaming: 'nasceu dentro da cultura dos jogos e é usado por jogadores em situações do dia a dia',
  wholesome: 'é usado em contexts mais leves e positivos, sem a ironia pesada de outros formatos',
  sad: 'costuma acompanhar piadas autodepreciativas ou sobre pequenas decepções do cotidiano',
};

// constrói uma descrição alternativa inteligente caso o meme não esteja na nossa lista manual
function buildFallbackDescription(name, categories) {
  const catList = Array.isArray(categories) ? categories : [];
  const matchedFlavor = catList
    .map((c) => CATEGORY_FLAVORS[normalize(c).replace(/\s+/g, '')])
    .find(Boolean);

  const catText = catList.length
    ? `Costuma ser classificado em ${catList.join(', ')}${
        matchedFlavor ? ` e ${matchedFlavor}` : ''
      }.`
    : 'Ainda não tem categorias catalogadas, mas segue circulando entre os templates mais usados.';

  return `"${name}" é um dos formatos que passam de mão em mão pela internet, remixado por diferentes comunidades. ${catText} A origem exata não está documentada por aqui — mas é isso que dá liberdade para reinventar o formato.`;
}

// escolhe a melhor explicação para o meme selecionado
function getDescription(template) {
  if (!template) return '';
  const normalizedName = normalize(template.name || template.slug || '');
  const found = KNOWN_TEMPLATES.find((entry) =>
    entry.keywords.some((kw) => normalizedName.includes(normalize(kw)))
  );
  if (found) return found.text;
  return buildFallbackDescription(template.name || template.slug, template.categories);
}

export default function DetailsScreen({ route }) {
  // recebe a chave 'slug' enviada pela rota de navegação
  const { slug } = route.params;
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // faz a busca dos detalhes específicos deste meme ao abrir a tela
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getTemplateBySlug(slug);
        if (mounted) setTemplate(data);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [slug]);

  // memoriza o texto de descrição para não reprocessar a cada renderização
  const description = useMemo(() => getDescription(template), [template]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>Erro: {error}</Text>
      </SafeAreaView>
    );
  }

  const categories =
    template.categories && template.categories.length > 0 ? template.categories : [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* imagem do meme em destaque */}
        <View style={styles.imageWrap}>
          <Image source={{ uri: template.url }} style={styles.image} />
        </View>

        {/* título do meme */}
        <Text style={styles.title}>{template.name}</Text>

        {/* chips de categorias */}
        {categories.length > 0 && (
          <View style={styles.chipRow}>
            {categories.map((cat) => (
              <View key={cat} style={styles.chip}>
                <Text style={styles.chipText}>{cat}</Text>
              </View>
            ))}
          </View>
        )}

        {/* cartão com a história / contexto do meme */}
        <View style={styles.descCard}>
          <Text style={styles.descLabel}>SOBRE ESSE TEMPLATE</Text>
          <Text style={styles.descText}>{description}</Text>
        </View>

        {/* cartão técnico com metadados recebidos da api */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ID</Text>
            <Text style={styles.infoValue}>{template.id}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Slug</Text>
            <Text style={styles.infoValue}>{template.slug}</Text>
          </View>

          {template.width && template.height && (
            <View style={[styles.infoRow, styles.infoRowLast]}>
              <Text style={styles.infoLabel}>Dimensões</Text>
              <Text style={styles.infoValue}>
                {template.width} x {template.height}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const COLORS = {
  bg: '#FAF6EE',
  card: '#FFFFFF',
  cardAlt: '#F3ECDC',
  border: '#E7DFCE',
  ink: '#231F18',
  inkSoft: '#726B5C',
  accent: '#D9542B',
  accentSoft: '#F2D9C8',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  imageWrap: {
    borderRadius: 18,
    backgroundColor: COLORS.cardAlt,
    padding: 6,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 13,
    backgroundColor: COLORS.cardAlt,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.ink,
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 18,
  },
  chip: {
    backgroundColor: COLORS.accentSoft,
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'lowercase',
  },
  descCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  descLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.inkSoft,
    letterSpacing: 1.1,
    marginBottom: 8,
  },
  descText: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.ink,
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoRowLast: {
    borderBottomWidth: 0,
  },
  infoLabel: {
    color: COLORS.inkSoft,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  infoValue: {
    color: COLORS.ink,
    fontSize: 14,
    fontWeight: '700',
    flexShrink: 1,
    textAlign: 'right',
  },
  center: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: '#B23B2E',
  },
});