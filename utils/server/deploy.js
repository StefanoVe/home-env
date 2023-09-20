import * as SSH from 'node-ssh';

const {
  PRODUCTION_FOLDER,
  SSH_SERVER_PATH,
  SSH_HOST,
  SSH_USERNAME,
  SSH_PASSWORD,
  PRODUCTION_ENV_FILE,
  PRODUCTION_ENTRYPOINT_FILE,
  SERVICE_RESTART_COMMAND,
} = process.env;

const ssh = new SSH.NodeSSH();

const bundler = async () => {
  console.log('connecting to production server...');

  const connection = await ssh.connect({
    host: SSH_HOST,
    username: SSH_USERNAME,
    password: SSH_PASSWORD,
  });

  console.log('connected to production server');
  console.log('uploading files...');

  await connection
    .putFiles([
      {
        local: `${PRODUCTION_FOLDER}/${PRODUCTION_ENTRYPOINT_FILE}`,
        remote: `${SSH_SERVER_PATH}/${PRODUCTION_ENTRYPOINT_FILE}`,
      },
      {
        local: `${PRODUCTION_FOLDER}/${PRODUCTION_ENV_FILE}`,
        remote: `${SSH_SERVER_PATH}/${PRODUCTION_ENV_FILE}`,
      },
    ])
    .catch((err) => {
      console.log(err);
    });

  console.log('files uploaded');

  await connection.execCommand(SERVICE_RESTART_COMMAND);

  ssh.dispose();

  return;
};

bundler();
