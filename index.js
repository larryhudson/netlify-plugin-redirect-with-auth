function addRedirects({ inputs, netlifyConfig }) {
  const authHeader = process.env.NETLIFY_REDIRECT_AUTH_HEADER;

  if (!authHeader) {
    throw new Error(
      "NETLIFY_REDIRECT_AUTH_HEADER environment variable is not set",
    );
  }

  if (
    !inputs.redirects ||
    !Array.isArray(inputs.redirects) ||
    inputs.redirects.length === 0
  ) {
    throw new Error(
      'The "redirects" input must be a non-empty array of redirect objects',
    );
  }

  inputs.redirects.forEach((redirect) => {
    if (!redirect.from || !redirect.to) {
      throw new Error(
        'Each redirect object must have both "from" and "to" properties',
      );
    }

    netlifyConfig.redirects.push({
      from: redirect.from,
      to: redirect.to,
      status: 200,
      force: true,
      headers: {
        Authorization: authHeader,
      },
    });
  });
}

export const onPreBuild = addRedirects;
export const onPreDev = addRedirects;
