// ---------------------------------------------------------
// Importação das dependências
// ---------------------------------------------------------

// Importa a classe de manipulação de chamadas
// via protocolo http
import axios from 'axios';

// ---------------------------------------------------------
// Definição da função
// ---------------------------------------------------------

// Define a função de criação
// do objeto de manipulação de chamadas http
const api = axios.create({
  // URL base que da API que o objeto fará acesso
  baseURL: 'https://api.github.com',
});

// Exporta a função de criação
export default api;
