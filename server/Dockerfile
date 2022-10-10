FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm config set strict-ssl false
RUN npm config set registry https://artifactory.sick.com/artifactory/api/npm/npm/
RUN npm config set proxy http://cloudproxy-sickag.sickcn.net:10415
RUN npm config set https-proxy http://cloudproxy-sickag.sickcn.net:10415
RUN npm config set _auth dG9iaWFzLmxhdWZlcnN3ZWlsZXJAc2ljay5kZTpBS0NwOGtxQ0tYV3d0MzY0bWVMM3djbmNGVE5jNTg3aThtaHYxd0VZZ2ZSN0pmeTY4WTU5TTFWbjZKRngxaFBUb2F2UDhTOWZK
RUN npm config set email tobias.laufersweiler@sick.de
RUN npm config set always-auth true

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5000
CMD [ "npm", "start" ]