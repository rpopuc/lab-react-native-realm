// ---------------------------------------------------------
// Importação das dependências
// ---------------------------------------------------------

// Importa o React
import React from 'react';

// Importa o componente de desenho de ícones FontAwesome
import Icon from 'react-native-vector-icons/FontAwesome';

// Importa os componentes estilizados
// para uso da página/tela/interface
import {
  Container, Name, Description, Stats, Stat, StatCount,
  Refresh, RefreshText,
} from './styles';

// ---------------------------------------------------------
// Definição da exibição componente
// ---------------------------------------------------------

// eslint-disable-next-line react/prop-types
export default function Main({ data, onRefresh }) {
  // Retorna a estrura da interface da página/tela
  return (
    // Invólucro da área de exibição da tela
    <Container>
      {/* Exibição do nome */}
      <Name>{data.name}</Name>

      {/* Exibição da descrição */}
      <Description>{data.description}</Description>

      {/* Invólucro para exibição dos status */}
      <Stats>
        {/* Status das estrelas do repositório */}
        <Stat>
          <Icon name="star" size={16} color="#333" />
          <StatCount>{data.stars}</StatCount>
        </Stat>

        {/* Status dos forks do repositório */}
        <Stat>
          <Icon name="code-fork" size={16} color="#333" />
          <StatCount>{data.forks}</StatCount>
        </Stat>
      </Stats>

      {/* Botão de ação para atualização dos dados do repositório */}
      {/* Com definição de execução de onRefresh quando acionado (via onPress) pelo usuário */}
      <Refresh onPress={onRefresh}>
        <Icon name="refresh" color="#7159c1" size={16} />
        <RefreshText>ATUALIZAR</RefreshText>
      </Refresh>
    </Container>
  );
}
