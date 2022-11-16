import app from './main/server';

const port = 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 heroesbackend server is running at http://localhost:${port}`);
});
