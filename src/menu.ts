import promptSync from 'prompt-sync';
import { BancoDeDados } from './bancoDeDados';
import { Pessoa} from "./pessoa"
const bancoDados = new BancoDeDados()

export class Menu{

  private mostrarMenu() : string{
    
    return `
    1 - Adicionar 
    2 - Listar
    3 - Buscar pelo nome 
    4 - Atualizar 
    5 - Deletar 
    `

  }

exibirMenu (){
  while (true){
    let escolha :null| number = null
    const prompt = promptSync()

    do{
      console.clear()
      console.log(this.mostrarMenu())
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
        bancoDados.adicionar(pessoa)
      break

      case 2:
      bancoDados.listar();
      break

      case 3:
      const buscarNome : string = prompt("Informe o nome.: ")
      bancoDados.buscarPeloNome(buscarNome);
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