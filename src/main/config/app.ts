import chalk from 'chalk';
import readline from 'readline';

const commands = ['criar-horta', 'criar-robo', 'resolver', 'ajuda'];

export const usage = (): void => {
  const usageText = `
  Hortaliças e Hortaliças: resolução de caminho para robo irrigador

  uso:
    <comando>

    os comandos aceitos são:

    criar-horta: usado para criar uma nova horta
    criar-robo:  usado para criar e configurar um robo
    resolver: usado para resolver o problema da irrigação
    ajuda:     usado para exibir estas intruções
  `;

  console.log(usageText);
};

function errorLog(error): void {
  const eLog = chalk.red(error);
  console.log(eLog);
}

async function askQuestion(): Promise<any> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const command = await new Promise<string>(resolve =>
    rl.question('Command:', ans => {
      rl.close();
      resolve(ans);
    }),
  );

  if (!commands.includes(command)) {
    errorLog('invalid command passed');
    usage();
  }

  switch (command) {
    case 'ajuda':
      usage();
      break;
    case 'criar-horta':
      break;
    case 'criar-robo':
      break;
    case 'resolver':
      break;
    default:
      errorLog('invalid command passed');
      usage();
  }
}

export async function start(): Promise<void> {
  await askQuestion();
}
