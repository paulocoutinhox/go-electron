rm -rf GoCI-Manager-win32-x64ia32
rm -f server/windows/32/goci.exe
env GOOS=windows GOARCH=386 go build -o server/windows/32/goci.exe -v github.com/prsolucoes/goci
electron-packager . GoCI-Manager --platform=win32 --arch=ia32 --overwrite \
 --ignore="\.git(ignore|modules)" \
 --ignore="node_modules" \
 --ignore="pack_darwin64.sh" \
 --ignore="pack_windows64.sh" \
 --ignore="pack_windows32.sh" \
 --ignore="server/darwin" \
 --ignore="server/windows/64" \
 --ignore="\.zip"

