---
id: mastering-javascript-02
title: "Mastering JavaScript — Image.staticWidth = 50; 2 Image.prototype.prototypeWidth = 55;…"
slug: mastering-javascript-02-mastering-javascript-image-staticwidth-50-2-image-prototype-
source: "Mastering JavaScript — The Complete Guide"
sourceSection: "1. Image.staticWidth = 50; 2 Image.prototype.prototypeWidth = 55;, 1. Circle.prototype.draw = function() { 2 ctx.beginPath(); 3 ctx.fillStyle ="
track: javascript
tier: premium
tags: [javascript, programming, advanced]
summary: "Whilst the syntax is still considered experimental (it’s not yet adopted by many Covers 2 sections: Image.staticWidth = 50; 2 Image.prototype.prototypeWidth = 55;, Circle.prototype.draw = function() { 2 ctx.beginPath(); ."
---
# Mastering JavaScript — Image.staticWidth = 50; 2 Image.prototype.prototypeWidth = 55;…

## 1. Image.staticWidth = 50; 2 Image.prototype.prototypeWidth = 55;

Field declarations

Whilst the syntax is still considered experimental (it’s not yet adopted by many
browsers), public and private field declarations are also worth knowing about —
as often you’ll be developing with a Babel which will transpile the syntax for
you.

Public field declarations

Let’s revisit our example with the JavaScript field declaration syntax:

1 class Image { 2 height = 0; 3 width; 4 constructor(height, width) { 5
this.height = height; 6 this.width = width; 7 } 8 }

The difference is our fields have been declared up-front. So our class definitions
become more self-documenting, and the fields are always present.

Note: the fields can be declared with or without a default value!

Private field declarations

When we use private fields, the definition can be refined like so:

