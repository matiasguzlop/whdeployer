
sshURL=$1
repoName=$2
echo "Repository name: $repoName"
echo "Deploying repository from url: $sshURL ... \n"
mkdir -p -m 755 ~/whdeploys
mkdir -p -m 755 ~/whdeploys/$repoName
cd ~/whdeploys/$repoName
if [ -d ~/whdeploys/$repoName]
then
    git pull
else
    git clone $sshURL ~/whdeploys/$repoName 
fi
echo "Installing dependencies..."
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
