//connecting sockets
const socket = io('http://127.0.0.1:3000/',{
    transportOptions:{
        polling:{
            extraHeaders:{
                BearerToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1ZGhsYWtvdGloYXJzaGl0MjRAZ21haWwuY29tIiwidXNlcklkIjoiNjIxNjdiZmUxNGM2ODRjNjVhMDIzMjUzIiwiaWF0IjoxNjQ3ODYyMDAwLCJleHAiOjE2NDc4NjU2MDB9.G6p5qCj-EvPQO3xL-OMo7ypFN_Td49uMDpg9b-DOLI8"
            }
        }
    }
})

socket.on("connect",()=>{
    socket.emit('subscribe')   //subscribing user
    
socket.on("response",data=>{
    console.log('gooo')
    console.log("socket response"+data)
})
})



function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

console.log('sdsd')
const publicKey= 'BNsSGdlASCAfmxG-Aw79ma6oJGyOglLnf-G8gTvqdw357Ktt67h5I_XufJGu7qJ5aP50BqI4En_jkSg8kWBvO1g'

//check for service worker
if('serviceWorker' in navigator){
    send().catch(err=>console.error(err))
}

//register service wprker
async function send(){
    console.log("registering service worker")
    const register = await navigator.serviceWorker.register('/worker.js',{
        scope:"/"
    })
    console.log('service worker registered..')

    //register push
    console.log('Registering Push...');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey:urlBase64ToUint8Array(publicKey)
    })
    console.log(subscription)
    console.log('Push registered')


    //send push notification
   const result= await fetch('/subscribe',{
        method:"POST",
        body:JSON.stringify(subscription),
        headers:{
            'content-type':"application/json",
            "Authorization":'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1ZGhsYWtvdGloYXJzaGl0MjRAZ21haWwuY29tIiwidXNlcklkIjoiNjIxNjdiZmUxNGM2ODRjNjVhMDIzMjUzIiwiaWF0IjoxNjQ3ODYyMDAwLCJleHAiOjE2NDc4NjU2MDB9.G6p5qCj-EvPQO3xL-OMo7ypFN_Td49uMDpg9b-DOLI8'//hard-coded
        }
    })
  console.log(result)  
    console.log('push sent')
}