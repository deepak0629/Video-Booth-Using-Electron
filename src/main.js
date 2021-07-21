var electron=require("electron")
var {BrowserWindow:bw,app} =electron
var ipc=electron.ipcMain
var images=require("./images")

app.on("ready",_=>{
    var mainwindow=new bw({
        width:1500,
        height:1500,
        webPreferences:{
            nodeIntegration:true
        }
    })
    mainwindow.on("close",_=>{
        mainwindow=null
    })
    mainwindow.loadURL(`file://${__dirname}/capture.html`)
    mainwindow.webContents.openDevTools()
    images.imgmkdir(images.getpicturesdir(app))

    console.log("ready")
})
ipc.on("img-capture",(evnt,contents)=>{
    // console.log(images.getpicturesdir(app))
    images.saveimage(images.getpicturesdir(app),contents,(path)=>{
        images.cache(path)
    })
})

ipc.on("img-remove",(evnt,index)=>{
    images.rm(index,()=>{
        evnt.sender.send("img-removed",index)
    })
})