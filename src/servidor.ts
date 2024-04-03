import * as net from 'net';
import { exec } from 'child_process';


export const server = net.createServer((connection) => {
  console.log('Cliente conectado.');

  connection.on('data', (data) => {
    const filePath = data.toString().trim();

    exec(`cat "${filePath}" | wc`, (error, stdout, stderr) => {
      if (error) {
        connection.write(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        connection.write(`Error: ${stderr}`);
        return;
      }

      const [lineas, palabras, caracteres] = stdout.split(/\s+/).filter(Boolean);
      const arreglarnumerolineas = parseInt(lineas) + 1;
      const resultado = `\nResultado:\nLíneas: ${arreglarnumerolineas}\nPalabras: ${palabras}\nCaracteres: ${caracteres}\n`;
      connection.write(resultado);
    });
  });

  connection.on('close', () => {
    console.log('Cliente desconectado.');
  });
});

server.listen(60300, () => {
  console.log('Servidor escuchando en el puerto 60300.');
});
