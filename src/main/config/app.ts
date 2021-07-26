import chalk from 'chalk';
import readline from 'readline';
import { createGardenController } from '../../use-cases/implementations/create-garden';
import { createRobotController } from '../../use-cases/implementations/create-robot';
import { resolvePathController } from '../../use-cases/implementations/resolve-path';
import { adaptRoute } from '../adapters/console/route-adapter';

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

async function readCommand(): Promise<any> {
  const command = await askQuestion('comando: ');

  if (!commands.includes(command)) {
    errorLog('invalid command passed');
    usage();
  }

  switch (command) {
    case 'ajuda':
      usage();
      break;
    case 'criar-horta':
      await createGarden();
      break;
    case 'criar-robo':
      await createRobot();
      break;
    case 'resolver':
      await resolvePath();
      break;
    default:
      errorLog('invalid command passed');
      usage();
  }
}

async function createGarden(): Promise<void> {
  const irrigablePatches = [];
  let irrigablePatch;
  const size = await askQuestion('tamanho da horta? Ex: (4,4): ');
  const [x, y] = size.slice(1, -1).split(',');

  const gardenSize = { width: Number(x), height: Number(y) };
  do {
    irrigablePatch = await askQuestion(
      'quais canteiros devem ser irrigados? Digite um por vez e pressione enter. Quando finalizar pressione enter. Ex: (1,3): ',
    );
    const [x, y] = irrigablePatch.slice(1, -1).split(',');

    if (irrigablePatch) {
      irrigablePatches.push({ x: Number(x), y: Number(y) });
    }
  } while (irrigablePatch !== '');

  const request = {
    body: {
      size: gardenSize,
      irrigablePatches,
    },
  };

  await adaptRoute(createGardenController, request);
}

async function createRobot(): Promise<void> {
  const position = await askQuestion('posição inicial do robo? Ex: (4,4): ');
  const [x, y] = position.slice(1, -1).split(',');

  const initialPosition = { x: Number(x), y: Number(y) };

  const heading = await askQuestion(
    'para onde o robo está direcionado? Entradas válidas: N, S, L, O: ',
  );

  const initialHeading = heading;

  const request = {
    body: {
      initialHeading,
      initialPosition,
    },
  };

  await adaptRoute(createRobotController, request);
}

async function resolvePath(): Promise<void> {
  await adaptRoute(resolvePathController, {});
}

async function askQuestion(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await new Promise<string>(resolve =>
    rl.question(question, ans => {
      rl.close();
      resolve(ans);
    }),
  );
  console.log(answer);
  return answer;
}

export async function start(): Promise<void> {
  await readCommand();
}
