import { BancoDeDados } from './bancoDeDados';
import { Pessoa } from './pessoa';
import { Menu } from "./menu"


const menu = new Menu();
// menu.exibirMenu()


const bancoDados = new BancoDeDados();

const pessoa1 = new Pessoa('Carlos', 23, 'carlos@email.com');
bancoDados.adicionar(pessoa1);

const pessoa2 = new Pessoa("Clovis", 24, "24clovis@email.com" )
bancoDados.adicionar(pessoa2)

const pessoa3 = new Pessoa('João', 25, 'joao@email.com');
bancoDados.adicionar(pessoa3);

const pessoa4 = new Pessoa('Maria', 26, 'maria@email.com');
bancoDados.adicionar(pessoa4);

const pessoa5 = new Pessoa('Ana Julia', 27, 'ana@email.com');
bancoDados.adicionar(pessoa5);

const pessoa6 = new Pessoa('Pedro', 28, 'pedro@email.com');
bancoDados.adicionar(pessoa6);

const pessoa7 = new Pessoa('Lucas', 29, 'lucas@email.com');
bancoDados.adicionar(pessoa7);


 console.log(bancoDados.buscarPeloNome("Lucas"));
