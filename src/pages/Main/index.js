// ---------------------------------------------------------
// Importação das dependências do componente de tela
// ---------------------------------------------------------

// Importa o React, a função de definição de estado e
// o hook de alteração do estado do React
import React, { useState, useEffect } from 'react';

// Importa a classe de manipulação do teclado
import { Keyboard } from 'react-native';

// Importa o componente de desenho de ícones Material Design
import Icon from 'react-native-vector-icons/MaterialIcons';

// Importa a função de acesso a api do github
import api from '~/services/api';

// Importa a função de criação da conexão com o Realm
import getRealm from '~/services/realm';

// Importa o componente de exibição de um repositório
import Repository from '~/components/Repository';

// Carrega os componentes estilizados
// a partir do arquivo ./styles.js
import {
  Container, Title, Form, Input, Submit, List,
} from './styles';

// ---------------------------------------------------------
// Definição do componente de exibição de tela
// ---------------------------------------------------------

// Tela principal da aplicação
export default function Main() {
  // Estado para armazenamento da entrada de dados
  const [input, setInput] = useState('');

  // Estado para definição de existência de erros
  const [error, setError] = useState(false);

  // Estado para armazenamento dos repositórios
  // Que serão exibidos na listagem
  const [repositories, setRepositories] = useState([]);

  // Salva os dados do repositório na base de dados
  async function saveRepository(repository) {
    // Converte os dados obtidos através da api do Github
    // Para o esquema de dados definido para Repository
    // em ~/schemas/RepositorySchema.js
    const data = {
      id: repository.id,
      name: repository.name,
      fullName: repository.full_name,
      description: repository.description,
      stars: repository.stargazers_count,
      forks: repository.forks_count,
    };

    // Obtém a conexão com Realm
    const realm = await getRealm();

    // Abre uma sessão de escrita em Realm
    realm.write(() => {
      // Registra os dados do repositório
      // Efetuando uma alteração, caso o registro já exista
      // conforme especificado no terceiro parâmetro: modified
      realm.create('Repository', data, 'modified');
    });

    // Retorna os dados registrados
    // Para atualização do estado interno da aplicação
    // (em repositories)
    return data;
  }

  // Trata a requisição de adição de um repositório
  async function handleAddRepository() {
    try {
      // Obtém os dados atualizados do repositório
      // indicado no input pelo usuário
      const response = await api.get(`/repos/${input}`);

      // Salva os dados no repositório
      await saveRepository(response.data);

      // Limpa a entrada de dados
      setInput('');

      // Indica a ausência de erros
      setError(false);

      // Oculta teclado
      Keyboard.dismiss();
    } catch (err) {
      // Indica a existência de erros
      setError(true);
    }
  }

  // React Hook executado apenas uma vez, no momento
  // em que o estado do componente é um array vazio [].
  useEffect(() => {
    async function loadRepositories() {
      // Obtém a instância de conexão com o Realm
      const realm = await getRealm();

      // Obtém os dados, ordenados pela quantidade de estrelas
      // Os dados são obtitidos da coleção 'Repository'
      const data = realm.objects('Repository').sorted('stars', true);

      // Define os repositórios locais (para exibição da lista)
      // com os dados obtidos do Realm
      setRepositories(data);
    }

    // Executa o carregamento dos repositórios
    loadRepositories();
  }, []);

  // Trata a solicitação de atualização dos dados
  // de um determinado repositório
  async function handleRefreshRepository(repository) {
    // Obtém os dados atualizados do repositório
    // através de uma consulta à api do github
    const response = await api.get(`/repos/${repository.fullName}`);

    // Armazena os dados atualizados na base de dados
    // e obtém os dados no formato de ~/schemas/RepositorySchema.js
    const data = await saveRepository(response.data);

    // Modifica o estado de repositories
    // atualizando apenas o repositório recém modificado
    // Para os demais, mantém os dados atuais
    setRepositories(repositories.map(repo => (repo.id === data.id ? data : repo)));
  }

  // Retorna a estrura da interface da página/tela
  return (
    // Invólucro da área de exibição da tela
    <Container>
      {/* Título */}
      <Title>Repositórios</Title>

      {/* Formulário */}
      <Form>
        {/* Campo de entrada de adição de repositório */}
        <Input
          // Indica que o campo não precisa ter a primeira letra em maiúscula
          autoCaptalize="none"

          // Repassa para o componente a existência ou não de erro
          autoCorrect={false}

          // Repassa para o componente a existência ou não de erro
          error={error}

          // Texto de ajuda de preenchimento
          placeHolder="Procurar um repositório..."

          // Valor de entrada
          value={input}

          // Método chamado a cada alteração na entrada
          onChangeText={setInput}
        />

        {/* Botão de ação, associado ao método de tratamento de entrada */}
        <Submit onPress={handleAddRepository}>
          {/* Ícone do botão */}
          <Icon name="add" size={22} color="#FFF" />
        </Submit>
      </Form>

      {/* Lista dos repositórios registrados */}
      <List
        // Indicação de que o teclado deve ser ocultado quando
        // a lista for manipulada pelo usuário
        keyboardShouldPersistTaps="handled"

        // Dados a serem listados
        data={repositories}

        // Método de obtenção do identificador
        // único de cada item da lista
        keyExtractor={item => String(item.id)}

        // Método de desenho de cada item da lista
        renderItem={({ item }) => (
          // Desenha o componente Repository
          // e associa o método handleRefreshRepository para o
          // evento onRefresh
          <Repository data={item} onRefresh={() => handleRefreshRepository(item)} />
        )}
      />
    </Container>
  );
}
