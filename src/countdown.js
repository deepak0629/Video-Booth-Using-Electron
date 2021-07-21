var couner=0
var couterel=document.getElementById("counter")
// function countdown(downfrom,done){
//     for(var i=0;i<=downfrom;i++){
//         setTimeout((i)=>{
//             const count=downfrom-i
//             couterel.innerHTML=count
//             if(count===0){
//                 done()
//                 couterel.innerHTML=""
//             }
            
//         },i*1000,i)
//     }
// }

function countdown(downfrom,done){
    var i=downfrom
    var timer=setInterval(()=>{
        couterel.innerHTML=i
       
        if(i==0){
            done()
            clearInterval(timer)
            couterel.innerHTML=""
        }
        i=i-1
    },1*1000)
    couterel.innerHTML=i
        
        if(i==0){
            done()
            clearInterval(timer)
            couterel.innerHTML=""
        }
        i=i-1
}

module.exports=countdown