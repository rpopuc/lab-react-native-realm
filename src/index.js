// ---------------------------------------------------------
// Importação das dependências
// ---------------------------------------------------------

// Importação de React
import React from 'react';

// Importa o objeto de manipulação da StatusBar
import { StatusBar } from 'react-native';

// Obtém as configurações para uso do Reactotron
import '~/config/ReactotronConfig';

// Importa a definição das rotas (e telas)
// da aplicação
import Routes from '~/routes';

// Define a função de criação da aplicação
// e sua estrutura básica
const App = () => (
  <>
    {/* Define a exibição da status bar */}
    <StatusBar
      // Fundo transparente
      backgroundColor="transparent"
      translucent

      // Estilo do texto
      barStyle="light-content"
    />

    {/* Estrutura de rotas e telas da aplicação */}
    <Routes />
  </>
);

export default App;
