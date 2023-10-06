# AggieClubs
Welcome to my AggieWorks take-home, AggieClubs, a demo full-stack web app centered around searching for &amp; discovering active clubs at UC Davis! 

# How it works 
You can start by navigating to https://aggie-clubs.vercel.app/ and pressing the Sign Up button in the top right (enter any email/password combo). 
Once you're registered, you'll now have access to the Register Club button at the top, where you will be redirected to a form where you can fill out 
details of your club, and then it'll be added to the list in the home screen! 

While you're at the homescreen, feel free to check out some of the sample clubs I've added (based off real clubs at UCD) to see any upcoming events they
may have. Since you're signed in, you'll have the ability to not only register clubs, but also add events to clubs, resolve events, and also delete a club
and all its contents. You can also search for a specific club using the search bar.

If for any reason the clubs aren't showing up, just refresh the page.

# How this fulfils the take-home requirements 

1. Frontend uses React ✅
2. Backend is built with framework of choice ✅
   - I used Next.js for the backend, and Firebase (FireStore) for the cloud database 
3. Frontend pulls data from the backend ✅
   - On the homescreen, the club lists that show up are pulling data from various API folders (the backend) and displaying them 
4. User interacts with the frontend ✅
   - Users can click on the clubs to view more info
5. Frontend sends data to the backend ✅
   - Users can register new clubs, delete clubs, add events, and resolve events, all of which send data to the backend
6. Use the useState hook for state management on the front end ✅
   - I have multiple useStates in the front end files
7. Multiple modular React components for reusable page elements ✅
   - I have React componenets for page layout (Layout.tsx), buttons (AuthButtons.tsx), displaying the club information (ClubCard.tsx), and displaying the event info (EventCard.tsx)
8. Nicely styled page with layout, colors, icons, etc. ✅
   - I used Tailwind CSS to make the site look somewhat decent
9. Code is readable, organized, and clean ❌
    - I tried my best, but since this was my first time using React, Typescript, Next.js, Firebase (for auth), and pretty much my first time using everything,
      the code is quite messy and difficult to understand at places, and I'm positive that, to someone who is actually familiar with these things, there's a lot
      of stuff I did that's dumb/inefficient, and a lot of stuff that probably isn't even needed. Sorry! I think maybe as I become more experienced witht this stuff,
      and better understand the ins and outs of it, I'll get better at communicating what I was thinking in the code, and be able to oragnize it much better
10. Implement authentication in your application ✅
    - I used Firebase to make a sign up/sign in feature using email/password. When a user is signed in, they have the ability to register clubs, delete clubs, add events to clubs, and resolve events.
11. Give the user feedback in case of a failed request or bad input ✅
    - There are multiple places where this is the case. For example, if for whatever reason the club does not register properly, the user will get an alert saying "Failed to register the club" or,
      "error ocurred while registering the club."
12. Write the front and back end in Typescript ✅
13. Implement error handeling and logging in your backend ✅


# Things that need fixing 
- Sometimes, when you navigate to the homescreen by pressing the logo (the Aggie Clubs text in the top left), none of the clubs render and I need to refresh the page for them to show
- I would like to add a "time" property for events as well, which will be displayed side by side with the date
- As of right now, everyone who is signed in has the ability to register clubs, delete any club, and add/resolve events to any club. But ideally, only people who made the club should have the
  ability to add/resolve events and delete that club
- The codebase is a mess and I still don't fully understand much of it


# Oh wow, a club app... how original 
Yeah I know, this isn't the most creative idea in the world, but actually this wasn't my first idea. I had a different idea initially (my crackthecode repo), and 
just jumped straight into it. I got stuck in the middle, and out of frustration just scrapped the whole thing and started from scratch, this time with a different 
idea in mind. Got stuck again, scrapped it, came up with a new idea, and tried again. This whole process happened about 4 times I think before I finally settled on
something a little simpler than my other ideas, a Club App, and with this idea I was actually able to progres farther than any of my previous attempts. Again, since
this was my first time using a lot of this stuff, I probably shouldn't have jumped into doing something so ambitious the first time around, but I'm glad I did because I learned a lot from it. My original idea WILL exist someday though, I'll be back and try again later for sure. 
