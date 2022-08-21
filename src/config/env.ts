const {
  PORT, GET_FILTERED_IMAGE_TOKEN
} = process.env;

const port: number = parseInt(PORT) || 8082;

export default {
  port,
  getFilteredImageToken: GET_FILTERED_IMAGE_TOKEN
}