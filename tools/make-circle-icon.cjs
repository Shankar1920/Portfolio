const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, '../public/image.png');
const outputFile = path.join(__dirname, '../public/icon.png');

async function createCircularIcon() {
    try {
        if (!fs.existsSync(inputFile)) {
            console.error('Input file not found:', inputFile);
            return;
        }

        const image = sharp(inputFile);
        const metadata = await image.metadata();

        const size = Math.min(metadata.width, metadata.height);
        const circleShape = Buffer.from(
            `<svg><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" /></svg>`
        );

        await image
            .resize(size, size)
            .composite([{
                input: circleShape,
                blend: 'dest-in'
            }])
            .png()
            .toFile(outputFile);

        console.log('Circular icon created at:', outputFile);
    } catch (error) {
        console.error('Error creating icon:', error);
    }
}

createCircularIcon();
