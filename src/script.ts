import { BancoDeDados } from './bancoDeDados';
import { Menu } from './menu';

const db = new BancoDeDados();
const menu = new Menu(db);

menu.iniciar();
