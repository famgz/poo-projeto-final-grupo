import { BancoDeDados } from './bancoDeDados';
import { Pessoa } from './pessoa';

export function runSeed(bancoDeDados: BancoDeDados) {
  const seed = [
    ['Carlos', 23, 'carlos@email.com'],
    ['Clovis', 24, '24clovis@email.com'],
    ['João', 25, 'joao@email.com'],
    ['Maria', 26, 'maria@email.com'],
    ['Ana Julia', 27, 'ana@email.com'],
    ['Pedro', 28, 'pedro@email.com'],
    ['Lucas', 29, 'lucas@email.com'],
  ];

  for (const [nome, idade, email] of seed) {
    bancoDeDados.adicionar(
      new Pessoa(nome.toString(), Number(idade), email.toString())
    );
  }
}
