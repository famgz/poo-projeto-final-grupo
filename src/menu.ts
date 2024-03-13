import promptSync from 'prompt-sync';
import { BancoDeDados } from './bancoDeDados';
import { Pessoa } from './pessoa';

const prompt = promptSync();

class ExitLoopError extends Error {
  constructor(message: string = '') {
    super(message);
    this.name = 'InputLoopError';
  }
}

abstract class ListaMenu {
  _lista: string;

  constructor() {
    this._lista = `
Menu de Opções:
1 - Adicionar 
2 - Listar
3 - Buscar pelo nome 
4 - Atualizar 
5 - Deletar`;
  }

  mostrarTitulo(): void {
    console.log('-- BANCO DE DADOS DE PESSOAS --');
  }

  mostrarMenu(): void {
    this.mostrarTitulo();
    console.log(this._lista);
  }

  abstract iniciarAplicacao(): void;
}

export class Menu extends ListaMenu {
  private _bancoDeDados: BancoDeDados;

  constructor(bancoDeDados: BancoDeDados) {
    super();
    this._bancoDeDados = bancoDeDados;
  }

  private pedirOpcaoMenu(): number {
    let escolha;

    while (true) {
      this.mostrarMenu();
      console.log();

      const res = prompt('Digite uma opção (ou "q" para sair): ').trim();

      if (res.toLowerCase() === 'q') {
        throw new ExitLoopError();
      }

      escolha = parseInt(res);

      if (isNaN(escolha) || escolha < 1 || escolha > 5) {
        console.clear();
        console.log('Opção inválida!\n');
        continue;
      }
      break;
    }
    return escolha;
  }

  private pedirIndexPessoa(): number {
    let index: number = -1;
    const maxIndex = this._bancoDeDados.qtdePessoas - 1;

    while (true) {
      this._bancoDeDados.listar();

      const res = prompt(
        'Digite o index da Pessoa (ou "q" para voltar ao menu): '
      ).trim();

      if (res.toLowerCase() === 'q') {
        throw new ExitLoopError();
      }

      index = parseInt(res);
      if (isNaN(index) || index < 0 || index > maxIndex) {
        console.clear();
        console.log('Index inválido!\n');
        continue;
      }
      return index;
    }
  }

  private pedirDadosAtualizar() {
    const novoNome: string = String(prompt('Informe o novo nome: '));
    const novaIdade: number = Number(prompt('Informe a nova idade: '));
    const novoEmail: string = String(prompt('Informe o novo email: '));
    const pessoaAtualizada: Pessoa = new Pessoa(novoNome, novaIdade, novoEmail);
    return pessoaAtualizada;
  }

  private listaEstaVazia(): boolean {
    const estaVazia = !this._bancoDeDados.qtdePessoas;
    if (estaVazia) {
      console.log('Lista de pessoas está vazia. Tente adicionar.');
      return true;
    }
    return false;
  }

  private opcaoAdicionar(): boolean {
    const nome = prompt('Informe o nome: ');
    const idade = Number(prompt('Informe a idade: '));
    const email = prompt('Informe o email: ');
    const pessoa = new Pessoa(nome, idade, email);
    this._bancoDeDados.adicionar(pessoa);
    return true;
  }

  private opcaoBuscarPeloNome(): boolean {
    if (this.listaEstaVazia()) {
      return false;
    }
    const nomeAPesquisar: string = prompt('Informe o nome.: ');
    const pessoaPeloNome = this._bancoDeDados.buscarPeloNome(nomeAPesquisar);
    if (!pessoaPeloNome) {
      console.log(`Pessoa com nome ${nomeAPesquisar} não encontrada.`);
      return false;
    } else {
      console.table([pessoaPeloNome]);
      return true;
    }
  }

  private opcaoAtualizar(): boolean {
    if (this.listaEstaVazia()) {
      return false;
    }
    try {
      const pessoaAntiga = this._bancoDeDados.buscarPorId(
        this.pedirIndexPessoa()
      );
      const pessoaNova = this.pedirDadosAtualizar();
      this._bancoDeDados.atualizar(pessoaAntiga, pessoaNova);
    } catch (err) {
      if (err instanceof ExitLoopError) {
        console.log('Operação cancelada');
      } else {
        console.error(err);
        return false;
      }
    }
    return true;
  }

  private opcaoDeletar(): boolean {
    if (this.listaEstaVazia()) {
      return false;
    }

    try {
      const pessoaDeletar = this._bancoDeDados.buscarPorId(
        this.pedirIndexPessoa()
      );
      this._bancoDeDados.deletar(pessoaDeletar);
    } catch (err) {
      if (err instanceof ExitLoopError) {
        console.log('Operação cancelada');
      } else {
        console.error(err);
        return false;
      }
    }
    return true;
  }

  iniciarAplicacao(): void {
    while (true) {
      let escolha: number;

      try {
        escolha = this.pedirOpcaoMenu();
      } catch (err) {
        if (err instanceof ExitLoopError) {
          console.log('Programa finalizado');
        } else {
          console.error(err);
        }
        return;
      }

      switch (escolha) {
        case 1:
          this.opcaoAdicionar();
          break;

        case 2:
          this._bancoDeDados.listar();
          break;

        case 3:
          this.opcaoBuscarPeloNome();
          break;

        case 4:
          this.opcaoAtualizar();
          break;

        case 5:
          this.opcaoDeletar();
          break;

        default:
          console.error('Opção inválida.');
      }
      prompt('Aperte ENTER para voltar ao menu...');
    }
  }
}
