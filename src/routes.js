// ---------------------------------------------------------
// Importação das dependências
// ---------------------------------------------------------

// Importa as funções de definição de navegação
// da aplicação
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

// Importa a página/tela principal
import Main from '~/pages/Main';

// Define as rotas da aplicação
// Com apenas a tela principal
const Routes = createAppContainer(createSwitchNavigator({ Main }));

// Exporta a definição das rotas
export default Routes;
