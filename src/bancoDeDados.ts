import { IDadosPessoa, Pessoa } from './pessoa';

export class BancoDeDados {
  private _listaDePessoas: Pessoa[];

  constructor() {
    this._listaDePessoas = [];
  }

  get qtdePessoas(): number {
    return this._listaDePessoas.length;
  }

  buscarPorNome(nome: string): Pessoa | undefined {
    return this._listaDePessoas.find(
      (alvo) => alvo.nome.toLowerCase() === nome.toLowerCase()
    );
  }

  buscarPorEmail(email: string): Pessoa | undefined {
    return this._listaDePessoas.find(
      (alvo) => alvo.email.toLowerCase() === email.toLowerCase()
    );
  }

  listar(): void {
    console.log('\nPESSOAS CADASTRADAS');
    const printObj = this._listaDePessoas.map((p) => ({
      nome: p.nome,
      idade: p.idade,
      email: p.email,
    }));
    console.table(printObj);
  }

  adicionar(pessoa: Pessoa): boolean {
    const nomeExiste = this.buscarPorNome(pessoa.nome);
    if (nomeExiste) {
      console.error(`* Pessoa com nome "${pessoa.nome}" já existe!`);
      return false;
    }
    const emailExiste = this.buscarPorEmail(pessoa.email);
    if (emailExiste) {
      console.error(`* Pessoa com email "${pessoa.email}" já existe!`);
      return false;
    }
    this._listaDePessoas.push(pessoa);
    console.log(`\nPessoa "${pessoa.nome}" adicionada com sucesso!`);
    return true;
  }

  atualizar(index: number, dados: IDadosPessoa): boolean {
    const pessoa = this._listaDePessoas[index];
    if (!pessoa) {
      console.error('* O índice informado é inválido.');
      return false;
    }
    if (!Object.values(dados).some(Boolean)) {
      console.error('* Não há dados para atualizar.');
      return false;
    }
    if (dados.nome) {
      pessoa.nome = dados.nome;
    }
    if (dados.idade) {
      pessoa.idade = dados.idade;
    }
    if (dados.email) {
      pessoa.email = dados.email;
    }
    console.log(
      `\nPessoa "${pessoa.nome || dados.nome}" atualizada com sucesso!`
    );
    return true;
  }

  deletar(index: number): boolean {
    const pessoa = this._listaDePessoas[index];
    if (!pessoa) {
      console.error('* O índice informado é inválido. Tente novamente');
      return false;
    }
    this._listaDePessoas.splice(index, 1);
    console.log(`Exclusão de ${pessoa.nome} realizada com sucesso.`);
    return true;
  }
}
