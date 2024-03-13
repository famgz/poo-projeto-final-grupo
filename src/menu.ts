import promptSync from 'prompt-sync';
import { BancoDeDados } from './bancoDeDados';
import { IDadosPessoa, Pessoa } from './pessoa';

const prompt = promptSync();

class ExitLoopError extends Error {
  constructor(message: string = '') {
    super(message);
    this.name = 'InputLoopError';
  }
}

abstract class ListaMenu {
  _titulo: string;
  _lista: string;

  constructor(titulo: string) {
    this._titulo = titulo;
    this._lista = `
Menu de Opções:
1 - Adicionar 
2 - Listar
3 - Buscar pelo nome 
4 - Atualizar 
5 - Deletar`;
  }

  mostrarTitulo(): void {
    console.log(`-- ${this._titulo} --`);
  }

  mostrarMenu(): void {
    this.mostrarTitulo();
    console.log(this._lista);
  }

  abstract iniciar(): void;
}

export class Menu extends ListaMenu {
  private db: BancoDeDados;

  constructor(bancoDeDados: BancoDeDados) {
    super('BANCO DE DADOS DE PESSOAS');
    this.db = bancoDeDados;
  }

  private listaEstaVazia(): boolean {
    return !this.db.qtdePessoas;
  }

  private promptOpcaoMenu(): number {
    let escolha;

    while (true) {
      this.mostrarMenu();
      console.log();

      const res = prompt(
        'Digite uma opção do menu (ou "q" para sair): '
      ).trim();

      if (res.toLowerCase() === 'q') {
        throw new ExitLoopError();
      }

      escolha = parseInt(res);

      if (isNaN(escolha) || escolha < 1 || escolha > 5) {
        console.clear();
        console.error('* Opção inválida!\n');
        continue;
      }
      break;
    }
    return escolha;
  }

  private promptIndexPessoa(): number {
    let index: number = -1;
    const maxIndex = this.db.qtdePessoas - 1;

    while (true) {
      this.db.listar();

      const res = prompt(
        'Digite o index da Pessoa (ou "q" para voltar ao menu): '
      ).trim();

      if (res.toLowerCase() === 'q') {
        throw new ExitLoopError();
      }

      index = parseInt(res);
      if (isNaN(index) || index < 0 || index > maxIndex) {
        console.clear();
        console.log('* Index inválido!\n');
        continue;
      }
      return index;
    }
  }

  private promptDadosPessoa(atualizar: boolean = false): IDadosPessoa {
    const sufixo = atualizar
      ? ' (ou deixe vazio caso não queira alterar): '
      : ':';
    const nome = prompt(`Informe o nome${sufixo} `).trim();
    const idade = parseInt(prompt(`Informe a idade${sufixo} `).trim());
    const email = prompt(`Informe o email${sufixo} `).trim();
    return {
      nome,
      idade,
      email,
    };
  }

  private opcaoAdicionar(): boolean {
    try {
      const dados = this.promptDadosPessoa();
      const pessoa = new Pessoa(dados.nome, dados.idade, dados.email);
      const adicionado = this.db.adicionar(pessoa);
      if (!adicionado) {
        return false;
      }
    } catch (err) {
      if (err instanceof ExitLoopError) {
        console.log('Operação cancelada');
      } else if (err instanceof TypeError) {
        console.error(err.message);
      } else {
        console.error(err);
        return false;
      }
    }
    return true;
  }

  private opcaoBuscarPeloNome(): boolean {
    const nome = prompt('Informe o nome da Pessoa para pesquisa: ').trim();
    const pessoa = this.db.buscarPorNome(nome);
    if (!pessoa) {
      console.clear();
      console.log(`* Pessoa com nome ${nome} não encontrada.`);
      return false;
    } else {
      console.log('Pessoa encontrada! Imprimindo dados do cadastro...');
      console.table([pessoa]);
      return true;
    }
  }

  private opcaoAtualizar(): boolean {
    try {
      const index = this.promptIndexPessoa();
      const dados = this.promptDadosPessoa(true);
      this.db.atualizar(index, dados);
    } catch (err) {
      if (err instanceof ExitLoopError) {
        console.log('Operação cancelada');
      } else if (err instanceof TypeError) {
        console.error(err.message);
      } else {
        console.error(err);
        return false;
      }
    }
    return true;
  }

  private opcaoDeletar(): boolean {
    try {
      const index = this.promptIndexPessoa();
      this.db.deletar(index);
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

  iniciar(): void {
    console.clear();

    while (true) {
      let escolha: number;

      try {
        escolha = this.promptOpcaoMenu();
      } catch (err) {
        if (err instanceof ExitLoopError) {
          console.log('Programa finalizado');
        } else {
          console.error(err);
        }
        return;
      }

      if (escolha !== 1 && this.listaEstaVazia()) {
        console.clear();
        console.error(
          '\n* Lista de pessoas está vazia. Tente adicionar entradas.\n'
        );
        continue;
      }

      switch (escolha) {
        case 1:
          this.opcaoAdicionar();
          break;

        case 2:
          this.db.listar();
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
          console.clear();
          console.error('* Opção inválida.');
      }

      prompt('Aperte ENTER para voltar ao menu...');
      console.clear();
    }
  }
}
