FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY src/ ./src/
ENV PORT=3001
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=5s CMD node -e "require('http').get('http://localhost:3001/health',(r)=>r.statusCode===200?process.exit(0):process.exit(1))"
CMD ["node", "src/index.js"]
