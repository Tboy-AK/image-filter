import fs from "fs";
import Jimp from "jimp";
import fetch from "axios";

/**
 * Helper function to download, filter, and save the filtered image locally.
 * @param inputURL a publicly accessible url to an image file.
 * @returns an absolute path to a filtered image locally saved file.
 */
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const fileExtension: string = inputURL.
        substring(inputURL.lastIndexOf('.')) ||
        ".jpg"

      const outpath: string =
        "/tmp/filtered." +
        Math.floor(Math.random() * 2000) +
        fileExtension;

      let photo: Jimp;

      if (inputURL.includes('http', 0)) {
        const { data } = await fetch(inputURL, {
          responseType: "arraybuffer"
        });
        fs.writeFileSync(outpath, data);
        photo = await Jimp.read(outpath);
      } else photo = await Jimp.read(inputURL);

      photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname + outpath, (_err) => {
          resolve(__dirname + outpath);
        });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Helper function to delete files on the local disk.
 * Useful to cleanup after tasks.
 * @param files An array of absolute paths to files.
 */
export async function deleteLocalFiles(files: Array<string>) {
  let i = 0;
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
