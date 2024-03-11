import { Pessoa } from './pessoa';

export class BancoDeDados {
  private _listaDePessoas: Pessoa[];

  constructor() {
    this._listaDePessoas = [];
  }

  adicionar(pessoa: Pessoa): boolean {
    const pessoaExiste = this._listaDePessoas.find(
      (p) => p.nome.toLowerCase() === pessoa.nome.toLowerCase()
    );
    if (pessoaExiste) {
      console.error(`${pessoa} já existe`);
      return false;
    }
    this._listaDePessoas.push(pessoa);
    console.log(`Pessoa ${pessoa.nome} adicionada com sucesso!`);
    return true;
  }

  listar(){
    console.log(
    `Pessoas cadastradas:
    ${this._listaDePessoas}`);
  }

  buscarPeloNome(nome: string): Pessoa | undefined {
    const pessoa = this._listaDePessoas.find(
      (alvo) => alvo.nome.toLowerCase() === nome.toLowerCase()
    );
    if (!pessoa) {
      throw Error(`\nPessoa ${nome} não encontrada`);
    }
    console.log(`\nEncontrado pessoa com nome ${nome}. Imprimindo dados do cadastro..:`);
    
    return pessoa;
  }

  atualizar(pessoa: Pessoa): boolean {
    return true;
  }

  deletar(pessoa: Pessoa): boolean {
    return true;
  }


}
