import { Pessoa } from './pessoa';

export class BancoDeDados {
  private _listaDePessoas: Pessoa[];

  constructor() {
    this._listaDePessoas = [];
  }

  get qtdePessoas(): number {
    return this._listaDePessoas.length;
  }

  private _buscarPeloNome(nome: string): Pessoa | undefined {
    return this._listaDePessoas.find(
      (alvo) => alvo.nome.toLowerCase() === nome.toLowerCase()
    );
  }

  private _obterIndicePessoa(pessoa: Pessoa): number {
    const index = this._listaDePessoas.indexOf(pessoa);
    if (index === -1) {
      console.error(`\nPessoa "${pessoa.nome}" não encontrada`);
    }
    return index;
  }

  buscarPorId(id: number): Pessoa {
    if (id < 0 && this._listaDePessoas.length) {
      throw Error('Indice inválido');
    }
    const pessoa = this._listaDePessoas[id];
    return pessoa;
  }

  adicionar(pessoa: Pessoa): boolean {
    const pessoaExiste = this._buscarPeloNome(pessoa.nome);
    if (pessoaExiste) {
      console.error(`${pessoa} já existe`);
      return false;
    }
    this._listaDePessoas.push(pessoa);
    console.log(`\nPessoa ${pessoa.nome} adicionada com sucesso!`);
    return true;
  }

  listar(): void {
    console.log('PESSOAS CADASTRADAS');
    const printObj = this._listaDePessoas.map((p) => ({
      nome: p.nome,
      idade: p.idade,
      email: p.email,
    }));
    console.table(printObj);
  }

  buscarPeloNome(nome: string): Pessoa | undefined {
    const pessoa = this._buscarPeloNome(nome);
    if (!pessoa) {
      console.error(`\nPessoa "${nome}" não encontrada`);
    } else {
      console.log(
        `\nEncontrado pessoa com nome "${nome}". Imprimindo dados do cadastro..:\n${JSON.stringify(
          pessoa
        )}`
      );
      return pessoa;
    }
  }

  atualizar(pessoaAntiga: Pessoa, pessoaNova: Pessoa): boolean {
    const index = this._obterIndicePessoa(pessoaAntiga);
    /*    if (index === -1) {
      console.error('Atualização não executada');
      return false;
     }*/
    this._listaDePessoas[index].nome = pessoaNova.nome;
    this._listaDePessoas[index].idade = pessoaNova.idade;
    this._listaDePessoas[index].email = pessoaNova.email;
    console.log(`Alteração realizada com sucesso.`);
    return true;
  }

  deletar(pessoa: Pessoa): boolean {
    const index = this._obterIndicePessoa(pessoa);
    if (index === -1) {
      console.error('Exclusão não executada');
      return false;
    }
    this._listaDePessoas.splice(index, 1);
    console.log(`Exclusão de ${pessoa.nome} realizada com sucesso.`);
    return true;
  }
}
