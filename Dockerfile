FROM node:lts-alpine AS base
WORKDIR /app

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

VOLUME /data
RUN mkdir -p /data

COPY package.json package-lock.json ./

FROM base AS build
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

FROM base AS runtime

ENV DATABASE_URL=$DATABASE_URL

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Move the drizzle directory to the runtime image
COPY --from=build /app/drizzle ./drizzle
COPY --from=build ./app/scripts/run.sh ./scripts/run.sh

# Create the data directory for the database
VOLUME /data
RUN mkdir -p /data

ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production
ENV DATABASE_URL=$DATABASE_URL
EXPOSE 4321

CMD ["sh", "./scripts/run.sh"]
