export class Pessoa {
  private _nome: string;
  private _idade: number;
  private _email: string;

  constructor(nome: string, idade: number, email: string) {
    if (this.nomeInvalido(nome)) {
      throw new Error('Nome inválido');
    }
    this._nome = nome;
    this._idade = idade;
    this._email = email;
  }

  get nome(): string {
    return this._nome;
  }

  get idade(): number {
    return this._idade;
  }

  get email(): string {
    return this._email;
  }

  set nome(novoNome: string) {
    this._nome = novoNome;
  }

  set idade(novaIdade: number) {
    this._idade = novaIdade;
  }

  set email(novoEmail: string) {
    this._email = novoEmail;
  }

  private ehNumero(letra: string): boolean {
    return !isNaN(parseInt(letra));
  }

  private nomeInvalido(nome: string) {
    if (nome.length < 4) {
      console.error('Erro: Nome deve ao menos 4 caracteres');
      return true;
    }
    for (const letra of nome) {
      if (this.ehNumero(letra)) {
        console.error('Erro: Nome não pode conter caracteres numéricos');
        return true;
      }
    }
    return false;
  }
}
