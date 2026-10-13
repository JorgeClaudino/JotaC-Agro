import { useState, useEffect } from 'react';
import { NewsArticle, Commodity, WeatherData, AgroTip } from '../types';

// NOTA: As URLs foram alteradas para links diretos de imagens para garantir
// o carregamento consistente, resolvendo o problema de imagens que não apareciam.
const mockNews: NewsArticle[] = [
  { id: 1, title: "Colheita de Soja em Mato Grosso Atinge 80%", summary: "Condições climáticas favoráveis aceleraram a colheita da soja, com produtores otimistas sobre a produtividade.", source: "Notícias Agrícolas", category: "Colheita", imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38AD449?auto=format&fit=crop&w=800&q=60", url: "https://www.noticiasagricolas.com.br" },
  { id: 2, title: "Preços do Café Disparam nos Mercados Internacionais", summary: "Preocupações com a oferta de regiões-chave levaram os futuros do café arábica a uma alta de seis meses.", source: "Canal Rural", category: "Mercados", imageUrl: "https://images.unsplash.com/photo-1554106132-99a207b22d51?auto=format&fit=crop&w=800&q=60", url: "https://www.canalrural.com.br" },
  { id: 3, title: "Embrapa Anuncia Nova Variedade de Milho Resistente à Seca", summary: "O novo híbrido promete maior estabilidade e produtividade para agricultores em regiões semiáridas.", source: "Embrapa", category: "Tecnologia", imageUrl: "https://images.unsplash.com/photo-1587321551348-7353961b38f9?auto=format&fit=crop&w=800&q=60", url: "https://www.embrapa.br" },
  { id: 4, title: "Regulamentações da UE Impactam Exportações de Gado Brasileiro", summary: "Novos requisitos de rastreabilidade ambiental trazem desafios e oportunidades para a indústria de carne bovina brasileira.", source: "Agro Estadão", category: "Política", imageUrl: "https://images.unsplash.com/photo-1589929833502-8084f7b2a592?auto=format&fit=crop&w=800&q=60", url: "https://agro.estadao.com.br/" },
  { id: 5, title: "Inovação em Fertilizantes Aumenta a Produtividade do Algodão", summary: "Estudo da Embrapa mostra que novas formulações de fertilizantes de liberação lenta podem aumentar a produtividade em até 15%.", source: "Globo Rural", category: "Inovação", imageUrl: "https://images.unsplash.com/photo-1619101733443-1e4d8e5c3a5a?auto=format&fit=crop&w=800&q=60", url: "https://revistagloborural.globo.com/" },
  { id: 6, title: "USDA Eleva Previsão para a Safra de Grãos dos EUA", summary: "O Departamento de Agricultura dos EUA surpreendeu o mercado com uma previsão otimista para a safra de milho e soja.", source: "Farm Progress", category: "Mercados", imageUrl: "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=800&q=60", url: "https://www.agweb.com" },
  { id: 7, title: "Agricultura Digital: Drones Monitoram Saúde da Lavouras na Bahia", summary: "Produtores de frutas estão adotando drones com sensores multiespectrais para detectar pragas e estresse hídrico precocemente.", source: "The AgriBiz", category: "Tecnologia", imageUrl: "https://images.unsplash.com/photo-1616957434935-f5a7c13de55a?auto=format&fit=crop&w=800&q=60", url: "https://www.theagribiz.com.br" },
  { id: 8, title: "Crédito Rural: Governo Anuncia R$ 5 Bilhões para Pequenos Produtores", summary: "O novo plano de crédito visa apoiar a agricultura familiar com juros mais baixos e melhores condições de pagamento.", source: "MAPA", category: "Política", imageUrl: "https://images.unsplash.com/photo-1541848566-2246799c8555?auto=format&fit=crop&w=800&q=60", url: "https://www.gov.br/agricultura" },
];

const mockCommodities: Commodity[] = [
  { id: 'soybean', name: "Soja", price: 54.50, change: 1.25, unit: "USD/Saca", history: [{ name: 'D-4', value: 53.2 }, { name: 'D-3', value: 53.8 }, { name: 'D-2', value: 53.5 }, { name: 'D-1', value: 54.1 }, { name: 'Hoje', value: 54.5 }] },
  { id: 'corn', name: "Milho", price: 25.30, change: -0.45, unit: "USD/Saca", history: [{ name: 'D-4', value: 25.9 }, { name: 'D-3', value: 25.7 }, { name: 'D-2', value: 25.8 }, { name: 'D-1', value: 25.75 }, { name: 'Hoje', value: 25.3 }] },
  { id: 'coffee', name: "Café", price: 220.80, change: 5.60, unit: "USD/Saca", history: [{ name: 'D-4', value: 210.1 }, { name: 'D-3', value: 212.5 }, { name: 'D-2', value: 215.2 }, { name: 'D-1', value: 215.2 }, { name: 'Hoje', value: 220.8 }] },
  { id: 'cattle', name: "Boi Gordo", price: 285.00, change: 2.10, unit: "BRL/@", history: [{ name: 'D-4', value: 280.5 }, { name: 'D-3', value: 281.0 }, { name: 'D-2', value: 282.9 }, { name: 'D-1', value: 282.9 }, { name: 'Hoje', value: 285.0 }] },
];

const mockWeather: WeatherData[] = [
  { id: 'rs', region: "Rio Grande do Sul", temperature: 19, condition: 'Rainy', humidity: 90, windSpeed: 25, forecast: [{ day: 'Seg', temp: 18, condition: 'Rainy' }, { day: 'Ter', temp: 20, condition: 'Cloudy' }, { day: 'Qua', temp: 22, condition: 'Sunny' }, { day: 'Qui', temp: 21, condition: 'Sunny' }, { day: 'Sex', temp: 19, condition: 'Cloudy' }] },
  { id: 'go', region: "Goiás", temperature: 31, condition: 'Sunny', humidity: 40, windSpeed: 12, forecast: [{ day: 'Seg', temp: 32, condition: 'Sunny' }, { day: 'Ter', temp: 33, condition: 'Sunny' }, { day: 'Qua', temp: 31, condition: 'Cloudy' }, { day: 'Qui', temp: 30, condition: 'Sunny' }, { day: 'Sex', temp: 32, condition: 'Sunny' }] },
  { id: 'ba', region: "Bahia (Oeste)", temperature: 33, condition: 'Cloudy', humidity: 65, windSpeed: 15, forecast: [{ day: 'Seg', temp: 34, condition: 'Cloudy' }, { day: 'Ter', temp: 32, condition: 'Rainy' }, { day: 'Qua', temp: 31, condition: 'Stormy' }, { day: 'Qui', temp: 33, condition: 'Cloudy' }, { day: 'Sex', temp: 34, condition: 'Sunny' }] },
  { id: 'sp_rp', region: "Ribeirão Preto (SP)", temperature: 28, condition: 'Sunny', humidity: 55, windSpeed: 10, forecast: [{ day: 'Seg', temp: 29, condition: 'Sunny' }, { day: 'Ter', temp: 30, condition: 'Sunny' }, { day: 'Qua', temp: 28, condition: 'Cloudy' }, { day: 'Qui', temp: 27, condition: 'Rainy' }, { day: 'Sex', temp: 28, condition: 'Sunny' }] },
];

const mockTips: AgroTip[] = [
    { id: 1, title: "Manejo Integrado de Pragas (MIP)", content: "Adote estratégias de MIP para reduzir a dependência de pesticidas, protegendo o meio ambiente e seu lucro.", crop: "Geral" },
    { id: 2, title: "Análise e Saúde do Solo", content: "Analise seu solo regularmente para verificar os níveis de nutrientes e pH, otimizando a aplicação de fertilizantes.", crop: "Geral" },
    { id: 3, title: "Controle da Ferrugem Asiática na Soja", content: "Monitore a lavoura constantemente e utilize fungicidas de forma preventiva em épocas de alta umidade e temperaturas amenas.", crop: "Soja" },
    { id: 4, title: "Adubação de Cobertura no Milho", content: "Realize a adubação nitrogenada de cobertura no estágio V4-V6 para garantir o máximo potencial produtivo dos grãos.", crop: "Milho" },
    { id: 5, title: "Poda Ideal do Café", content: "Pode os cafeeiros após a colheita para incentivar novo crescimento e melhorar a circulação de ar, reduzindo o risco de doenças.", crop: "Café" },
    { id: 6, title: "Época Certa para Colheita da Cana", content: "Monitore o teor de ATR (Açúcares Totais Recuperáveis) para definir o ponto ideal de colheita, maximizando a produção de açúcar.", crop: "Cana-de-Açúcar" },
];

export const useMockData = () => {
  const [data, setData] = useState({
    news: [] as NewsArticle[],
    commodities: [] as Commodity[],
    weather: [] as WeatherData[],
    tips: [] as AgroTip[],
    loading: true,
  });

  useEffect(() => {
    const loadData = () => {
      // Tenta obter a localização do usuário
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocationWeather: WeatherData = {
              id: 'user_location',
              region: "Sua Localização",
              temperature: 26, // Dado de exemplo
              condition: 'Sunny', // Dado de exemplo
              humidity: 60,
              windSpeed: 12,
              forecast: [
                { day: 'Seg', temp: 27, condition: 'Sunny' },
                { day: 'Ter', temp: 28, condition: 'Cloudy' },
                { day: 'Qua', temp: 26, condition: 'Sunny' },
                { day: 'Qui', temp: 25, condition: 'Rainy' },
                { day: 'Sex', temp: 27, condition: 'Cloudy' }
              ]
            };
            setData({
              news: mockNews,
              commodities: mockCommodities,
              weather: [userLocationWeather, ...mockWeather],
              tips: mockTips,
              loading: false,
            });
          },
          (error) => {
            console.warn("Não foi possível obter a geolocalização. Mostrando regiões padrão.", error);
            // Se falhar, carrega os dados sem a localização do usuário
            setData({
              news: mockNews,
              commodities: mockCommodities,
              weather: mockWeather,
              tips: mockTips,
              loading: false,
            });
          }
        );
      } else {
        console.warn("Geolocalização não é suportada por este navegador.");
        setData({
          news: mockNews,
          commodities: mockCommodities,
          weather: mockWeather,
          tips: mockTips,
          loading: false,
        });
      }
    };

    // Simulate API call delay
    const timer = setTimeout(loadData, 500);

    return () => clearTimeout(timer);
  }, []);

  return data;
};