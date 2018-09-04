module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 4 versions', 'safari 8']
        },
        useBuiltIns: 'usage',
        debug: false,
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-proposal-object-rest-spread',
      {
        useBuiltIns: 'usage',
        debug: false,
      }
    ],
  ]
}