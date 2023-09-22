/**
 * It takes a message and a type, and logs the message in a color based on the type
 * @param {string} msg - The message to be displayed.
 * @param {'success' | 'info' | 'error' | 'start' | 'warning' | 'end'} type - 'success' | 'info' |
 * 'error' | 'start' | 'warning' | 'end'
 */
export const log = (
  msg: string,
  type: 'success' | 'info' | 'error' | 'start' | 'warning' | 'end',

  manager?: LogManager
) => {
  let color = 'white';
  // const  bgc = "White";
  switch (type) {
    case 'success':
      color = '\u001b[1;32m';
      break;
    case 'info':
      color = '\u001b[1;36m';
      break;
    case 'error':
      color = '\u001b[1;31m';
      break;
    case 'start':
      color = '\u001b[1;35m';
      break;
    case 'warning':
      color = '\u001b[1;33m';
      break;
    case 'end':
      color = '\u001b[1;35m';
      break;
  }

  const _message = `${color}${msg}\u001b[0m`;

  console.log(_message);

  if (!manager) {
    return;
  }

  manager.addLog(msg);
};

export class LogManager {
  private _recentLogs: string[] = [];

  constructor(private ignore: string[] = []) {}

  public static init(ignore: string[] = []) {
    return new LogManager(ignore);
  }

  public get logs() {
    return this._recentLogs;
  }

  public addLog(message: string) {
    if (this.ignore.some((i) => message.includes(i))) {
      return;
    }

    this._recentLogs.push(message);
    this._clean();
  }

  private _clean() {
    //removes logs older than Bun.env.LOGS_CACHE_SIZE

    const size = Number(Bun.env.LOGS_CACHE_SIZE) || 100;

    if (this._recentLogs.length < size) {
      return;
    }
    this._recentLogs.splice(0, this._recentLogs.length - size);
  }
}
