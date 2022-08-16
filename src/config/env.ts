const {
  PORT,
} = process.env;

const port: number = parseInt(PORT) || 8082;

export default {
  port, 
}