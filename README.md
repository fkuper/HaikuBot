# HaikuBot

This simple bot provides you with funny or interesting short videos from https://reddit.com/r/YoutubeHaiku.

The definition for 'Youtube Haiku' from the subreddit itself is as follows:
'Youtube Haiku: Any almost poetic video under 14 seconds. Don't ask me why 14 seconds;
it's just a number I have learned from experience.
Videos can still be poetic after 15 or longer, but no longer than 30 seconds.'

To use the bot type one of the following commands into your Discord server:

```!haiku```
This will prompt the bot to reply with a random video from /r/YoutubeHaiku.

```!haiku [search text]```
This will get a random video related to your search topic.

```!haiku-top```
This will get you a random video out of the top videos of the day.

```!haiku-top [time interval]```
Get a random top video of the: 'week', 'month', 'year' or of 'all' time.

```!haiku-text```
This one will get you a written haiku poem from /r/haiku.

```!haiku-help```
Prints help message.

## 🐳 Running in Docker

1. Build image via `docker build -t haikubot .`
2. Run image via 
   `docker run -v <path-to-auth.json>:/haikubot/auth.json -v <path-where-you-want-logs>:/haikubot/logs/ haikubot`

## License

MIT