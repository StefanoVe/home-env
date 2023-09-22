/**
 * It takes a message and a type, and logs the message in a color based on the type
 * @param {string} msg - The message to be displayed.
 * @param {'success' | 'info' | 'error' | 'start' | 'warning' | 'end'} type - 'success' | 'info' |
 * 'error' | 'start' | 'warning' | 'end'
 */
export const log = (
  msg: string,
  type: 'success' | 'info' | 'error' | 'start' | 'warning' | 'end'
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

  console.log(color + msg + '\u001b[0m');
};
