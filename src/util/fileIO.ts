import fs from "fs";
import path from "path";

/**
 * Load file form path
 *
 * @param filePath - Path to file
 * @return string
 */
export function loadFileFromPath(...filePath: Array<string>): string {
    return fs.readFileSync(path.join(...filePath), "utf-8");
}