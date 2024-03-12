import promptSync from 'prompt-sync';
import { BancoDeDados } from './bancoDeDados';
import { Pessoa} from "./pessoa"
import { ListaMenu} from "./listaMenu"




export class Menu extends ListaMenu{

  private _bancoDeDados : BancoDeDados
  
  constructor(bancoDeDados: BancoDeDados){
    super();
    this._bancoDeDados = bancoDeDados
    

  }
  

  exibirMenu () : void{
    while (true){
      let escolha :null| number = null
      const prompt = promptSync()

      do{
        console.clear()
        this.mostrarMenu()
        console.log();
        
        escolha = Number(prompt("Escolhe uma opção. Digite 0 caso queira sair: ".trim()))
      
        
        if (escolha > 5 || escolha < 1){
          continue
        }
        if (isNaN(escolha)){
          continue
        }

      }while(escolha === null)

      if (escolha === 0){
        return
      }

      switch(escolha){

        case 1:
          const nome = prompt("Informe o nome: ")
          const idade =Number(prompt("Informe a idade: "))
          const email =prompt("Informe o email: ")
          const pessoa = new Pessoa(nome,idade,email)
          this._bancoDeDados.adicionar(pessoa)
        break

        case 2:
        this._bancoDeDados.listar();
        break

        case 3:
        const buscarNome : string = prompt("Informe o nome.: ")
        this._bancoDeDados.buscarPeloNome(buscarNome);
        break

        case 4:
        console.log("BancoDeDados.atualizar()");
        break

        case 5:
        console.log("BancoDeDados.deletar()")
        break
      
        // default:
        //   throw Error("Erro interno. problema em chamar os métodos, reveja o switch")
        
      }
      prompt('Aperte ENTER para voltar ao menu');
    }
  }


}