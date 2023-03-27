FROM node:19-alpine

# working directory
WORKDIR /app

# copy app to workdirectory
COPY . .

# execute comand
RUN npm i 

# port, dodumentation, not funcianal, makeUp
EXPOSE 5252

#medzera je ciarka v tej array
CMD [ "npm","start" ]





