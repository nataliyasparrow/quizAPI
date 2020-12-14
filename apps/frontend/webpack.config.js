module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // use: {
        //   loader: "babel-loader",
        // },
        loader: "babel-loader",
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ],
          plugins: [
            '@babel/transform-runtime'
        ]
      },},
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
  ]
},
  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/,
  //       use: [ 'style-loader', 'css-loader' ]
  //   },
  //   ],
  // }
};
