FROM node:20-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 5173

# "--host" so the browser can reach it from outside the container
CMD ["pnpm", "dev", "--host"]