FROM node:16.12.0

WORKDIR ./

ENV PATH ./node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . ./

CMD ["npm", "start"]
