export interface IDadosPessoa {
  nome: string;
  idade: number;
  email: string;
}

export class Pessoa {
  private _nome: string;
  private _idade: number;
  private _email: string;

  constructor(nome: string, idade: number, email: string) {
    if (this.nomeInvalido(nome)) {
      throw new TypeError(`Nome inválido: "${nome}"`);
    }
    if (this.idadeInvalida(idade)) {
      throw new TypeError(`Idade inválida: "${idade}"`);
    }
    if (this.emailInvalido(email)) {
      throw new TypeError(`Email inválido: "${email}"`);
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
    if (this.nomeInvalido(novoNome)) {
      throw new TypeError(`Nome inválido: "${novoNome}"`);
    }
    this._nome = novoNome;
  }

  set idade(novaIdade: number) {
    if (this.idadeInvalida(novaIdade)) {
      throw new TypeError(`Idade inválida: "${novaIdade}"`);
    }
    this._idade = novaIdade;
  }

  set email(novoEmail: string) {
    if (this.emailInvalido(novoEmail)) {
      throw new TypeError(`Email inválido: "${novoEmail}"`);
    }
    this._email = novoEmail;
  }

  private nomeInvalido(nome: string): boolean {
    if (nome.length < 3) {
      console.error('Erro: Nome deve ter ao menos 3 caracteres');
      return true;
    }
    if (/\d/.test(nome)) {
      console.error('Erro: Nome não pode conter caracteres numéricos');
      return true;
    }
    return false;
  }

  private idadeInvalida(idade: number): boolean {
    if (idade < 0 || idade > 110) {
      console.error('Erro: Idade deve estar no intervalo de 0 a 110 anos');
      return true;
    }
    return false;
  }

  private emailInvalido(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return true;
    }
    return false;
  }
}
