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
            "Authorization":'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1ZGhsYWtvdGloYXJzaGl0MUBnbWFpbC5jb20iLCJ1c2VySWQiOiI2MjFjOWQ5NmM5NzAwNDg1MGU4ZjE3NzkiLCJpYXQiOjE2NDc4MzEwMjIsImV4cCI6MTY0NzgzNDYyMn0.JO2e_HYlfWzWBiPFTxzv0iyChKo6rhFSG-Xj-33BQrw'//hard-coded
        }
    })
  console.log(result)  
    console.log('push sent')
}