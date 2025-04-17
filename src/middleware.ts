// import { sequence } from 'astro:middleware';

import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  if (!context.request.url.includes('/api')) {
    return next();
  }

  const userId = context.session?.get('userId');

  if (!userId) {
    return new Response(null, { status: 401 });
  }

  return next();
});

// export const onRequest = sequence(validation, auth, greeting);
