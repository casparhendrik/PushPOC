import { Component } from '@angular/core';
import { Push, PushOptions, PushObject } from '@ionic-native/push/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

constructor(private push: Push, private plt: Platform) {
    this.push.hasPermission().then((res: any) => {
      if (res.isEnabled) {
        console.log('We have permission to send push notifications');
      } else {
        console.log('We do not have permission to send push notifications.');
      }
    });
    this.plt.ready().then(() => {
      this.pushSetup();
    });
  }

   pushSetup() {
   const options: PushOptions = {
      android: {
        senderID: '343566679165'
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      },
      windows: {},
      browser: {
          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };

   const pushObject: PushObject = this.push.init(options);
   pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
   pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }


createPush() {}

}
