/* eslint-disable @typescript-eslint/no-floating-promises */
import { start, usage } from './config/app';

(async () => {
  usage();
  while (true) {
    await start();
  }
})();
