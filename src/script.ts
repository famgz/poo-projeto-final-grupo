import { BancoDeDados } from './bancoDeDados';
import { Menu } from './menu';


const bancoDeDados = new BancoDeDados();
const menu = new Menu(bancoDeDados);
// menu.exibirMenu()



menu.exibirMenu();
