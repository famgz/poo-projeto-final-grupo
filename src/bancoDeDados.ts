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
    return true;
  }

  listar(): void {
    console.log(this._listaDePessoas);
  }

  buscarPeloNome(nome: string): Pessoa {
    return this._listaDePessoas[0];
  }

  atualizar(pessoa: Pessoa): boolean {
    return true;
  }

  deletar(pessoa: Pessoa): boolean {
    return true;
  }
}
