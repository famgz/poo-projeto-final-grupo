import promptSync from 'prompt-sync';
import { BancoDeDados } from './bancoDeDados';
import { Pessoa } from './pessoa';

const prompt = promptSync();

class InputLoopError extends Error {
  constructor(message: string = '') {
    super(message);
    this.name = 'InputLoopError';
  }
}

abstract class ListaMenu {
  _lista: string;

  constructor() {
    this._lista = `Menu de Opções:
  1 - Adicionar 
  2 - Listar
  3 - Buscar pelo nome 
  4 - Atualizar 
  5 - Deletar 
    `;
  }

  mostrarTitulo(): void {
    console.log('-- BANCO DE DADOS DE PESSOAS --\n');
  }

  mostrarMenu(): void {
    this.mostrarTitulo();
    // console.log('Menu de Opções:');
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

  private pedirIndexAoUsuario(): number {
    let index: number = -1;
    const maxIndex = this._bancoDeDados.qtdePessoas - 1;

    while (true) {
      this._bancoDeDados.listar();

      const res = prompt(
        'Informe o index da Pessoa: ("q" para voltar ao menu)'.trim()
      );
      if (res.toLowerCase() === 'q') {
        throw new InputLoopError();
      }

      index = parseInt(res);
      if (isNaN(index) || index < 0 || index > maxIndex) {
        console.clear();
        console.log('Informe um index válido!\n');
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

  iniciarAplicacao(): void {
    while (true) {
      let escolha: null | number = null;
      do {
        console.clear();
        this.mostrarMenu();
        console.log();

        escolha = Number(
          prompt('Escolhe uma opção. Digite 0 caso queira sair: '.trim())
        );

        if (escolha > 5 || escolha < 1) {
          continue;
        }
        if (isNaN(escolha)) {
          continue;
        }
      } while (escolha === null);

      if (escolha === 0) {
        return;
      }

      switch (escolha) {
        // Adicionar
        case 1:
          const nome = prompt('Informe o nome: ');
          const idade = Number(prompt('Informe a idade: '));
          const email = prompt('Informe o email: ');
          const pessoa = new Pessoa(nome, idade, email);
          this._bancoDeDados.adicionar(pessoa);
          break;

        // Listar
        case 2:
          this._bancoDeDados.listar();
          break;

        // Buscar pelo nome
        case 3:
          const nomeAPesquisar: string = prompt('Informe o nome.: ');
          const pessoaPeloNome =
            this._bancoDeDados.buscarPeloNome(nomeAPesquisar);
          if (!pessoaPeloNome) {
            console.log(`Pessoa com nome ${nomeAPesquisar} não encontrada.`);
          } else {
            console.table([pessoaPeloNome]);
          }
          break;

        // Atualizar
        case 4:
          if (!this._bancoDeDados.qtdePessoas) {
            console.log('Lista de pessoas está vazia. Tente adicionar.');
            break;
          }
          try {
            const pessoaAntiga = this._bancoDeDados.buscarPorId(
              this.pedirIndexAoUsuario()
            );
            const pessoaNova = this.pedirDadosAtualizar();
            this._bancoDeDados.atualizar(pessoaAntiga, pessoaNova);
          } catch (err) {
            if (err instanceof InputLoopError) {
              console.log('Voltando ao Menu');
            } else {
              console.error(err);
            }
          } finally {
            break;
          }

        // Deletar
        case 5:
          if (!this._bancoDeDados.qtdePessoas) {
            console.log('Lista de pessoas está vazia. Tente adicionar.');
            break;
          }
          const pessoaDeletar = this._bancoDeDados.buscarPorId(
            this.pedirIndexAoUsuario()
          );
          this._bancoDeDados.deletar(pessoaDeletar);
          break;

        default:
          console.error('Opção inválida.');
      }
      prompt('Aperte ENTER para voltar ao menu');
    }
  }
}
