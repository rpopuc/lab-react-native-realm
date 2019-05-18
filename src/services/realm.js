// ---------------------------------------------------------
// Importação das dependências
// ---------------------------------------------------------

// Importa a classe de conexão com o Realm
import Realm from 'realm';

// Importa a definição da estrutura de Repository
// que será armazenada em Realm
import RepositorySchema from '~/schemas/RepositorySchema';

// ---------------------------------------------------------
// Definição da função de criação da conexão
// com Realm
// ---------------------------------------------------------

export default function getRealm() {
  // Abre a conexão com Realm
  return Realm.open({
    // A aplicação utilizará apenas
    // a estrutura de Repository
    schema: [RepositorySchema],
  });
}
