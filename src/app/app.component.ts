import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar, Splashscreen } from "ionic-native";

import { HomePage } from "../pages/home/home";
import { MoodDbServices } from "../providers/mooddbservices";
import { VoiceServices } from "../providers/voiceservices";

@Component({
  templateUrl: "app.html",
  providers: [MoodDbServices, VoiceServices]
})

export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => 
    {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
