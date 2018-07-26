## wt-movie-sms

### Background
In my household, a debate begins every Friday night around 7pm:

*What do we watch on Netflix?*

I subscribe to various streaming services, and I'm too lazy to look
at each one, filter to my preferred genres, and determine what's new
and highly rated.

So I built this webtask to do that work for me. Now instead of wasting
time browsing, I receive an SMS every Friday night at 7 with a list
that looks like this:

> ```
> Grab yo' 🍿!
> Streaming this week:
>
> ---
> Aladdin         <-- Title
> 7.5/10 (4826)   <-- Avg Rating (& Rating Count)
> Genre: Comedy   <-- Genre(s)
> ---
> ...more movies...
> ---
> ```

### Feature List
- [x] Query [TMDb](https://www.themoviedb.org/) for recent high-rated films available in digital format.
- [x] Use [Twilio](https://twilio.com/) to send an SMS with a list of the top 5 films.
- [x] Run webtask every Friday at 7pm.
- [ ] Make preferred genres & rating threshold configurable.
- [ ] Store previously sent films (MongoDB) to make future queries smarter.
- [ ] Allow responses to SMS to indicate genre preference & which film was viewed.
- [ ] Unit tests.
