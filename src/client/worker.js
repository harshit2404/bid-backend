console.log('service worker loaded')

self.addEventListener('push', e=>{
    const data = e.data.json();
    console.log("harry")
    console.log(data)
    console.log('push received');
    self.registeration.showNotification(data.title, {
        body: 'Notified by closiit!',
        icon: './vc.png',
        image :'./vc.png'
      });
})