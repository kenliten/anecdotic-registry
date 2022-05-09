const fs = require('fs');

const config = {
  packageOutput: '../../../dist',
  electron: true,
  debugOutput: false,
  linux: true,
  windows: true,
  mac: true,
}

const parseCommandLineOptions = () => {
  const options = [];
  process.argv.forEach(arg => {
    if (arg.startsWith('-')) {
      options.push(arg);
    }
  });

  if (options.some(opt => '--no-electron')) {
    config.electron = false;
  } else if (options.some(opt => opt === '--debug')) {
    config.debugOutput = false;
  } else if (options.some(opt => opt === '--no-linux')) {
    config.linux = false;
  } else if (options.some(opt => opt === '--no-windows')) {
    config.windows = false;
  } else if (options.some(opt => opt === '--no-mac')) {
    config.mac = false;
  } else if (options.some(opt => opt === '--linux')) {
    config.mac = false;
    config.windows = false;
    config.linux = true;
  } else if (options.some(opt => opt === '--windows')) {
    config.mac = false;
    config.windows = true;
    config.linux = false;
  } else if (options.some(opt => opt === '--mac')) {
    config.mac = true;
    config.windows = false;
    config.linux = false;
  } else if (options.some(opt => opt === '--')) {
  }
}

parseCommandLineOptions();
