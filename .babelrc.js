module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 4 versions', 'safari 8']
        },
        useBuiltIns: 'usage',
        debug: true,
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-proposal-object-rest-spread',
      {
        useBuiltIns: 'usage',
        debug: true,
      }
    ],
  ]
}