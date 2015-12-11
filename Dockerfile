FROM pmm/node
COPY . /src
WORKDIR /src
EXPOSE 3000
ENTRYPOINT npm start