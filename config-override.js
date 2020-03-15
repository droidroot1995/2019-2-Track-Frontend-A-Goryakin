const CSSSpritePlugin = require('css-sprite-loader').Plugin

module.exports = (config, env) => {
  config.module.rules.push({
    test: /\.css$/,
    use: ['style-loader', 'css-loader', 'css-sprite-loader'],
  })

  config.module.plugins.push(new CSSSpritePlugin())
  return config
}
