export const initMocking = async () => {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');
    console.log('server', server);
    server.listen(); // default: warn
    // server.listen({ onUnhandledRequest: 'bypass' });
  } else {
    const { worker } = await import('./browser');
    console.log('worker', worker);
    worker.start();
    // worker.start({ onUnhandledRequest: 'bypass' });
  }
};
