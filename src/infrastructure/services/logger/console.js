const logInfo = (message) => console.info(`[INFO]: ${message}`);
const logError = (message) => console.error(`[ERROR]: ${message}`);
const logWarning = (message) => console.warn(`[WARNING]: ${message}`);

export default {
   logInfo,
   logError,
   logWarning,
}