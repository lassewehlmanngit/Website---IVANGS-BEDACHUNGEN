import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contentDir = path.join(__dirname, '../content');

// Regex to match TinaCloud asset URLs
const tinaAssetRegex = /https:\/\/assets\.tina\.io\/[^\/]+\/[^\"\')]+/g;

function cleanFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const matches = content.match(tinaAssetRegex);

        if (matches && matches.length > 0) {
            let newContent = content;
            matches.forEach(match => {
                // Extract just the filename from the URL
                const urlObj = new URL(match);
                const filename = path.basename(urlObj.pathname);
                // Decode URI component in case filename has %20 etc.
                const decodedFilename = decodeURIComponent(filename);

                // Replace with local path
                const localPath = `/uploads/${decodedFilename}`;
                newContent = newContent.replace(match, localPath);
                console.log(`Replaced in ${path.basename(filePath)}: ${match} -> ${localPath}`);
            });

            fs.writeFileSync(filePath, newContent, 'utf-8');
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

// Find all JSON and Markdown files in the content directory
const files = globSync(`${contentDir}/**/*.{json,md}`);
console.log(`Scanning ${files.length} files for Tina asset URLs...`);

files.forEach(cleanFile);
console.log('Done scanning and cleaning.');
