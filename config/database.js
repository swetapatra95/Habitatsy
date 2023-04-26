require('dotenv').config()

module.exports = {
    url : "mongodb+srv://admin:" + process.env.DB_PASS + 
          "@cluster0.pfvyg9z.mongodb.net/" + 
          process.env.DATABASE + "?retryWrites=true&w=majority"
};
