const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    // подключите autoprefixer
    autoprefixer,
    cssnano({ preset: 'default' })
  ]
};