import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../public/uploads');

const logoPath = path.join(uploadsDir, 'ivangs-logo.avif');
const heroPath = path.join(uploadsDir, 'ivangs-dachdecker-einsatz.avif');

async function optimizeImages() {
    console.log('Optimizing images...');

    try {
        // Create small logo for header/footer (200px width)
        if (fs.existsSync(logoPath)) {
            await sharp(logoPath)
                .resize({ width: 250, withoutEnlargement: true })
                .avif({ quality: 60, effort: 6 })
                .toFile(path.join(uploadsDir, 'ivangs-logo-sm.avif'));
            console.log('Created ivangs-logo-sm.avif');
        }

        // Create highly compressed mobile poster for hero (800px width, low quality)
        if (fs.existsSync(heroPath)) {
            await sharp(heroPath)
                .resize({ width: 800, withoutEnlargement: true })
                .avif({ quality: 40, effort: 6 })
                .toFile(path.join(uploadsDir, 'ivangs-dachdecker-einsatz-mobile.avif'));

            // Also create a slightly smaller desktop poster to save bandwidth (1600px width)
            await sharp(heroPath)
                .resize({ width: 1600, withoutEnlargement: true })
                .avif({ quality: 65, effort: 6 })
                .toFile(path.join(uploadsDir, 'ivangs-dachdecker-einsatz-optimized.avif'));

            console.log('Created optimized hero posters');
        }
    } catch (error) {
        console.error('Error optimizing images:', error);
    }
}

optimizeImages();
