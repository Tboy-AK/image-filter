// Check string type
// Check length

// Split dot (.)
// Get last element
// Check string type
// Check length (2-5)

import express from 'express';

export async function validateImageUrlQuery (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response> {
  const { image_url } = req.query;
  if (
    !image_url ||
    typeof image_url !== 'string' ||
    typeof image_url === 'string' && image_url.length < 5
  ) return res.status(422).send("try GET /filteredimage?image_url={{}}");

  let mime: string = String(image_url);
  const image_url_split = mime.split('.');
  mime = image_url_split[image_url_split.length - 1];

  if (
    !mime ||
    typeof mime !== 'string' ||
    typeof mime === 'string' && mime.length < 3 && mime.length > 4
  ) return res.status(422).send("ensure image_url is pointing to an image file");

  next();
}