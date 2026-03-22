import sharp from 'sharp';
import { statSync, renameSync } from 'fs';

const INPUT = './public/bill-headshot.jpg';
const TMP = './public/bill-headshot-optimized.jpg';

const meta = await sharp(INPUT).metadata();
const { width, height } = meta;

// Portrait headshot: crop a square from the top-center (face is in upper portion).
// Adjust TOP_OFFSET (in pixels on the original image) if the crop cuts too much
// head off (increase) or shows too much chest (decrease).
const TOP_OFFSET = 0;
const cropSize = Math.min(width, Math.round(height * 0.55));
const left = Math.round((width - cropSize) / 2);
const top = TOP_OFFSET;

console.log(`Original: ${width}×${height}`);
console.log(
  `Cropping: ${cropSize}×${cropSize} from (left=${left}, top=${top})`
);
console.log(`Input size: ${(statSync(INPUT).size / 1024).toFixed(0)} KB`);

await sharp(INPUT)
  .extract({ left, top, width: cropSize, height: cropSize })
  .resize(500, 500)
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(TMP);

renameSync(TMP, INPUT);

console.log(`Output size: ${(statSync(INPUT).size / 1024).toFixed(0)} KB`);
console.log('Done → public/bill-headshot.jpg');
