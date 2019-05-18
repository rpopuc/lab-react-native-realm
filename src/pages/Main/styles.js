// ---------------------------------------------------------
// Importação das dependências dos componentes de estilo
// ---------------------------------------------------------

// Importa a classe que contém os componentes básicos de estilo
import styled from 'styled-components/native';

// Importa o componente de desenho de gradiente de cores
import LinearGradient from 'react-native-linear-gradient';

// Obtém função de cálculo da altura da Statusbar
// Retorna valor apenas em dispositivos iOS
import { getStatusBarHeight } from 'react-native-status-bar-height';

// ---------------------------------------------------------
// Definição dos componetes de estilo
// ---------------------------------------------------------

export const Container = styled(LinearGradient).attrs({
  colors: ['#7159c1', '#9b49c1'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  flex: 1;
  padding-top: ${30 + getStatusBarHeight(true)}px;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: #FFF;
  font-weight: bold;
  padding: 0 20px;
`;

export const Form = styled.View`
  flex-direction: row;
  margin-top: 10px;
  padding: 0 20px;
`;

export const Input = styled.TextInput.attrs({
  placeHolderTextColor: '#999',
})`
  flex: 1;
  padding: 12px 15px;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  background: #FFF;
  border: 2px solid ${props => (props.error ? '#FF7272' : '#FFF')};
`;

export const Submit = styled.TouchableOpacity`
  background: #6bd4c1;
  margin-left: 10px;
  justify-content: center;
  border-radius: 4px;
  padding: 0 14px;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: { paddingHorizontal: 20 },
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;
