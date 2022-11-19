import { setupApp } from './main/server';

const port = 3000;

const start = async () => {
  const app = await setupApp();
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(
      `🚀 heroesbackend server is running at http://localhost:${port}`
    );
  });
};

start();
