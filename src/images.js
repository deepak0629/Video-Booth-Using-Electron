var path=require("path")
var fs=require("fs")

var images=[]

function getpicturesdir(app){
    return path.join(app.getPath("pictures"),"photobomth")
}


function imgmkdir(imgdir){
    console.log("here")
    fs.stat(imgdir,(err,stats)=>{
        if(err|| !stats.isDirectory()){
            fs.mkdirSync(imgdir)
        }
        // console.log(err)
        // console.log(stats)
    })
}

function saveimage(imgdir,contents,callback){
    var modifired=contents.replace(/data:image\/png;base64,/,"")
    var pathh=path.join(imgdir,Math.random(1000)+".png")
    fs.writeFile(pathh,modifired,{encoding:"base64"},(err)=>{
        if(err){
            console.log(err)
        }
        else{
            callback(pathh)
        }
    })
}

function cache(imgpath){
    images=images.concat([imgpath])
}

function getfromcache(index){
    return images[index]
}

function rm(index,done){
    fs.unlink(images[index],(err)=>{
        if(err){
            console.log(`error occured ${err}`)
        }
        else{
            images.splice(index,1)
            done()
        }
    })
}


module.exports={
    getpicturesdir:getpicturesdir,
    saveimage:saveimage,
    imgmkdir:imgmkdir,
    getfromcache:getfromcache,
    cache:cache,
    rm:rm
}