// Excluir chaves de uma tabela
export function ExcludeCollums(tabela: any, keys: any) {

  for (let key of keys) {
    delete tabela[key]
  }

  return tabela
}

// Excluir chaves de array de tabelas
export function ExcludeManyCollums(tabela: any, keys: any) {

  tabela.map((table: any) => {

    ExcludeCollums(table, keys)

  })
  return tabela
}

export default { ExcludeCollums, ExcludeManyCollums }