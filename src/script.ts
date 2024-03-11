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

bancoDados.adicionar(new Pessoa('teste', 24, 'testando'));

bancoDados.listar();

bancoDados.adicionar(new Pessoa('teste alterado', 32, 'testando alterado'));

bancoDados.listar();
