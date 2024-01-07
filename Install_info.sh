# installing docker desktop


sudo apt install gnome-terminal
sudo apt remove docker-desktop
rm -r $HOME/.docker/desktop
sudo rm /usr/local/bin/com.docker.cli
sudo apt purge docker-desktop
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update


# download https://desktop.docker.com/linux/main/amd64/docker-desktop-4.26.1-amd64.deb?utm_source=docker&utm_medium=webreferral&utm_campaign=docs-driven-download-linux-amd64

sudo apt-get update
sudo apt-get install ./docker-desktop-<version>-<arch>.deb


# install docker engine
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin


# install nodejs
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

sudo apt-get update
sudo apt-get install nodejs -y

# setting up project
mkdir Project
cd Project
mkdir server client
cd server
# in server
npm init
npm i express pg dotenv

cd ../client
# in client
npx create-react-app helloworld
npm i axios


# setting up database
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
# sudo systemctl enable docker.service
# sudo systemctl enable containerd.service
# sudo systemctl start docker.service
# sudo systemctl start containerd.service
# sudo systemctl status docker.service
# sudo systemctl status containerd.service
# sudo docker run hello-world
# sudo docker pull postgres



docker run --name testtube -e POSTGRES_USER=as_rk -e POSTGRES_PASSWORD=as_rk_pass -p 5432:5432 -d postgres 

# make a dummy sql
docker cp ./init.sql testtube:/tmp/init.sql


docker exec -ti testtube /bin/bash -c "psql -U as_rk -d postgres -f /tmp/init.sql"

# to start the container
docker start testtube
# creating api
# create index.js 

# delete a docker container
# docker rm testtube

#how to install linter in project
# npm install eslint --save-dev
# npx eslint --init
# npm install eslint-plugin-react --save-dev
# npm install eslint-plugin-react-hooks --save-dev


# installing prisma in pre-existing project
npm install prisma --save-dev
npx prisma
npx prisma init

# search for a file named .env in the project folder





