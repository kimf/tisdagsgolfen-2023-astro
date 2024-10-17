FROM node:lts-alpine AS base
WORKDIR /app

COPY package.json package-lock.json ./

FROM base AS build
RUN npm install --legacy-peer-deps

RUN echo "DATABASE_URL: $DATABASE_URL"
COPY . .
RUN npm run build

FROM base AS runtime

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist


# Move the drizzle directory to the runtime image
COPY --from=build /app/drizzle ./drizzle
COPY --from=build ./app/scripts/run.sh ./scripts/run.sh

# TMP to be able do debug drizzle stuff
COPY --from=build /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=build ./app/src/db/ ./src/db/

# Create the data directory for the database
VOLUME /data
RUN mkdir -p /data

ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production
EXPOSE 4321

RUN echo "DATABASE_URL: $DATABASE_URL"
CMD ["sh", "./scripts/run.sh"]
