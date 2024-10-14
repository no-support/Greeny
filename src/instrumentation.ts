export async function register() {
  if (process.env.NEXT_PUBLIC_MOCKING && process.env.NEXT_RUNTIME === 'nodejs') {
    const { server } = await import('./mocks/server');
    console.log('server', server);
    server.listen(); // default: warn
  }
}
