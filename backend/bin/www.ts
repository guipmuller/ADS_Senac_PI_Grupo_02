// Adicione isto no TOPO do arquivo, antes de qualquer outra lógica
process.on('uncaughtException', (error) => {
  console.error('❌ Erro não tratado (uncaughtException):', error);
  process.exit(1);
});

// Adicione também para capturar rejeições de promises não tratadas
process.on('unhandledRejection', (reason, promise) => {
  console.error('🚨 Rejeição não tratada em Promise:', promise, 'Motivo:', reason);
  process.exit(1);
});

import { createServer } from 'http';
import debugLib from 'debug';
import app from '../src/app';
import { AppDataSource } from '../src/database/data-source';

const debug = debugLib('backend:server');

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

/**
 * Inicializa o TypeORM antes de criar o servidor
 */
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Data Source initialized');

    /**
     * Create HTTP server.
     */
    const server = createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    /**
     * Event listener for HTTP server "listening" event.
     */
    function onListening(): void {
      const addr = server.address();
      const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
      debug(`🚀 Listening on ${bind}`);
    }

    /**
     * Event listener for HTTP server "error" event.
     */
    function onError(error: NodeJS.ErrnoException): void {
      if (error.syscall !== 'listen') {
        throw error;
      }

      const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

      switch (error.code) {
        case 'EACCES':
          console.error(`${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(`${bind} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    }

  })
  .catch((err) => {
    console.error('💥 Error during Data Source initialization:', err);
    process.exit(1);
  });

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string): number | string | false {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val; // named pipe
  }

  if (port >= 0) {
    return port; // port number
  }

  return false;
}