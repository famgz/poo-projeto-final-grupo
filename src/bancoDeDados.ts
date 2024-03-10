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

  listar(): void {
    console.log(this._listaDePessoas);
  }

  buscarPeloNome(nome: string): Pessoa | undefined {
    const pessoa = this._listaDePessoas.find(
      (pessoa) => pessoa.nome.toLowerCase() === nome.toLowerCase()
    );
    if (!pessoa) {
      console.error(`Pessoa ${nome} não encontrada`);
    }
    return pessoa;
  }

  atualizar(pessoa: Pessoa): boolean {
    return true;
  }

  deletar(pessoa: Pessoa): boolean {
    return true;
  }
}
