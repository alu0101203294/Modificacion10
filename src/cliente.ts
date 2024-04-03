import * as net from 'net';
import { argv } from 'process';

/**
 * Crea una conexión con el servidor y envía el archivo especificado por argumento de comando.
 * @param {string} argv[2] - Ruta del archivo a enviar al servidor
 * @returns {void}
 * 
 */
const client = net.connect({ port: 60300 }, () => {
  console.log('Conectado al servidor.');

  /**
   * Si se especifica un archivo por argumento de comando, se envía al servidor.
   * 
   */
  if (argv.length > 2) {
    const filePath = argv[2];
    client.write(filePath);
  }
});

/**
 * Muestra en consola la respuesta del servidor.
 * 
 */
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});

/**
 * Muestra en consola que se ha desconectado del servidor.
 * 
 */
client.on('end', () => {
  console.log('Desconectado del servidor.');
});

/**
 * Muestra en consola si hay un error.
 */
client.on('error', (error) => {
  console.error(`Error: ${error.message}`);
});
