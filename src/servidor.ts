import * as net from 'net';
import { exec } from 'child_process';


/**
 * Servidor que recibe la ruta de un archivo y devuelve el número de líneas, palabras y caracteres.
 * @param connection - Conexión con el cliente
 * @returns {void}
 * 
 */
const server = net.createServer((connection) => {
  console.log('Cliente conectado.');

  /**
   * Recibe la ruta del archivo y devuelve el número de líneas, palabras y caracteres.
   * @param data - Ruta del archivo
   * @returns {void}
   * 
   */
  connection.on('data', (data) => {
    const filePath = data.toString().trim();

    /**
     * Ejecuta el comando wc para contar el número de líneas, palabras y caracteres del archivo.
     * @param filePath - Ruta del archivo
     * @returns {void}
     * 
     */
    exec(`cat "${filePath}" | wc`, (error, stdout, stderr) => {
      /**
       * Si hay un error, se envía un mensaje de error al cliente.
       */
      if (error) {
        connection.write(`Error: ${error.message}`);
        return;
      }
      /**
       * Si hay un error en la salida estándar, se envía un mensaje de error al cliente.
       */
      if (stderr) {
        connection.write(`Error: ${stderr}`);
        return;
      }

      /**
       * Se separa la salida estándar en líneas, palabras y caracteres.
       * Se arregla el número de líneas para que sea correcto. (linea + 1)
       * Se envía el resultado al cliente.
       * 
       */
      const [lineas, palabras, caracteres] = stdout.split(/\s+/).filter(Boolean);
      const arreglarnumerolineas = parseInt(lineas) + 1;
      const resultado = `\nResultado:\nLíneas: ${arreglarnumerolineas}\nPalabras: ${palabras}\nCaracteres: ${caracteres}\n`;
      connection.write(resultado);
    });
  });

  /**
   * Muestra en consola que el cliente se ha desconectado.
   */
  connection.on('close', () => {
    console.log('Cliente desconectado.');
  });
});

  /**
   * Muestra en consola que el servidor está escuchando en el puerto 60300.
   */
  server.listen(60300, () => {
    console.log('Servidor escuchando en el puerto 60300.');
  });
