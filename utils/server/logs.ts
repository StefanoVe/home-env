import * as SSH from 'node-ssh';

const { SSH_HOST, SSH_USERNAME, SSH_PASSWORD } = process.env;

const ssh = new SSH.NodeSSH();

console.log('connecting to production server...');

const connection = await ssh.connect({
  host: SSH_HOST,
  username: SSH_USERNAME,
  password: SSH_PASSWORD,
});

console.log('connected to production server');

connection.exec('sudo journalctl ', ['-f', '-u', 'home-hub'], {
  stream: 'stdout',
  onStdout: (chunk) => {
    console.log(chunk.toString('utf8'));
  },
});
