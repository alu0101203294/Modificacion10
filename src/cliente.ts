import * as net from 'net';
import { argv } from 'process';

const client = net.connect({ port: 60300 }, () => {
  console.log('Conectado al servidor.');

  if (argv.length > 2) {
    const filePath = argv[2];
    client.write(filePath);
  }
});

client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});

client.on('end', () => {
  console.log('Desconectado del servidor.');
});

client.on('error', (error) => {
  console.error(`Error: ${error.message}`);
});
