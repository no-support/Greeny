export const initMocking = async () => {
  // if (typeof window === 'undefined') {
  //   const { server } = await import('./server');
  //   console.log('server', server);
  //   server.listen();
  // }
  if (typeof window !== 'undefined') {
    const { worker } = await import('./browser');
    console.log('worker', worker);
    worker.start();
  }
};
