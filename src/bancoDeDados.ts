import { Pessoa } from './pessoa';

export class BancoDeDados {
  private _listaDePessoas: Pessoa[];

  constructor() {
    this._listaDePessoas = [];
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

   buscarPorId(id : number) : Pessoa {
  
    if(id < 0){
      throw Error("Indice inválido")
      
    }
    const pessoa =  this._listaDePessoas[id]
    return pessoa
  }

  adicionar(pessoa: Pessoa): boolean {
    
    const pessoaExiste = this._buscarPeloNome(pessoa.nome);
    if (pessoaExiste) {
      console.error(`${pessoa} já existe`);
      return false;
    }
    this._listaDePessoas.push(pessoa);
    console.log(`Pessoa ${pessoa.nome} adicionada com sucesso!`);
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
        `\nEncontrado pessoa com nome "${nome}". Imprimindo dados do cadastro..:`
      );
    }
    return pessoa;
  }

  atualizar(pessoa: Pessoa): boolean {
    const index = this._obterIndicePessoa(pessoa);
    if (!index) {
      console.error('Atualização não executada');
      return false;
    }
    this._listaDePessoas[index] = pessoa;
    return true;
  }

  deletar(pessoa: Pessoa): boolean {
    const index = this._obterIndicePessoa(pessoa);
    if (!index) {
      console.error('Exclusão não executada');
      return false;
    }
    delete this._listaDePessoas[index];
    return true;
  }
}