1 class Image { 2 #height = 0; 3 #width; 4 constructor(height, width) { 5
this.#height = height; 6 this.#width = width; 7 } 8 }

Private fields (declared with a #) cannot be referenced outside of the class, only
within the class body. This ensures that your classes’ users can’t depend on
internals, which may change with version changes.

Note: Private fields cannot be created later through assignment. They can only
be declared up-front in a field declaration.

Child classes using ‘extends’

We can use the extends keyword with either class declarations or class
expressions to create a class as a child of another class.

1 class Vehicle{ 2 constructor(name) { 3 this.name = name; 4 } 5 6
sound() { 7 console.log(`${this.name} makes a sound.`); 8 } 9 } 10 class Car
extends Vehicle{ 11 constructor(name) { 12 super(name); // call the super
class constructor and \ 13 pass in the name parameter 14 } 15 sound() { 16
console.log(`The ${this.name} tooted its horn!`); 17 } 18 } 19 let c = new
Car('Volkswagen'); 20 c.sound(); // The Volkswagen tooted its horn!

If there is a constructor present in the subclass, it needs to first call super()
before using “this”.

Function-based “classes” may also be extended:

1 function Vehicle (name) { 2 this.name = name; 3 } 4 Vehicle.prototype.sound
= function () { 5 console.log(`${this.name} makes a sound.`); 6 } 7 class Car
extends Vehicle{ 8 speak() { 9 console.log(`The ${this.name} tooted its
horn!`); 10 } 11 } 12 let c = new Car('Volkswagen'); 13 c.sound(); // The

Volkswagen tooted its horn!

Note: classes cannot extend regular objects! If you want to inherit from an
object, use Object.setPrototypeOf():

1 const Vehicle = { 2 sound() { 3 console.log(`${this.name} makes a
sound.`); 4 } 5 }; 6 7 class Car{ 8 constructor(name) { 9 this.name = name;
10 } 11 } 12 13 let c = new Car('Volkswagen'); 14 c.sound(); // Volkswagen
makes a sound.

Species

If you want to return Array objects from an array class MyArray. You can do so
with the “species” pattern, which lets you override the default constructors.

If using methods such as map() it’ll return the default constructor. Then you’ll
want these methods to return a parent Array object, instead of the MyArray
object. Symbol.specieslets you do this, like so:

1 class MyArray extends Array { 2 // Overwrite species to the parent Array
constructor 3 static get [Symbol.species]() { return Array; } 4 } 5 6 let a = new
MyArray(1,2,3); 7 let mapped = a.map(x => x * x); 8 9 console.log(mapped
instanceof MyArray); // false 10 console.log(mapped instanceof Array); // true

The ‘super’ keyword

The super keyword is used to call corresponding methods of super class. This is
one advantage over prototype-based inheritance. Let’s see an example:

1 class Volkswagen { 2 constructor(name) { 3 this.name = name; 4 } 5 6
sound() { 7 console.log(`${this.name} makes a sound.`); 8 } 9 } 10 11 class
Beetle extends Volkswagen { 12 sound() { 13 super.sound(); 14
console.log(`${this.name} toots it's horn.`); 15 } 16 } 17 18 let b = new
Beetle('Herbie'); 19 b.sound(); 20 21 // Herbie makes a sound. 22 // Herbie toots
it's horn.

Mix-ins

Mix-ins are templates for classes. An ECMAScript class can only have a single
superclass, so multiple inheritance from tooling classes, for example, isn’t
possible. The functionality must be provided by the superclass.

A function with a superclass as input and a subclass extending that superclass as
output can be used to implement mix-ins in ECMAScript:

1 let calculatorMixin = Base => class extends Base { 2 calc() { } 3 }; 4 5 let
randomizerMixin = Base => class extends Base { 6 randomize() { } 7 };

A class that uses these mix-ins can then be written like this:

1 class First { } 2 class Second extends calculatorMixin(randomizerMixin(Firs\
3 t)) { ...

And that’s it! We’ve taken a deep dive into JavaScript classes including class
declarations, class expressions, constructors, instance properties, field
declarations, extends, species, super and mix-ins.

Understanding APIs

Application Programming Interfaces (APIs) can be defined as sets of functions
and procedures which are created by an operating system, application or other
service. They can be utilized by developers who wish to interact with those set
procedures when building their own applications. Essentially they’re created to
take away a lot of the more complex code and provide an easier syntax to work
with.

For example, you might want to add a live twitter feed into your website. By
working with the relevant methods provided by the Twitter API (via the
developer documentation), you could query twitter & display the latest tweets by
a particular user or hashtag.

APIs in JavaScript

JavaScript has numerous APIs available to it, which are typically defined as
either Browser APIs or Third Party APIs. Let’s take a look at each..

Browser APIs

Browser APIs are built into the browser — containing data from the browser.
With this data we can do many useful things, from simply manipulating the
window or element, to generating intricate effects using APIs such as WebGL.

Some of the more common browser APIs that you’ll encounter are:

APIs for document manipulation: The DOM (Document Object Model) is in
fact an API! It allows you to manipulate HTML and CSS — creating,
removing and changing HTML, dynamically applying new styles to your
page, etc.
APIs for fetching server data: Such as XMLHttpRequest and the Fetch API,
which we often use for data exchange and partial page updates. This
technique is often called Ajax.
APIs for manipulating graphics: Here we’re talking about Canvas and
WebGL, which allow you to programmatically update the pixel data
contained in an HTML <canvas> element to create 2D and 3D scenes.

Audio/Video APIs: Such as HTMLMediaElement and the Web Audio API.
You can use these to create custom controls for playing audio and video,
display text tracks like captions and subtitles along with your videos. For
audio you can add effects to audio tracks (such as gain, distortion etc).
Device APIs: Are for manipulating and retrieving data from device
hardware to use with web apps. Such as notifying the user that an update is
available.

Third party APIs

Third party APIs are not built into the browser, and you’ll need to retrieve their
code and information from somewhere else. By connecting with the third party
API you can access and then work with the methods provided by the API.

Some common third party APIs are:

Openweathermap.org: allows you to query weather data. For example, you
could capture a users location and display their current temperature.
Twitter API: you could display your latest tweets on your website.
Google Maps API: allows you to completely customize maps to include on
your web pages.
YouTube API: allows you to embed YouTube videos on your site, search
YouTube and automatically generate playlists.
Twilio API: this API provides a framework for building voice and video call

functionality into your app, sending SMS/MMS from your apps, and more.

So how do APIs work?

Despite different APIs working in different ways, they all share some common
base factors which we’ll take a look at now:

APIs are based on objects

The code you write to interact with APIs will use one or more JavaScript
objects. These objects serve as containers for the data the API uses (contained in
object properties), and the functionality the API makes available (contained in
object methods).

Let’s take a look at an example using the Web Audio API — the API consists of
a number of objects. For example, we have:

AudioContext this represents an audio graph that can be used to manipulate
audio playing inside the browser, and has a number of methods and properties
available to manipulate that audio.
MediaElementAudioSourceNode this represents an <audio> element containing
sound you want to play and manipulate inside the audio context.
AudioDestinationNode this represents the destination of the audio, i.e. the device
on your computer that will actually output it — usually either your speakers or
headphones.

How do these objects interact? Let’s look at the following HTML:

1 <audio src = "funkybeats.mp3"></audio> 2 3 <button class =
"paused">Play</button> 4 <br /> 5 <input type = "range" min = "0" max = "1"
step = "0.10" v\ 6 alue = "1" class="volume">

We have here an <audio> element which we use to embed our MP3 into the
page. We don’t include any default browser controls. Then we’ve added a
<button> that we’ll use to play and stop the music, and an <input> element of
type range, which we’ll use to adjust the track volume while it’s playing.

Let’s see the JavaScript for this example..

We’ll start by creating an AudioContext instance inside which to manipulate our
track:

1 const AudioContext = window.AudioContext || window.webkit\ 2
AudioContext; 3 const audioCtx = new AudioContext();

Then we’ll create constants that store references to our <audio>, <button>, and
<input>elements, and use the AudioContext.createMediaElementSource()
method to create an MediaElementAudioSourceNode representing the source of
our audio — the <audio>element it will be played from:

1 const audioElement = document.querySelector('audio'); 2 const playBtn =
document.querySelector('button'); 3 const volumeSlider =
document.querySelector('.volume'); 4 5 const audioSource =
audioCtx.createMediaElementSource(aud\ 6 ioElement);

Next we’ll include a couple of event handlers that toggle between play and pause
whenever the button is pressed, and reset the display back to the beginning when
the song has finished playing:

1 // Play + Pause audio 2 playBtn.addEventListener('click', function() { 3 //
check if context is in suspended state (autoplay p\ 4 olicy) 5 if (audioCtx.state
=== 'suspended') { 6
audioCtx.resume(); 7 } 8 9 // If track is stopped,
play it 10 if (this.getAttribute('class') === 'paused') { 11
audioElement.play(); 12
this.setAttribute('class', 'playing'); 13
this.textContent = 'Pause' 14 // If track is playing, stop it 15 } else if
(this.getAttribute('class') === 'playing') { 16
audioElement.pause(); 17
this.setAttribute('class', 'paused'); 18
this.textContent = 'Play'; 19 } 20 });
21 22 // If the track ends 23 audioElement.addEventListener('ended', function() {
24 playBtn.setAttribute('class', 'paused'); 25 this.textContent = 'Play' 26 });

Note: The play() and pause() methods being used are actually part of the
HTMLMediaElement API, and not the Web Audio API (though they’re closelyrelated!).

Now we create a GainNode object using the AudioContext.createGain() method,
which can be used to adjust the volume of audio fed through it, and create
another event handler that changes the value of the audio graph’s gain (volume)
whenever the slider value is changed:

1 const gainNode = audioCtx.createGain(); 2 3
volumeSlider.addEventListener('input', function() { 4
this.value; 5 });

