import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";
import { Mood, MoodTimingGroup } from "../app/model/mood";
import "rxjs/add/operator/map";

@Injectable()
export class VoiceServices {
  constructor(private alertCtrl: AlertController) {
  }
  //restricted sentenses
  //allowing  I am and I am thankful for.
  public isVerifiedMoodStatus(data: String): Boolean
  {
    let intent = data.toLowerCase();
    let currentHour = new Date().getHours();
    let status = false;
    if(currentHour >=12 && currentHour <= 16)
    {
      if(intent.indexOf('i am thankful for')>=0 || intent.indexOf('i\'m thankful for')>=0)
        status = true;
    }
    else
    {
      if(intent.indexOf('i am')>=0 || intent.indexOf('i\'m')>=0)
        status = true;
    }
    return status;
  }
 

//set mooods in three format morning, afternoon and evening
  public loadMoodTimingGroup(moods: Mood[]) : MoodTimingGroup[]
  {
    let morning: Mood[] = [];
    let afternoon: Mood[] = [];
    let evening: Mood[] = [];
    let other: Mood[] = [];
    let moodTimingGroup: MoodTimingGroup[] = [];
    if(moods.length > 0 )
    {
      console.info("loadmoodstimingdata() has data:"+moods.length);
    for(let mood of moods)
    {
        let result = this.verifyPartsofTheDay(mood);
        if(result == 1)
          morning.push({title: mood.title,created: mood.created});
        else if(result == 2)
          afternoon.push({title: mood.title,created: mood.created});
        else if(result == 3)
          evening.push({title: mood.title,created: mood.created});
        else
          other.push({title: mood.title,created: mood.created});
    }
  }
  else
    console.info("loadmoodstimingdata() has no records.");
    moodTimingGroup.push({title: "Morning!", moods: morning.reverse()});
    moodTimingGroup.push({title: "Afternoon!", moods: afternoon.reverse()});
    moodTimingGroup.push({title: "Evening!", moods: evening.reverse()});
  return moodTimingGroup;
  }

  //check enter mood intent timing
  public verifyPartsofTheDay(mood: Mood) : Number
  {
    var getMoodHour = new Date(mood.created).getHours();
    if ( getMoodHour < 12 )  
        return 1;
    else if ( getMoodHour >= 12 && getMoodHour <= 16 ) 
        return 2; 
    else if ( getMoodHour > 16 && getMoodHour <= 24 ) 
        return 3; 
    else
        return 0; 
  }

  public showErrorToast(header: String,error: String): void
  {
      let alert = this.alertCtrl.create({
      title: header.toString(),
      subTitle: error.toString(),
      buttons: ['OK']
    });
    alert.present();
  }
}
