rm -rf GoCI-Manager-darwin-x64
rm -f server/darwin/64/goci
env GOOS=darwin GOARCH=amd64 go build -o server/darwin/64/goci -v github.com/prsolucoes/goci
electron-packager . GoCI-Manager --platform=darwin --arch=x64 --overwrite \
 --ignore="\.git(ignore|modules)" \
 --ignore="node_modules" \
 --ignore="pack_darwin64.sh" \
 --ignore="pack_windows64.sh" \
 --ignore="pack_windows32.sh" \
 --ignore="server/windows" \
 --ignore="\.zip"