gainNode.gain.value =

Then finally we connect the different nodes in the audio graph up, which is done
using the AudioNode.connect() method available on every node type:

1 audioSource.connect(gainNode).connect(audioCtx.destinatio\ 2 n);

The audio starts in the source, which is then connected to the gain node so the
audio’s volume can be adjusted. The gain node is then connected to the
destination node so the sound can be played on your computer (the
AudioContext.destination property represents whatever is the default
AudioDestinationNode available on your computer’s hardware, e.g. your
speakers).

API’s have recognizable entry points

Whenever you use an API, make sure you know where the entry point is! In the
Web Audio API — it’s the AudioContext object. This needs to be used to do any
manipulation whatsoever.

When using the Document Object Model (DOM) API — its features tend to be
found hanging off the Document object, or an instance of an HTML element that
you want to affect in some way, for example:

1 // Create a new em element 2 let em = document.createElement('em'); 3 4 //
Reference an existing p element 5 let p = document.querySelector('p'); 6 7 //
Give em some text content 8 em.textContent = 'Hello, world!'; 9 10 // Embed em
inside 11 p.appendChild(em);

The Canvas API also relies on getting a context object to use to manipulate
things. Its context object is created by getting a reference to the <canvas>

element you want to draw on, and then calling its
HTMLCanvasElement.getContext() method:

1 let canvas = document.querySelector('canvas'); 2 let ctx =
canvas.getContext('2d');

Anything that we want to do to the canvas is then achieved by calling properties
and methods of the context object (which is an instance of
CanvasRenderingContext2D), for example:

## 1. Circle.prototype.draw = function() { 2 ctx.beginPath(); 3 ctx.fillStyle =
this.color; 4 ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); 5 ctx.fill(); 6 };

APIs handle changes in state with events

When using the XMLHttpRequest object (each one represents an HTTP request
to the server to retrieve a new resource) we have a number of events available,
for example the load event is fired when a response has been successfully
returned containing the requested resource, and it is now available.

The following code provides an example of how this could be used:

1 let requestURL = 'https://example.com/json/usernames.json\ 2 '; 3 let request =
new XMLHttpRequest(); 4 request.open('GET', requestURL); 5
request.responseType = 'json'; 6 request.send(); 7 8 request.onload = function() {
9 let usernames = request.response; 10 populateHeader(usernames); 11
showNames(usernames); 12 }

The first five lines specify the location of resource we want to fetch, create a
new instance of a request object using the XMLHttpRequest() constructor, open
an HTTP GET request to retrieve the specified resource, specify that the
response should be sent in JSON format, then send the request.

The onload handler function then specifies what we do with the response. We
know the response will be successfully returned and available after the load
event has required (unless an error occurs), so we save the response containing
the returned JSON in the usernames variable, then pass it to two different
functions for further processing.

Note: In the next chapter, we’re going to take a look at fetching data from a
server in more detail.

And that’s API’s in a nutshell! We’ve looked at what APIs are, how they work,
we compared browser and third party APIs and finally we looked at some of the
common characteristics that many APIs share. I hope this introduction gave you
more of an understanding of what APIs are, and how we can use them in our
projects!

Fetching data from a server

In this chapter, we’ll be looking at how we can go about retrieving data from a
server. Modern websites and applications need to be able to do this seamlessly
— that is, update sections of a web page without needing to reload the entire
page. We’ll be looking at two technologies that make this possible:
XMLHttpRequest and the Fetch API.

The old way…

Page loading on the web using old methods was quite simple — you would send
a request for a website to a server, and if nothing went wrong, any assets that
made up the page would be downloaded and displayed on your computer or
device.

This was the way websites worked for years. However it had a number of flaws..
whenever you wanted to update any part of the page, for example, to display a
new set of products or submit a form, the entire page had to load again. This
practice is very resource-heavy and results in a poor UX, especially as pages
grow and become more complex.

The solution: AJAX

This problem was resolved as technologies were created that allowed web pages
to request small chunks of data (such as HTML, XML, JSON, or plain text) and
display them only when needed.

This is achieved by using APIs like XMLHttpRequest or the Fetch API. These
technologies allow web pages to directly handle making HTTP requests for
specific resources available on a server and formatting the resulting data as
needed before it is displayed.

This technique is what is called “Ajax”, or Asynchronous JavaScript and XML.
Originally it mainly used XMLHttpRequest to request XML data (hence the
“and XML”). However, these days you’d be more likely to use
XMLHttpRequest or Fetch to request JSON — but the result is still the same so
the term “Ajax” stuck.

Conceptually, Ajax involves using a web API as a proxy to more intelligently
request data, rather than just having the browser reload the entire page.

You can see it in action in just about every major website. When you play a new
video on YouTube for example, you’ll see the navigation, header and footer
sections don’t refresh — just the section containing the video.

Why is this important?

Page updates are much faster & you’ll spend less time wait for the page to
refresh, so the site feels faster and more responsive (page speed is also very
important for Google rankings and SEO!).
Less data is downloaded on each update, meaning less wasted bandwidth. Whilst
not a huge concern on desktops, it’s a major issue on mobile devices especially
in developing countries that don’t have fast internet.

Creating an Ajax request

In this section, we’re going to first use an XMLHttpRequest and then Fetch to
perform an Ajax request.

XMLHttpRequest

An XMLHttpRequest (often abbreviated to XHR) is actually quite an old
technology now — it was invented in the ‘90s by Microsoft, and has been in use
ever since.

To create an XHR request, you first need to create a new request object using the
XMLHttpRequest() constructor. You can call this object anything you like, in
our demo we’ll call it xhr. Like so:

1 let xhr = new XMLHttpRequest();

The next step is to initialize it using the open() method. Here we specify what
HTTP request method to use to request the resource from the network, as well as
the URL where it’s located. Here we’ll use the GETmethod and set the URL to a
url variable (which should store the address as a string).

