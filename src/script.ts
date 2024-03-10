import { BancoDeDados } from './bancoDeDados';
import { Pessoa } from './pessoa';

class Menu {}

const menu = new Menu();

const bancoDados = new BancoDeDados();

const pessoa1 = new Pessoa('Carlos', 23, 'carlos@email.com');

bancoDados.adicionar(pessoa1);

bancoDados.listar();
