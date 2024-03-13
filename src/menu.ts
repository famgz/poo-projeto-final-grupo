import promptSync from 'prompt-sync';
import { BancoDeDados } from './bancoDeDados';
import { Pessoa } from './pessoa';

abstract class ListaMenu {
  _lista: string;

  constructor() {
    this._lista = `
    1 - Adicionar 
    2 - Listar
    3 - Buscar pelo nome 
    4 - Atualizar 
    5 - Deletar 
    `;
  }

  mostrarMenu(): void {
    console.log(this._lista);
  }

  abstract exibirMenu(): void;
}

export class Menu extends ListaMenu {
  private _bancoDeDados: BancoDeDados;

  constructor(bancoDeDados: BancoDeDados) {
    super();
    this._bancoDeDados = bancoDeDados;
  }

  exibirMenu(): void {
    while (true) {
      let escolha: null | number = null;
      const prompt = promptSync();

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
        case 1:
          const nome = prompt('Informe o nome: ');
          const idade = Number(prompt('Informe a idade: '));
          const email = prompt('Informe o email: ');
          const pessoa = new Pessoa(nome, idade, email);
          this._bancoDeDados.adicionar(pessoa);

          break;

        case 2:
          this._bancoDeDados.listar();

          break;

        case 3:
          const buscarNome: string = prompt('Informe o nome.: ');
          this._bancoDeDados.buscarPeloNome(buscarNome);
          break;

        case 4:
          const pessoaAntiga = this._bancoDeDados.buscarPorId(this.pedirId());
          const pessoaNova = this.pedirDadosAtualizar();
          this._bancoDeDados.atualizar(pessoaAntiga, pessoaNova);

          break;

        case 5:
          const pessoaDeletar = this._bancoDeDados.buscarPorId(this.pedirId());
          this._bancoDeDados.deletar(pessoaDeletar);

          break;

        default:
          throw Error(
            'Erro interno. problema em chamar os métodos, reveja o switch'
          );
      }
      prompt('Aperte ENTER para voltar ao menu');
    }
  }

  private pedirId(): number {
    const prompt = promptSync();
    console.log(`Usuário cadastrados:\n`);
    this._bancoDeDados.listar();
    const entrada = Number(prompt('Informe o Id: '));
    return entrada;
  }

  private pedirDadosAtualizar() {
    const prompt = promptSync();
    const novoNome: string = String(prompt('Informe o novo nome: '));
    const novaIdade: number = Number(prompt('Informe a nova idade: '));
    const novoEmail: string = String(prompt('Informe o novo email: '));
    const pessoaAtualizada: Pessoa = new Pessoa(novoNome, novaIdade, novoEmail);
    return pessoaAtualizada;
  }
}
