/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, options) => {
        config.module.rules.push({
          test: /\.(mp3|png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: `/_next/static/media/`,
                outputPath: `${options.isServer ? '../public/static/media' : 'static/media'}`,
                name: '[name].[hash].[ext]',
              },
            },
          ],
        });
    
        return config;
      },
};

export default nextConfig;
