import { Buffer } from "buffer";

export default function formatFile(data){
    const dataUrlParts = data.split(',');
      const contentType = dataUrlParts[0].split(':')[1].split(';')[0];
      const imageData = Buffer.from(dataUrlParts[1], 'base64');
      const filename = 'image.png';
      const file = new File([imageData], filename, { type: contentType });

      return file;
}