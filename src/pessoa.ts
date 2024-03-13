export class Pessoa {
  private _nome: string;
  private _idade: number;
  private _email: string;

  constructor(nome: string, idade: number, email: string) {
    if (this.nomeInvalido(nome)) {
      // throw new Error(`Erro: O nome deve ter no mínimo 3 caracteres.`);
      throw new Error(`Nome inválido: ${nome}`);
    }
    if (this.idadeInvalida(idade)) {
      throw new Error(`Idade inválida: ${idade}`);
      // throw new Error(`Idade inválida.`);
    }
    if (this.emailInvalido(email)) {
      throw new Error(`Email inválido: ${email}`);
      // throw new Error(`Email inválido.`);
    }
    this._nome = nome;
    this._idade = idade;
    this._email = email;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(novoNome: string) {
    if (this.nomeInvalido(novoNome)) {
       throw new Error(`Erro: O nome deve ter no mínimo 3 caracteres.`);
    }
    this._nome = novoNome;
  }

  get idade(): number {
    return this._idade;
  }

  set idade(novaIdade: number) {
    if (this.idadeInvalida(novaIdade)) {
      throw new Error(`Idade inválida: ${novaIdade}`);
    }
    this._idade = novaIdade;
  }

  get email(): string {
    return this._email;
  }
  
  set email(novoEmail: string) {
    if (this.emailInvalido(novoEmail)) {
      throw new Error(`Email inválido: ${novoEmail}`);
    }
    this._email = novoEmail;
  }

  private nomeInvalido(nome: string) {
    if (nome.length <= 3 || /\d/.test(nome)) {
      console.error("Erro: Nome deve ao menos 3 caracteres ou conter caracteres numéricos");
      return true;
    }
    return false;
  }
  
  private idadeInvalida(idade: number): boolean{
    if ( idade < 0 || idade > 110) {
      console.error("Erro: Idade deve estar no intervalo de 0 a 110 anos");
      return true;
    }
      return false;
  }

  private emailInvalido(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Erro: Email inválido");
      return false;
    }
    return false;
  }
}