We add this below the previous line:

1 xhr.open('GET', url);

Next, we’ll set up the type of response we are expecting as text. This isn’t
strictly necessary as XHR returns text by default — but it is a good idea to get
into this habit as you’ll no doubt be fetching other types of data in the future!
Now we add:

1 xhr.responseType = 'text';

Whenever we fetch a resource from a network we’re performing an
asynchronous operation. This means you have to wait for that operation to
complete (while the resource is returned from the network) before you can do
anything with that response, otherwise, an error will be thrown. With XHR we
can handle this using the onload event handler — this runs when the load event
fires (after the response has returned). The response data will be available in the
response property of the XHR request object.

Next, we create our function to handle the onload event & (in this case ) display
our xhr.status& xhr.response values:

1 xhr.onload = function() { 2 alert(`Loaded: ${xhr.status} ${xhr.response}`); 3
};

And finally, we need a send() method to run the request:

1 xhr.send();

Fetch

The Fetch API is a modern alternative that can serve as a replacement for XHR.
It was built to make asynchronous HTTP requests easy to do in JavaScript.

Let’s see a basic example of the syntax:

1 fetch(url) // Call the fetch function passing the url of \ 2 the API as a parameter
3 .then(function() { 4 // Your code for handling the data you get from the A\ 5
PI 6 }) 7 .catch(function() { 8 // This is where you run code if the server
returns a\ 9 ny errors 10 });

All we are doing here is fetching the URL that we want, by default fetch uses the
GET method — which is what we want in this case!

Let’s see some more fleshed out sample code:

1 fetch('http://example.com/songs.json') 2 .then(function(response) { 3
response.json(); 4 }) 5 .then(function(myJson) { 6

return

console.log(JSON.stringify(myJson)); 7 });

Here we are fetching a JSON file from the URL and then printing it to the
console. The simplest use of fetch() takes one argument — the path to the
resource you want to fetch — and returns a promise containing the response (in
the form of a JavaScript object).

To extract the JSON body content from the response, we use the
JSON.stringify(myJson)method. Then we can transform the response object into
an object that we can interact with.

Working with promises

Like many modern JavaScript APIs, Fetch uses promises. Though they are a bit
confusing at first, don’t worry too much about it for now. You’ll get used to
them!

Let’s look at the promise structure as it relates to our Fetch request:

1 fetch('http://example.com/songs.json') 2 .then(function(response) { 3
response.json(); 4 }) 5 .then(function(myJson) { 6
console.log(JSON.stringify(myJson)); 7 });

return

The first line is saying “fetch the resource located our URL”
(fetch('http://example.com/songs.json')) and “then run the specified function
when the promise resolves” (.then(function() { ... })). “Resolve” means “finish
performing the specified operation at some point in the future”.

The specified operation, in this case, is to fetch a resource from our specified
URL (using an HTTP request) and return the response for us to do something
with.

Effectively, the function passed into then() is a chunk of code that won’t run
immediately. Instead, it’ll run at some point in the future when the response has
been returned.

So which technique should you use?

XHR has been around for a long time now and has very good cross-browser
support. Fetch and Promises, on the other hand, are newer additions to the web
platform, although they’re supported well across the browser landscape, with the
exception of Internet Explorer.

If you need to support older browsers, then an XHR solution might be
preferable. If however you are working on a more progressive project and aren’t
as worried about older browsers, then Fetch would be a good choice.

And that’s it! We looked at how to start working with AJAX using techniques
such as XHR and Fetch to retrieve data from a server. And we looked at basic
examples of each! Hopefully, now you have a grasp of each & can start
incorporating async operations into your code!

An Introduction to REST APIs

REpresentational State Transfer (REST) is an architectural style that handles the
client-server relationship, with the purpose of aiming for speed and performance
by using re-usable components.

REST as a technology was introduced into the world in a 2000 doctoral
dissertation by Roy Fielding
(https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm). Nowadays it is
generally preferred to SOAP (Simple Object Access Protocol) as REST uses less
bandwidth and is simpler and more flexible for internet usage. We can use it to
fetch or give some information from a web service, this is done via an HTTP
request to the REST API.

What is a REST API?

A REST API is a way of easily accessing web services without having excess
processing. Whenever a RESTful API is called, the server will transfer to the
client a representation of the state of the requested resource.

In fact, we use this just about every day! If you’re trying to find videos about
biking on YouTube. You’d type “biking” into the YouTube search field, hit enter,
and you’ll then see a list of videos about biking. Conceptually, a REST API
works just like this! You search for something, and you get a list of results back
from the service that you’re requesting from.

An API is an application programming interface. It’s a set of rules that allow
programs to communicate with each other. The developer creates the API on the
server and allows the client to talk to it.

REST is what determines how the API looks. It is the rules that developers
follow when they create an API. One of these rules states that you should be
able to get a piece of data (a resource) when you link to a specific URL.

Each URL is called a request while the data sent back to you is called a response.

RESTful Architecture

So what are the basic features of REST?

Stateless: Meaning the client data is not stored on the server, the session is
stored client-side (typically in session storage).
Client<->Server: There is a separation of concerns between the front-end
(client) and the back-end (server). They operate independently of each other
and both are replaceable.
Cache: Data from the server can be cached on the client, which can improve
performance speed.
URL Composition: We use a standardized approach to the composition of
base URLs. For example, a GET request to /cities, should yield all the cities
in the database, whereas a GET request to /cities/seattle would render the
city with an ID of Seattle. Similarly, REST utilizes standard methods like
GET, PUT, DELETE and POST to perform actions. Which we’ll take a look
at in the next section!

So we can define a RESTful API as one that is stateless, it separates concerns
between client-server, it allows caching of data client-side and it utilizes
standardized base URLs and methods to perform the actions required to
manipulate, add or delete data.

