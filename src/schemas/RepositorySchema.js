// ---------------------------------------------------------
// Definição da estrutura de repositório
// que é armazenada em Realm
// ---------------------------------------------------------

export default class RepositorySchema {
  static schema = {
    // A estrutura tem um nome
    name: 'Repository',

    // A estrutura tem uma chave primária
    primaryKey: 'id',

    // A estrutura tem a definição
    // de seus dados
    properties: {
      id: { type: 'int', indexed: true },
      name: 'string',
      fullName: 'string',
      description: 'string',
      stars: 'int',
      forks: 'int',
    },
  }
}
