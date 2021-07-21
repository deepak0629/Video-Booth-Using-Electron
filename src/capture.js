var electron=require("electron")
var remote=electron.remote
var desktopcapturer=require("electron").desktopCapturer
var screen =require("electron").screen
var fs=require("fs")
var path=require("path")
var countdown=require("./countdown")
var ipc=require("electron").ipcRenderer
var images=remote.require("./images")
var shell=electron.shell
var flasher=require("./flash")
var mainstream;
var recorder
// navigator.getUserMedia=navigator.mediaDevices.getUserMedia
var video=document.getElementById("video")
const constraints = {
    video: true
  };
  navigator.getUserMedia({
    video:{
        mandatory:{
            minWidth:853,
            minHeight:480,
            maxWidth:853,
            maxHeight:480
        }
    },
    audio:false
  },(stream)=>{
      console.log(stream)
      console.log(video)
      mainstream=stream
      video.srcObject=stream
  },(err)=>{
      console.log(`error occured and error is ${err}`)
  })
const canvasel=document.getElementById("canvas")
var ctx=canvasel.getContext("2d")
const photoel=document.querySelector(".photosContainer")
const flashel=document.getElementById("flash")
// photoel.addEventListener("click",(evnt)=>{
//     const isrm=evnt.target.classList.contains('photoClose')
//     const selector=isrm? 'photoClose' :'photoImg'
//     var rt=[]
//     rt=Array.from( document.getElementsByClassName(selector))
//     console.log(rt)
//     console.log(event.target)
//     var index=rt.findIndex((imgdiv)=>{
//         if (imgdiv==evnt.target)
//         {
//             return true
//         }
//     })
//     if(index>-1){
//         if(isrm){
//             ipc.send("img-remove",index)
//         }
//         else{
//             console.log(index)
//             console.log(images.getfromcache(index))
//             shell.showItemInFolder(images.getfromcache(index))
//         }
//     }

// })


// ipc.on('img-removed',(evnt,index)=>{
//     var photos= document.getElementById("photos")
//     console.log(document.getElementsByClassName("photo"))
//     console.log(Array.from( document.querySelector(".photo")))
//     console.log(index)
//     photos.removeChild(Array.from( document.getElementsByClassName("photo"))[index])
// })

var recordedChunks=[]
const blob_reader = new FileReader();
var pathhh=path.join(__dirname,Math.random(1000)+".webm")
const storage_stream = require("fs").createWriteStream(pathhh);

blob_reader.addEventListener("load", function(ev) {
    storage_stream.write(Buffer.from(ev.currentTarget.result));
    if(recordedChunks.length) {
        ev.currentTarget.readAsArrayBuffer(blobs.shift());
    }
});


document.getElementById("stoprecording").addEventListener("click",_=>{
    recorder.ondataavailable = handleDataAvailable;
    function handleDataAvailable(ev) {
        if(blob_reader.readyState != 1) {
            blob_reader.readAsArrayBuffer(ev.data);
        } else {
            recordedChunks.push(ev.data);
        }
        // console.log(event)
        // if (event.data.size > 0) {
        //   recordedChunks.push(event.data);
        //   console.log(recordedChunks)
        //   var blob = new Blob(recordedChunks, {
        //     type: 'video/webm'
        //   });
        //   var url = blob.text()
        //   console.log(url)
        //   fs.writeFileSync(pathhh,url)
        //   recordedChunks=[]
        // } else {
        //   // ...
        // }
      }
    
    recorder.stop()
    // recordedChunks=[]
})

document.getElementById("record").addEventListener("click",_=>{
    countdown(1,_=>{
        // flasher(flashel)
        recorder=new MediaRecorder(mainstream,{
            mimeType: 'video/webm; codecs=vp9'
        })
        console.log(recorder)
        recorder.start()
        
//     ctx.drawImage(video,0,0)
//     var temp=canvasel.toDataURL("image/png",0.8)
//     // console.log(temp)
//     ipc.send("img-capture",temp)
// //     const base64Data = temp.replace(/^data:image\/png;base64,/, "");
// //     var pathh=path.join(__dirname,"tempimg.png")
// //     fs.writeFile(pathh, base64Data, 'base64', function (err) {
// //       console.log(err);
// //   });
//     const div=document.createElement("div")
//     div.classList.add("photo")
//     const close=document.createElement("div")
//     close.classList.add("photoClose")
//     const img=new Image()
//     img.classList.add("photoImg")
//     img.src=temp
//     div.appendChild(img)
//     div.appendChild(close)
//     photoel.appendChild(div)
    })

})
// const video = document.querySelector('video');
// navigator.getUserMedia(constraints).
//   then((stream) => {video.srcObject = stream});
// navigator.mediaDevices.getUserMedia({
//     video:true,
//     audio:false
// }).then(function(stream){
//     console.log(stream)
//     var video=document.getElementById('video');
//     video.srcObject = stream
//     // video.src=window.URL.createObjectURL(medisreamback)
//     video.play();
// },
// function (error) {
//     console.log(error);
// }
// )
