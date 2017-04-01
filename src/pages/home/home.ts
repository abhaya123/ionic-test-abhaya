import { Component } from "@angular/core";
import { Platform} from "ionic-angular";
import { WebIntent } from "ionic-native";
import { MoodDbServices } from "../../providers/mooddbservices";
import { VoiceServices } from "../../providers/voiceservices";
import { Mood, MoodTimingGroup } from "../../app/model/Mood";


declare var cordova:any;

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})

export class HomePage {
  public moodTimingGroup: MoodTimingGroup[] = [];
  public moods: Mood[] = [];
  constructor(private platform: Platform, 
        private moodDbServices: MoodDbServices,
        private voiceServices: VoiceServices) {
    platform.ready().then(() => {
        this.loadMoodsData();        
        if(platform.is("ios")){
          console.info("ios platform!");
          this.getIntentDataiOS();         
        }
        else if(platform.is("android")){
          console.info("android platform!");
          this.getIntentDataAndroid();
        }
        else
          console.info('ionic platform!');
    });
  }
  //get android take a note intent data using WebIntent
  private getIntentDataAndroid(): void
  {
    //console.info('getIntentData() method Called!');
    WebIntent.hasExtra(WebIntent.EXTRA_TEXT).then((hasValue) =>
    {
      if(hasValue)
      {
        WebIntent.getExtra(WebIntent.EXTRA_TEXT).then((intent)=>
        {
          this.verifiedAndAddToUI(intent);
        });
      }
    },(error)=> console.error('getIntentData() method error:'+error.message));
  }

  private getIntentDataiOS(): void{
      let self = this;
      if(typeof cordova !== "undefined"){
        let SiriIntent = cordova.plugins.SiriIntent;
        console.info("status of cordova: true");
        if(typeof SiriIntent !== "undefined")
        {
          SiriIntent.getIntent(function(intent){
            console.info('Intent Data:'+intent);
            if(intent!=='' && intent !== null)
              self.verifiedAndAddToUI(intent);
            else
              console.info("No Intent Data: " + intent);
          },function(error){
            console.error('No SiriIntent!'+JSON.stringify(error));
          });
        }
      }
  }

  public verifiedAndAddToUI(intent: String): void{
    for(let data of intent.split('and')) 
    {
      if(this.voiceServices.isVerifiedMoodStatus(data))
        this.addMoodData({title: data,created: new Date()});
      else
        this.voiceServices.showErrorToast("Invalid MoodStatus!","your mood must start with [I am ] or [I am thankful for *afternoon].");
    }
  }
  //add mood to the database
  private addMoodData(mood: Mood) : void
  {
    this.moodDbServices.insertMood(mood).then((result) => {
        this.loadMoodsData();
      }, (error) => console.error("addMoodData() error: ", error)
      ).catch(error => console.error("addMoodData() catch error: ", error));
  }

  //load moods from databased
  private loadMoodsData() : void
  {
    this.moodDbServices.getMoods().then((data) => {
      this.moods = <Mood[]> data;
      this.moodTimingGroup = this.voiceServices.loadMoodTimingGroup(this.moods);
    }, (error) => console.error("loadMoodsData() error: "+error)
    ).catch((error) => console.error("loadMoodsData() error: "+error));
  }
}
