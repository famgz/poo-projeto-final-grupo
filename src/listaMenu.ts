export abstract class ListaMenu{

  _lista : string

  constructor(){
    this._lista = 
   `
    1 - Adicionar 
    2 - Listar
    3 - Buscar pelo nome 
    4 - Atualizar 
    5 - Deletar 
    `
  }
  mostrarMenu() : void{
    console.log(this._lista)
  }

  abstract exibirMenu () : void
  }