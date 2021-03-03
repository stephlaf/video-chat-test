const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv()
  ],
  new webpack.DefinePlugin({           
      DAILY_URL: JSON.stringify(process.env.DAILY_URL)      
    })
};
