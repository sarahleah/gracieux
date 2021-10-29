Graciuex - An online gallery
======================================

An experiment in using API's to generate content

**See it live at: https://gracieux.surge.sh/**

* [Technologies](#technologies-used)
* [Approach](#approach)
* [Features](#features)
* [Lessons Learned](#lessons-learned)
* [Setup](#setup)
* [Unsolved Problems](#unsolved-problems)
* [Future Additions](#future-additions)

Technologies used:
------------------

* React
* Axios
* React Router DOM
* CSS
* JavaScript

Approach:
---------

Coming into this project, I knew that I wanted to play with visual effects such as parallax, and that I wanted to use a chain of API's to find relevant data. I started with a board on figma (link below), and worked from a purely curious standpoint to see how much knowledge I could learn and solidify with this project. I now have a more firm understanding of useEffect and useRefs, as well as custom Hooks and memory leaks.

Here's a link to the initial wireframes I did: https://www.figma.com/file/NZsdzl0zU8Al2CosgjkI92/Final?node-id=2%3A3

Features: 
---------

- Masonry grid / Infinitely scrolling gallery of images from the Chicago Art Institute
- Content from the wikipedia search API and parse API
    - Initially, the program searches wikipedia for pages that contains the first five words of the given artwork.
    - It then looks for a result that contains the artists first name
    - If that isn't found it will return the first result, or if none, a link to make your own wiki page for it.

Lessons Learned:
----------------

During this project, I had to accept the lack of control I had over the data that I recieved back from exterior sources. Wikipedia, for example returns either HTML or Wikitext that has a very loosely defined structure that makes it difficult to find relevant data. This makes it extremely hard to style. That lack of organization made me think about my own design choices, and going forward will make me a more thoughtful data structurer.

Unsolved Problems:
------------------
- The formatted wiki content is not always relevant, and is not formatted in an extremely appealing manner. I could fix this in the future by cleaning the HTML result more rigorously.

Future Additions: 
-----------------

I would like to add:
* More interactions - favourite paintings, personal gallery, favourite artist etc.