REST in action

Let’s now take a closer look at how this is done! Our request is sent from the
client to the server via HTTP in the form of a web URL. Using either GET,
POST, PUT or DELETE. Then a response is sent back from the server in the
form of a resource, which could be anything like HTML, XML, Image, or JSON.
JSON is by far the most popular format, so we’ll be using that for our example.

Photo credit: https://antmedia.io

HTTP has five methods that are commonly used in a REST-based
architecture: POST, GET, PUT, PATCH, and DELETE. In fact, they
correspond to create, read, update, and delete (CRUD) operations
respectively. It should also be noted that there are other methods that are
less frequently used, such as OPTIONS and HEAD.

GET: This method is used to read (or retrieve) a representation of a
resource. If all is well, GET returns a representation in XML or JSON and
an HTTP response code of 200 (OK). In an error case, it most often returns
a 404 (NOT FOUND) or 400 (BAD REQUEST).
POST: This method is often utilized to create new resources. In particular,
it’s used to create subordinate resources. That is, subordinate to some other
(e.g. parent) resource. On successful creation, it returns HTTP status 201,
returning a location header with a link to the newly-created resource with
the 201 HTTP status.
PUT: It’s used for updating capabilities and also to create a resource (in the
case where the resource ID is chosen by the client instead of the server).
Essentially PUT is to a URL that contains the value of a non-existent
resource ID. A successful update returns 200 (or 204 if not returning any
content in the body) from a PUT. If using PUT for create, it returns HTTP
status 201 on successful creation.
PATCH: It’s used for modify capabilities. The PATCH request only needs to
contain the changes to the resource, not the complete resource. This is
similar to PUT, however the body contains a set of instructions describing
how a resource currently residing on the server should be modified to
produce a new version. So the PATCH body should not just be a modified
part of the resource but in some kind of patch language like JSON Patch or
XML Patch.

DELETE: Fairly self-explanatory, it’s used to delete a resource identified by
a URL. Upon successful deletion, it returns HTTP status 200 (OK) along
with a response body.

Working with REST data

Furthermore, it has become common practice for REST APIs to also return data
in a standard format. As mentioned the most popular format nowadays is JSON
(JavaScript Object Notation). The standardization of the formatting of the data is
another step towards uniformity in the way resources are interacted with on the
web, allowing for developers to solve problems and not spend their time in
configuration of the basic architecture!

When requesting data from an API you might get back something like this:

