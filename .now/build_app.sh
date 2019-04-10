cd ..

yum install -y wget sudo > /dev/null

VERSION=v10.15.0
DISTRO=linux-x64
sudo mkdir -p /usr/local/lib/nodejs
wget https://nodejs.org/dist/$VERSION/node-$VERSION-$DISTRO.tar.xz -q
sudo tar -xJvf node-$VERSION-$DISTRO.tar.xz -C /usr/local/lib/nodejs > /dev/null
export PATH=/usr/local/lib/nodejs/node-$VERSION-$DISTRO/bin:$PATH

npm install --global yarn

yarn install

yarn run build:app
