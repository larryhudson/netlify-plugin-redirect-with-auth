# Netlify Plugin: Redirect with Auth

This Netlify build plugin allows you to add redirects with authentication headers to your Netlify site.

## Features

- Adds redirects with custom authentication headers - header is set in an environment variable, separate from the code in your repo
- Works for both build and development environments
- Configurable through the `netlify.toml` file

## Installation

1. First, install the plugin as an npm dependency:

```bash
npm install netlify-plugin-redirect-with-auth
```

2. Then, add the plugin to your `netlify.toml` file:

```toml
[[plugins]]
package = "netlify-plugin-redirect-with-auth"

  [plugins.inputs]
  redirects = [
    { from = "/submit", to = "https://api.example.com/submit" },
    { from = "/api/*", to = "https://api.example.com/:splat" }
 ]
```

## Configuration

### Environment Variables

Set the following environment variable in your Netlify site settings:

- `NETLIFY_REDIRECT_AUTH_HEADER`: The authentication header to be added to the redirects.

### Plugin Inputs

Configure the plugin in your `netlify.toml` file:

```toml
[[plugins]]
package = "netlify-plugin-redirect-with-auth"

  [plugins.inputs]
  redirects = [
    { from = "/submit", to = "https://api.example.com/submit" },
    { from = "/api/*", to = "https://api.example.com/:splat" }
  ]
```

Each redirect object in the `redirects` array must have both `from` and `to` properties.

## How It Works

1. The plugin runs during the `onPreBuild` and `onPreDev` events.
2. It checks for the presence of the `NETLIFY_REDIRECT_AUTH_HEADER` environment variable.
3. It validates the `redirects` input to ensure it's a non-empty array of valid redirect objects.
4. For each redirect, it adds a new redirect rule to the Netlify configuration with:
   - The specified `from` and `to` URLs
   - A status code of 200
   - The `force` flag set to true
   - The authentication header from the environment variable

## Notes

- This plugin adds the authentication header to all specified redirects.
- The redirects are set to force (always redirect, even if the requested file exists).
- The status code is set to 200 for all redirects.

## Troubleshooting

If you encounter issues:

1. Ensure the `NETLIFY_REDIRECT_AUTH_HEADER` environment variable is set correctly.
2. Check that your `redirects` input in `netlify.toml` is formatted correctly.
3. Verify that each redirect object has both `from` and `to` properties.

For more help, please open an issue in the plugin's GitHub repository.
