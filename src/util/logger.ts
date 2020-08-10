/**
 * Get current timestamp
 */
function getTimestamp(): string {
    const date = new Date();

    // Format date and time
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth()}` : date.getMonth();
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();


    // Return timestamp
    // Format: day/month/year - hours:minutes:seconds
    return `[${day}/${month}/${date.getFullYear()} - ${hours}:${minutes}:${seconds}]`;
}

/**
 * Log general information to the console
 *
 * @param message - Message to log
 */
export function logInfo(...message: Array<string>): void {
    console.log(getTimestamp(), ...message);
}

/**
 * Log warning to the console
 *
 * @param message - Message to log
 */
export function logWarning(...message: Array<string>): void {
    console.warn(getTimestamp(), ...message);
}

/**
 * Log error to the console
 *
 * @param message - Message to log
 */
export function logError(...message: Array<string>): void {
    console.error(getTimestamp(), ...message);
}