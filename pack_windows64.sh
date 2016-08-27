rm -rf GoCI-Manager-win32-x64
rm -f server/windows/64/goci.exe
env GOOS=windows GOARCH=amd64 go build -o server/windows/64/goci.exe -v github.com/prsolucoes/goci
electron-packager . GoCI-Manager --platform=win32 --arch=x64 --overwrite \
 --ignore="\.git(ignore|modules)" \
 --ignore="node_modules" \
 --ignore="pack_darwin64.sh" \
 --ignore="pack_windows64.sh" \
 --ignore="pack_windows32.sh" \
 --ignore="server/darwin" \
 --ignore="server/windows/32" \
 --ignore="\.zip"

