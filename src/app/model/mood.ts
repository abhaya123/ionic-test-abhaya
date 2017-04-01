//All Modals POCO
export class Mood
{
    title: String;
    created: Date;
}

export class MoodTimingGroup
{
    title: String;
    moods: Mood[];
}