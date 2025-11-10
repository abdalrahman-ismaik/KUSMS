// Simple logger utility for consistent logging across the application

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

const formatMessage = (level, message, data = null) => {
  const timestamp = new Date().toISOString();
  const dataStr = data ? `\n${JSON.stringify(data, null, 2)}` : '';
  return `[${timestamp}] ${level}: ${message}${dataStr}`;
};

const logger = {
  info: (message, data = null) => {
    console.log(`${colors.blue}${formatMessage('INFO', message, data)}${colors.reset}`);
  },

  success: (message, data = null) => {
    console.log(`${colors.green}${formatMessage('SUCCESS', message, data)}${colors.reset}`);
  },

  warn: (message, data = null) => {
    console.warn(`${colors.yellow}${formatMessage('WARN', message, data)}${colors.reset}`);
  },

  error: (message, data = null) => {
    console.error(`${colors.red}${formatMessage('ERROR', message, data)}${colors.reset}`);
  },

  debug: (message, data = null) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${colors.magenta}${formatMessage('DEBUG', message, data)}${colors.reset}`);
    }
  },
};

export default logger;
