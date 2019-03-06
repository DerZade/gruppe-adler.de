import { BlogEntry } from './BlogEntry';
import { TwitterUser } from './TwitterUser';

export const TWEET_TYPE = 'Tweet';
export const RETWEET_TYPE = 'ReTweet';


export interface TweetMedia {
    id: number;
    url: string;
    target: string;
}

interface TweetArguments {
    date: Date;
    caption: string;
    author: TwitterUser;
    media: TweetMedia[];
}

interface RetweetArguments extends TweetArguments {
    tweet: Tweet;
}

export class Tweet implements BlogEntry {
    public type: string = TWEET_TYPE;
    public date: Date;
    public caption: string;
    public author: TwitterUser;
    public media: TweetMedia[];

    constructor({ date, caption, author, media }: TweetArguments) {
        this.date = date;
        this.caption = caption;
        this.author = author;
        this.media = media;
    }
}

export class Retweet extends Tweet {
    public type: string = RETWEET_TYPE;
    public retweetedTweet: Tweet;

    constructor({ date, caption, author, tweet, media }: RetweetArguments) {
        super({date, caption, author, media});
        this.retweetedTweet = tweet;
    }
}
