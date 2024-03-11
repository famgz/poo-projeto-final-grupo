import { BancoDeDados } from './bancoDeDados';
import { Pessoa } from './pessoa';
import { Menu } from './menu';
import { runSeed } from './seed';

const menu = new Menu();
// menu.exibirMenu()

const bancoDados = new BancoDeDados();

runSeed(bancoDados);

bancoDados.listar();

console.log(bancoDados.buscarPeloNome('Lucas'));

// menu.exibirMenu();