1 { 2 title: "Hi, I am JSON", 3 content: [ 4
chapter: "1", 5
page:
"100", 6
firstParagraph: "I am JSON, this is what I look l\ 7 ike when I am
returned from an API." 8 ], 9 author: "Bruce Smithesson" 10 }

This format allows for easy access to the data within JSON, using dot notation
such as data.title, which returns “Hi, I am JSON”.

Where can you find RESTful APIs? Everywhere!
Twitter - https://dev.twitter.com/twitterkit/android/access-rest-api
Google - https://developers.google.com/drive/v2/reference/

Open Weather Map - https://openweathermap.org/api
YouTube - https://developers.google.com/youtube/v3

Most of the popular services we use daily utilize a RESTful architecture for their
API service. So go forth & explore the world of adding API functionality to your
websites & apps!

And there we go! We’ve taken a look at what REST is, as well as the principles
which govern its architecture. We’ve looked at how REST works with APIs to
send and receive data from client to server & back again. We’ve also taken a
look at the JSON format, which we’ll most often be working with when
accessing and manipulating our data!

Promises

Promises are used in JavaScript to handle asynchronous operations. They
essentially represent an operation that hasn’t completed yet - hence the
name of ‘promise’.

They simplfy the process of dealing with multiple asynchronous operations, and
reduce the likelihood of “callback hell” which often leads to messy and
unmanageable code.

Why use promises?

A better way to handle asynchronous operations
Improved error handling
And, they make for much cleaner code!

Let’s take a look at how they work..

So a promise can be thought of as a placeholder for (an unknown) value that’s
expected whenever a promise is created. They allow you to associate event
handlers with an asynchronous action’s eventual success or failure.

This means that asynchronous methods return values in the same manner as
synchronous methods - instead of immediately returning a final value, they
return a promise to provide the value at some point in the future.

A promise can be in one of these states:

Pending: the initial state, when the operation hasn’t fulfilled or rejected
Fulfilled: the operation has successfully completed

Rejected: the operation has failed
Settled: the operation has either fulfilled or rejected

Let’s see how to create a promise:

1 let completed = true; 2 let promise = new Promise(function(resolve, reject) { 3
// perform an action 4 if (completed) { 5 resolve("It worked!"); 6 } 7 else
{ 8 reject(Error("It didn't work..")); 9 } 10 });

We can see that promise constructor takes one argument, a callback with two
parameters, resolve and reject. Within the callback you perform your desired
action (such as an ‘async’ operation), if it’s successful, call resolve, if not call
reject.

Note that in this example we reject with an Error object. It’s not mandatory, but
beneficial for certain debugging tools, as they capture a stack trace.

So how do we use this promise?

1 promise.then(function(result) { 2 console.log(result); // "It worked!" 3 },
function(err) { 4 console.log(err); // Error: "It didn't work.." 5 });

We can see then() takes two arguments, a callback for “success”, and a callback
for a “failure”. Both are entirely optional, you’re free to just add a callback for
either success or failure if you wish.

A promise is an object that returns a future value. It begins in the pending state
proceeds to either the fulfilled state or rejected state, before being considered
settled.

Async & defer

Whenever you load JavaScript from an HTML page, it’s important to be mindful
of the loading performance of the page. The page-load time largely depends on
where and how you add scripts to your HTML page.

In this chapter, we’re going to look at how we can use async and defer to control
the execution order of our scripts & optimize our page load speed!

Today, all modern browsers support the async and defer attributes on scripts.
These attributes tell the browser it’s safe to continue loading the page, while the
scripts are being downloaded.

<script>

Let’s start by defining how <script> works without any attributes applied. The
HTML file will load (aka be “parsed”) until the script file is found. At that point,
parsing will stop and a request will be made to fetch the file (if it’s located
externally). The script will then be executed before parsing is resumed.

<script async>

By adding the async attribute, the browser will download the file during HTML
parsing and it will pause the HTML parser to execute it when it has finished
downloading.

1 <script src="directory/script1.js" async></script> 2 <script
src="directory/script2.js" async></script>

Essentially, scripts with the async attribute are executed asynchronously.
Meaning the script is executed as soon as it’s downloaded, without blocking the
browser.

It’s also possible that (in the above example) script 2 could download and
execute before script 1.

<script defer>

When the defer attribute is added, the browser downloads the file during HTML
parsing and will only execute it after the parser has completed. defer scripts are
guaranteed to execute in the order that they appear in the document (i.e. first
script 1, then script 2). This also does not block the browser.

1 <script src="directory/script1.js" defer></script> 2 <script
src="directory/script2.js" defer></script>

Unlike async scripts, defer scripts are only executed after the entire document
has been loaded.

So when should I use each method?

Typically you’ll want to use async whenever possible, followed by defer in
certain circumstances. Here are some general rules to follow:

If the script is modular and does not rely on any scripts then use async.
If the script relies upon or is relied upon by another script then use defer.
If the script is small and is relied upon by an async script then use an inline
script with no attributes placed above the async scripts.

When it comes to the actual script placement within your document. The current
state-of-the-art is to put scripts in the <head> tag and use the async or defer
attributes. This allows your scripts to be downloaded ASAP without blocking
your browser!

The ‘this’ keyword

While working with JavaScript, you’ll inevitably come across the this keyword.
As a concept it can be quite tricky to grasp! Normally this refers to the object
that owns the method. However it’s meaning is entirely different — depending
on how the function is called!

In this chapter, we’ll be looking at this in detail.

A little background

Objects are the basic building blocks of JavaScript! And the this keyword will
always refer to an object. You can check it’s current value at every line of code
execution. The value of this is determined based on the code’s execution context.

Execution Context

JavaScript code is read and executed line by line. The environment (or scope)of
the line currently being executed is known as execution context.

Behind the scenes, JavaScript runtime is maintaining a stack of these execution
contexts and the context present at the top of this stack — is the one currently
being executed.

The object that this refers to changes every time the execution context is
changed.

This is why this can be difficult to understand! Let’s look at this in a number of
different contexts — so we can learn how it works!

“this” in Global Scope

If there is no current object, this refers to the global object. Within our browser
that happens to be the window object. It’s the top-level object which represents
the document.

Let’s test to confirm:

1 function testThis() { 2 console.log(this === window); 3 } 4 5 testThis(); 6 //
returns true 7 8 console.log(this === window) 9 // returns true

“this” when calling Function

The value of this remains as the global object if you’re calling a function:

1 window.check = "Hi! I'm the window object"; 2 3 function thisFunction() { 4
alert(this.check); // Hi! I'm the window object 5 alert(window === this); // true
6 } 7 8 thisFunction();

“this” in Methods

When we call a function as a method of an object, this refers to the object, which
is then known as the receiver of the function call.

In the following example, the method quote is inside an object called author. The
quotes‘ this value refers to author itself. So the author object will receive the
quote method call:

1 const author = { 2 name: "Oscar Wilde", 3 quote() { 4 console.log(`Be
yourself. Everyone else is taken. - $\ 5 {this.name}`); 6 } 7 }; 8 9
author.quote();

“this” with call() and apply()

A function’s this value is set implicitly, however we can also call a function with
an explicit this argument with call() and apply().

Essentially, call() and apply() run JavaScript functions as if they were methods
of another object.

1 function testThis(type) { 2 this.test = "I'm the "+type+"!"; 3 } 4 5 let
firstObject = {}; 6 testThis.call(firstObject, "firstObject"); 7 8
console.log(firstObject.test); 9 // I'm the firstObject 10 11 let secondObject = {};
12 testThis.apply(secondObject, ["secondObject"]); 13 14
console.log(secondObject.test); 15 // I'm the secondObject

The only difference is that call() expects a discrete number of parameters while
apply() can be passed an array of parameters.

Note: If you’re using call or apply outside of strict mode, then passing null or
undefined using call or apply will be ignored by the JavaScript engine. This is

one of the reasons why it is usually suggested to always write code in strict
mode!

“this” with bind()

The bind() method allows us to permanently tie a this argument to a value. So in
the below example, bind will create a new quote function and set its this value to
author.

1 const author = { 2 name: "Oscar Wilde", 3 quote() { 4 console.log(`Be
yourself. Everyone else is taken. - $\ 5 {this.name}`); 6 } 7 }; 8 9
setTimeOut(author.quote.bind(author), 1000);

By doing so, our this cannot be changed with the call or apply methods.

“this” inside an Arrow Function

Using this with an arrow function is different to any other kind of JavaScript
function. An arrow function uses the this value from its enclosing execution
context, since it does have one of its own.

An arrow function permanently captures the this value, preventing apply or call
from being able to change it later on.

For example:

1 const author = this; 2 3 const oscarWilde = () => { 4 console.log(this ===
oscarWilde); 5 }; 6 7 oscarWilde(); 8 // false

Here, we are storing the value of a this in a variable and then comparing the
value with a this value that is inside an arrow function.

An arrow function’s this value cannot be set explicitly! Also, the arrow function
will ignore any attempt to pass a value to this using methods like call, apply, and
bind. An arrow function will refer to the this value that was set when the arrow
function was created.

Note: An arrow function can also not be used as a constructor. So we cannot
assign properties to this inside an arrow function.

So now, you can figure out the value of this with these simple rules:

By default, this refers to global object — within the browser this is the window
object.
When a method is called as a property of object, this refers to the parent object.
When a function is called with a new operator, this refers to the newly created
instance.
When a function is called using call() and apply(), then this refers to the value
passed as first argument of the method.

Understanding Regex

A JavaScript Regular Expression (or Regex) is a sequence of characters that we
can utilize to work effectively with strings. Using this syntax, we can:

search for text in a string
replace substrings in a string
extract information from a string

Dating back to the 1950s, Regular Expressions were formalized as a concept for
pattern searching in string-processing algorithms.

JavaScript has regular expressions support directly built into the language. A
solid understanding of regular expressions will make you a much more effective
programmer. So let’s get started!

A very basic Regex pattern

Here’s a basic pattern:

1 let regex = /hello/; 2 3 console.log(regex.test('hello world')); 4 // true

We are simply matching the literal text with the test string. We’ll look at the
regex test method in detail shortly…

Why use Regular Expressions?

As mentioned, Regular Expressions are a way to describe patterns in string data.
We can use them to check a string of characters, for example, to look for an email address — by matching the pattern which is defined by our regular
expression.

Creating a Regular Expression

In JavaScript, we can create a Regular Expression in two ways: Either by using
the RegExp constructor or by using forward slashes / to enclose the regex
pattern.

The constructor method:

The syntax is like so:

1 new RegExp(pattern[, flags])

So for example:

1 let regexConst = new RegExp('abc');

The literal method:

The syntax is like so:

1 /pattern/flags

An example:

1 let regexLiteral = /abc/;

Note: flags are optional, we’ll look at these later in this chapter!

In the case where you need to create regular expressions dynamically, you’ll
need to use the constructor method.

In either case, the result will give a regex object — which will have the same
methods and properties attached to them, for our use.

Regular Expression Methods

When testing our regular expressions, we generally use one of two methods:
RegExp.prototype.test() or RegExp.prototype.exec().

RegExp.prototype.test()

We use this method to test whether a match has been found or not. It accepts a
string which we test against a regular expression and returns either trueor false,
depending if the match is found or not.

1 let regex = /hello/; 2 let str = 'hello world'; 3 let result = regex.test(str); 4 5
console.log(result); 6 // returns 'true' as hello is present in our string

RegExp.prototype.exec()

We use this method to receive an array of all the matched groups. It accepts a
string that we test against our regular expression.

An example:

1 let regex = /hello/; 2 let str = 'hello world'; 3 let result = regex.exec(str); 4 5
console.log(result); 6 // returns [ 'hello', index: 0, input: 'hello world', gro\ 7 ups:
undefined ]

In this example, ‘hello’ is our matched pattern, index is where the regular
expression starts & input is the string that was passed.

For the rest of the article, we’ll be using the test() method.

The Power of Regex

We’ve so far seen how to create simple regular expression patterns. This is really
just the tip of the iceberg. Let’s now take a dive into the syntax to see the full
power of regular expressions for handling more complex tasks!

An example of a more complex task would be if we needed to match a number
of email addresses. By using the special characters defined in the syntax — we
can achieve this!

Let’s take a look now so we can more fully grasp & therefore utilize regular
expressions in our programs.

Flags:

In any regular expression, we can use the following flags:

g: matches the pattern multiple times
i: makes the regex case insensitive
m: enables multi-line mode. Where ^ and $ match the start and end of the entire
string. Without this, multi-line strings match the beginning and end of each line.
u: enables support for unicode
s: short for single line, it causes the . to also match new line characters

Flags may also be combined in a single regular expression & the flag order
doesn’t matter. They are added at the end of the string in regex literals:

1 /hello/ig.test('HEllo') 2 // returns true

If using RegExp object constructors, they’re added as the second parameter:

1 new RegExp('hello', 'ig').test('HEllo') 2 // returns true

Character groups

Character set ‘abc’

We use character sets [abc] to match different characters in a single position.
They match any single character in the string with the characters inside the
brackets:

1 let regex = /[hc]ello/; 2 3 console.log(regex.test('hello')); 4 // returns true 5 6
console.log(regex.test('cello')); 7 // returns true 8 9
console.log(regex.test('jello')); 10 // returns false

Negated character set

[^abc] - they match anything that is not enclosed in the brackets:

1 let regex = /[^hc]ello/; 2 3 console.log(regex.test('hello')); 4 // returns false 5 6

console.log(regex.test('cello')); 7 // returns false 8 9
console.log(regex.test('jello')); 10 // returns true

Ranges

If we want to match all of the letters of an alphabet in a single position, we can
use ranges [a-z]. For example: [a-j] will match all the letters from a to j. We can
also use digits like [0–9] or capital letters like [A-Z]:

1 let regex = /[a-z]ello/; 2 3 console.log(regex.test('hello')); 4 // returns true 5 6
console.log(regex.test('cello')); 7 // returns true 8 9
console.log(regex.test('jello')); 10 // returns true

If at least one character exists in the range we test, it’ll return true:

1 /[a-z]/.test('a') // true 2 /[a-z]/.test('1') // false 3 /[a-z]/.test('A') // false (as our
range is in lower cas\ 4 e) 5 /[a-c]/.test('d') // false 6 /[a-c]/.test('cd') // true (as 'c'
is in the range)

Ranges can also be combined using -:

1 /[A-Z-0-9]/ 2 3 /[A-Z-0-9]/.test('a') // false 4 /[A-Z-0-9]/.test('1') // true 5 /[AZ-0-9]/.test('A') // true

Multiple range item matches

We can check if a string contains one or only one character in a range. Start the
regex with ^ and end with$ :

1 /^[A-Z]$/.test('A') // true 2 /^[A-Z]$/.test('AB') // false 3 /^[A-Z]$/.test('Ab') //
false 4 /^[A-Z-0-9]$/.test('1') // true 5 /^[A-Z-0-9]$/.test('A1') // false

Meta-characters

Meta-characters are characters with a special meaning. Let’s take a look at some

of these here:

\d : matches any digit, being[0-9]
\D: matches any character that is not a digit, effectively[^0-9]
\w: matches any alphanumeric character (plus underscore), equivalent to [A-Zaz_0-9]
\W: matches any non-alphanumeric character, so anything except [^A-Za-z_0-9]
\s: matches any whitespace character: spaces, tabs, newlines and Unicode spaces
\S: matches any character that is not a whitespace
\0: matches null
\n: matches a newline character
\t: matches a tab character
\uXXXX: matches a unicode character with code XXXX (requires the u flag)
.: matches any character that is not a newline char (e.g. \n) (unless you use the s
flag, explained later on)
[^]: matches any character, including newline characters. It’s very useful on
multi-line strings

Quantifiers

Quantifiers are symbols that have unique meaning in regex.

Let’s see them in action:

+Matches the preceding expression 1 or more times:

1 let regex = /\d+/; 2 3 console.log(regex.test('1')); 4 // true 5 6
console.log(regex.test('1122')); 7 // true

*Matches the preceding expression 0 or more times:

1 let regex = /\d+/; 2 3 console.log(regex.test('1')); 4 // true 5 6
console.log(regex.test('1122')); 7 // true

?Matches the preceding expression 0 or 1 time, that is preceding pattern is
optional:

1 let regex = /hii?d/; 2 3 console.log(regex.test('hid')); 4 // true 5 6
console.log(regex.test('hiid')); 7 // true 8 9 console.log(regex.test('hiiid')); 10 //
false

^Matches the beginning of the string, the regex that follows should be at the start
of the test string:

1 let regex = /^h/; 2 3 console.log(regex.test('hi')); 4 // true 5 6
console.log(regex.test('bye')); 7 // false

$ Matches the end of the string, the regex that precedes it should be at the end of
the test string:

1 let regex = /.com$/; 2 3 console.log(regex.test('test@email.com')); 4 // true 5 6
console.log(regex.test('test@email')); 7 // false

{N} Matches exactly N occurrences of the preceding regex:

1 let regex = /hi{2}d/; 2 3 console.log(regex.test('hiid')); 4 // true 5 6
console.log(regex.test('hid')); 7 // false

{N,} Matches at least N occurrences of the preceding regular expression.

1 let regex = /hi{2,}d/; 2 3 console.log(regex.test('hiid')); 4 // true 5 6
console.log(regex.test('hiiid')); 7 // true 8 9 console.log(regex.test('hiiiid')); 10 //
true

{N,M} Matches at least N occurrences and at most M occurrences of the
preceding regex (when M > N).

1 let regex = /hi{1,2}d/; 2 3 console.log(regex.test('hid')); 4 // true 5 6
console.log(regex.test('hiid')); 7 // true 8 9 console.log(regex.test('hiiid')); 10 //
false

X|Y Alternation matches either X or Y:

1 let regex = /(red|yellow) bike/; 2 3 console.log(regex.test('red bike')); 4 // true 5
6 console.log(regex.test('yellow bike')); 7 // true 8 9
console.log(regex.test('brown bike')); 10 // false

Note: To use any special character as a part of the expression, for example if you
want to match literal + or ., then you’ll need to escape them with a backslash \.
Like so:

1 let regex = /a+b/; 2 // this doesn't work 3 4 var regex = /a\+b/; 5 // this works!
6 7 console.log(regex.test('a+b')); 8 // true

Reviewing Regex

With these concepts fresh in our minds, let’s review what we’ve learned!

Match any 10 digit number:

1 let regex = /^\d{10}$/; 2 3 console.log(regex.test('4658264822')); 4 // true

So \d matches any digit character. {10} matches the previous expression, in this
case \d exactly 10 times. So if the test string contains less than or more than 10
digits, the result will be false.

Match a date with the following format:

DD-MM-YYYYor DD-MM-YY

1 let regex = /^(\d{1,2}-){2}\d{2}(\d{2})?$/; 2 3 console.log(regex.test('01-012000')); 4 // true 5 6 console.log(regex.test('01-01-00')); 7 // true 8 9
console.log(regex.test('01-01-200')); 10 // false

Here we’ve wrapped the entire expression inside ^and $, so that the match spans
the entire string. ( is the start of first sub-expression. \d{1,2} matches at least 1
digit and at most 2 digits. - matches the literal hyphen character. ) is the end of
first sub-expression.

Then {2} matches the first sub-expression exactly 2 times. \d{2} matches
exactly 2 digits. (\d{2})? matches exactly 2 digits. However it’s optional, so
either year contains 2 digits or 4 digits.

And there we go! We’ve examined Regular Expressions from the very basics
right through to more advanced implementations. Including both the literal and
constructor methods, testing methods, flags and character syntax.

Regular expressions can indeed be fairly complex! However, taking the time to
learn the syntax will greatly help you to identify the regex patterns more easily.
Any new confidence you gain will surely have you ready to conquer the next
obstacle you encounter on your coding journey!

You did it!

Congratulations for completing this book! You’re now equipped with a ton of
fresh knowledge that’ll help you on your way to true JavaScript mastery!

The market demand for JavaScript expertise is unprecedented & looks set to
continue to increase into the foreseeable future. It goes without saying that by
learning JavaScript, you’ll truly set yourself up for success!

So go ahead and see what you can start doing with JavaScript yourself!

Interested in my other books? Check them out:

The CSS Guide: The Complete Guide to Modern CSS https://www.easeout.co/books/the-css-guide/
Getting SASSY: A Practical Guide to SASS https://www.easeout.co/books/getting-sassy/

You can sign up here to be notified about my future releases!

Good luck!

Tim
