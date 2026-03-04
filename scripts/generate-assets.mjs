import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public');
const logoPath = path.join(publicDir, 'uploads', 'ivangs-logo.avif');
const bgPath = path.join(publicDir, 'uploads', 'invangs-ceo-image.webp');

async function generate() {
    console.log('Generating assets...');

    // Load the AVIF logo and convert it to a proper base PNG
    const baseLogo = await sharp(logoPath).png().toBuffer();

    // Create a padded version for icons (512x512 with transparent bg)
    const paddedLogo = await sharp({
        create: { width: 512, height: 512, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 0 } }
    })
        .composite([{ input: await sharp(baseLogo).resize(400, 400, { fit: 'inside' }).toBuffer(), gravity: 'center' }])
        .png()
        .toBuffer();

    await sharp(paddedLogo).resize(192).toFile(path.join(publicDir, 'android-chrome-192x192.png'));
    await sharp(paddedLogo).resize(512).toFile(path.join(publicDir, 'android-chrome-512x512.png'));
    await sharp(paddedLogo).resize(180).toFile(path.join(publicDir, 'apple-touch-icon.png'));
    await sharp(paddedLogo).resize(32).toFile(path.join(publicDir, 'favicon-32x32.png'));
    await sharp(paddedLogo).resize(16).toFile(path.join(publicDir, 'favicon-16x16.png'));

    // For favicon.ico use 32x32 directly
    await sharp(paddedLogo).resize(32).toFile(path.join(publicDir, 'favicon.ico'));

    // SEO Social Sharing Image (1200x630)
    const bg = await sharp(bgPath).resize(1200, 630, { fit: 'cover' }).toBuffer();
    // Using an SVG overlay makes it simple to darken the background
    const overlay = Buffer.from(
        `<svg width="1200" height="630"><rect x="0" y="0" width="1200" height="630" fill="rgba(15, 23, 42, 0.85)"/></svg>`
    );

    // Resize logo for OG image to be prominently centered
    const logoResize = await sharp(baseLogo).resize(600, null, { fit: 'inside' }).toBuffer();

    await sharp(bg)
        .composite([
            { input: overlay, gravity: 'center' },
            { input: logoResize, gravity: 'center' }
        ])
        .jpeg({ quality: 90 })
        .toFile(path.join(publicDir, 'og-image.jpg'));

    console.log('Done generating assets!');
}

generate().catch(console.error);
