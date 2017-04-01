import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import { Mood } from '../app/model/mood';
import 'rxjs/add/operator/map';

/*
run below command for add sqlite
ionic plugin add cordova-sqlite-storage
ionic g provider database
*/

@Injectable()
export class MoodDbServices {
  private db: SQLite;
  private isOpen: Boolean;
  constructor() {
    this.db = new SQLite();
    this.createDb();
  }
  //check imoodstatus database status and if not create database
  public createDb() : void{
    this.db.openDatabase({name:"imoodstatus.db", location: "default"})
    .then(()=>{
      this.db.executeSql("CREATE TABLE IF NOT EXISTS moodstatus (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, created DATETIME)",{});
      this.isOpen = true;
    });
  }

  public openDb(): Promise<any>{
    return this.db.openDatabase({name:"imoodstatus.db", location: "default"});
  }

  //insert data to moodstatus table
  public insertMood(mood: Mood) : Promise<any>
  {
      return new Promise((resolve,reject) =>{
          this.openDb().then(()=>{
          this.db.executeSql("INSERT INTO moodstatus (title,created) VALUES(?,?)",[mood.title,mood.created])
          .then((data)=>{
            resolve(data);
          }, (error)=>
          {
            reject(error);
          });
         });
      });
  }

  //get data from moodstatus
  public getMoods() : Promise<any>
  {
    return new Promise((resolve, reject)=>{
        this.openDb().then(()=>{
        this.db.executeSql("SELECT * FROM moodstatus",[])
          .then((data)=>{
            let moods = [];
            if(data.rows.length > 0)
            {
              for(let i = 0; i < data.rows.length; i++)
              {
                moods.push({title: data.rows.item(i).title, created: data.rows.item(i).created});
              }
            }
            resolve(moods);
          }, (error) =>{
            reject(error);
          });
        });
     });
  }
}