import express from 'express';
import env from './config/env';
import { validateImageUrlQuery } from "./middleware/validate-filtered-images-request";
import { filterImageFromURL, deleteLocalFiles } from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Use the body parser middleware for post requests
  app.use(express.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  // after redirecting to the set endpoint
  app.get("/", async (_req, res) => {
    res
      .status(301)
      .redirect("/filteredimage")
  });

  app.get("/filteredimage", validateImageUrlQuery, async (req, res) => {
    try {
      const { image_url } = req.query;
      const validImageUrl: string = String(image_url);
      const filteredImagePath: string = await filterImageFromURL(validImageUrl);

      return res
        .status(200)
        .sendFile(filteredImagePath, (err) => {
          if (err) throw err;
          deleteLocalFiles([filteredImagePath]);
        });
    } catch (error) {
      console.error(error);

      return res
        .status(500)
        .send("Oops! We could not retrieve the image for some reason 🤔");
    }
  });

  // Start the Server
  app.listen(env.port, () => {
    console.log(`server running http://localhost:${env.port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();