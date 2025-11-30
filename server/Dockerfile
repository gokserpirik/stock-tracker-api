# 1. Use a lightweight Node.js base
FROM node:20-alpine

# 2. Set the working area inside the container
WORKDIR /app

# 3. Enable pnpm
RUN corepack enable

# 4. Copy ONLY package files first 
COPY package.json pnpm-lock.yaml ./

# 5. Install dependencies
RUN pnpm install

# 6. Copy the rest of your source code
COPY . .

# 7. Open the API port
EXPOSE 3000

# 8. Start the server
CMD ["pnpm", "dev"]