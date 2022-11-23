import { setupApp } from './main/server';

const start = async () => {
  const app = await setupApp();

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(
      `🚀 heroesbackend server is running at http://localhost:${port}`
    );
  });
};

start();
