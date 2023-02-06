
sshURL=$1
repoName=$2
echo "Repository name: $repoName"
echo "Deploying repository from url: $sshURL ... \n"
rm -r -f ~/whdeploys/$repoName
mkdir -p -m 755 ~/whdeploys
mkdir -m 755 ~/whdeploys/$repoName
git clone $sshURL ~/whdeploys/$repoName 
echo "Installing dependencies..."
cd ~/whdeploys/$repoName
npm install
build=$(npm run | grep build)
if [ -z "$build" ]
then
      echo "No build is needed"
else
      echo "Building..."
      npm run build
fi

start=$(npm run | grep start)
if [ -z "$start" ]
then 
    echo "[ERROR]: No start command on repository. Aborting process."
    exit 1
else    
    echo "Starting..."
    npm start
fi
exit 0
