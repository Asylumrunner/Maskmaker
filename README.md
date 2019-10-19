# Maskmaker
A Node.js API for generating non-player characters for tabletop role-playing games

## Table of Contents
1. [Overview](https://github.com/Asylumrunner/Maskmaker#overview)
2. [Tech Stack](https://github.com/Asylumrunner/Maskmaker#tech-stack)
3. [Character Generation](https://github.com/Asylumrunner/Maskmaker#character-generation)
4. [Endpoint Documentation](https://github.com/Asylumrunner/Maskmaker#endpoint-documentation)
5. [Additional Scope](https://github.com/Asylumrunner/Maskmaker#additional-scope)
6. [Deployment Notes](https://github.com/Asylumrunner/Maskmaker#deployment-notes)
7. [To-Do List](https://github.com/Asylumrunner/Maskmaker#to-do-list)

## Overview
I run a number of tabletop RPGs for a variety of groups, and one of the hardest parts for me is coming up with distinct personalities for non-player characters (NPCs) on the spot. So, I decided to write myself an application that could automatically generate NPCs, at least in the broad strokes, on my behalf.

This API has two core pieces of functionality. The first is the ability to generate characters, taking in a number representing the number of characters to generate, and outputting a list of that many JSON objects, each containing a name, a set of personality traits, and a list of attributes (tabletop RPGs usually use statistical attributes to represent things like a character's intelligence or strength) described in relative terms. Optionally, a user may supply a region from which to choose names, a gender for the characters, and a list of custom attribute titles to use (if no attributes are given, the API defaults to the classic Dungeons and Dragons attributes).

A separate endpoint also allows users to submit a list of their own pregenerated names, in which case the API will randomly assign names from that list to the generated characters instead of producing names of its own. This ties in to the API's second piece of functionality: name generation.

By posting to a /markov endpoint with a list of example names, the API can also produce a Markov Chain trained on that test data set. This Markov Chain is then returned to the user, who can then provide it as an argument in the body to another endpoint, which takes a Markov Chain (it doesn't need to be one generated by the API, as long as it fits the format) and produces a number of names with it, of variable names within a minimum and maximum defined in the body.

There are two primary consumers I plan to build for this application. The first is a Discord bot which will consume this API and use it to generate NPCs on the fly for a GM of an online tabletop game. The second application is a consumer which will take the output of this API and convert it into CSV tables which can be used with an application called [CardMaker](https://github.com/nhmkdev/cardmaker), which can take csvs and turn them into printable card sheets. This is useful for physical play sessions, in which I'd like to have a "deck" of NPCs ready to go, but would prefer to not be shackled to electronics while I play.

## Tech Stack
The project that would eventually become Maskmaker was originally written in Python 3. However, as a learning exercise, I decided to port it to Node.js 10, allowing me to leverage the extremely powerful Express library to create the API with relative ease. This project also leverages Claudia, an automated pipeline wrapped around aws-serverless-express which allows me to deploy Maskmaker to AWS Lambda and publish the API through API Gateway.

## Character Generation
Characters generated by this application have three primary components. The first is a name, randomly selected from a list generated by hitting the random name API provided by [http://uinames.com](http://uinames.com). These names are originally given in their native alphabet, so Node's unidecode package is used to convert them to printable English, a method that still produces some occasional bugs but is generally successful.

Characters also have a set of three personality traits randomly assigned to them. These are pulled from a list of character traits randomly, such that no trait is shared between characters.

The last aspect of a character are approximate statistical attributes. Most RPGs use some sort of numerical system to represent characters' attributes, but using any of those systems in this application would limit its usefulness. Instead, the user may enter the set of attributes they want to use, or use the default D&D stats. Then, the application will go through every attribute for every character, and decide if the character is, in that stat, pathetically inept, lower than average, average, better than average, or exceptional. The numbers are weighted such that average score are more likely than non-average scores.

## Endpoint Documentation

#### GET /api/health
Health endpoint. Returns "Application is up and healthy!"

#### POST /api/npcs
Generate random NPCs using a pool of arbitrary names and traits, and randomly assigned attributes

##### Request Template:
```
{
    number (int): REQUIRED - a number of characters to generate between 1 and 500,
    region (string): A region to use for the names generated. A list of usable regions can be found in the [uinames documentation](https://github.com/thm/uinames/blob/master/uinames.com/api/names.json). Leaving default will include all regions in name generation,
    gender (string): The uinames API used to generate names separates its names into male and female. This value can be given to only generate names from one of those subsets. Valid options are male and female. Leaving default will use both.
    attributes ([string]): An array of strings representing the attributes which will be generated for each character. Can be a list between 1 and 12 strings. Leaving default will use the D&D attribute block of Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma
}
```

##### Response Body Template:
```
{
    "characters": [
        {
            "name": string,
            "traits": [
                "trait 1",
                "trait 2",
                "trait 3"
            ],
            "attribute": [
                "attribute 1": "value",
                "attribute 2": "value",
                ...
                "attribute n": "value"
            ]
        }
    ]
}
```


#### POST /api/npcs/customnames
Generate random NPCs using a pool of names provided by the user, using arbitrary traits and randomly assigned attributes

##### Request Template:
```
{
    number (int): REQUIRED - a number of characters to generate between 1 and 500,
    names ([string]): REQUIRED - a list of pregenerated names to use to generate the characters. You must provide at least as many names as number of characters to generate
    attributes ([string]): An array of strings representing the attributes which will be generated for each character. Can be a list between 1 and 12 strings. Leaving default will use the D&D attribute block of Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma
}
```

##### Response Body Template:
```
{
    "characters": [
        {
            "name": string,
            "traits": [
                "trait 1",
                "trait 2",
                "trait 3"
            ],
            "attribute": [
                "attribute 1": "value",
                "attribute 2": "value",
                ...
                "attribute n": "value"
            ]
        }
    ]
}
```


#### POST /api/markov
Take a list of example names and use them to generate a Markov Chain, which can be used to generate new names

##### Request Template:
```
{
    examples([string]): REQUIRED - a list of names to generate the Markov Chain with. Must contain between 20 and 300 unique names. Each individual name must consist only of alphanumeric characters
}
```

##### Response Body Template:
A valid Markov Chain (see below)

#### POST /api/markov/createnames
Take a list of example names and use them to generate a Markov Chain, which can be used to generate new names

##### Request Template:
```
{
    chain ([[float]]): REQUIRED - A valid Markov Chain (see below),
    minlength (int): REQUIRED - The minimum length of name to generate. Must be an integer between 1 and 20,
    maxlength (int): REQUIRED - The maximum length of name to generate. Must be greater than minlength, and a length between 2 and 20,
    count (int): REQUIRED -  The number of names to generate. Must be between 1 and 10.
}
```

##### Response Body Template:
```
{
    "names": [
        "name1",
        "name2",
        "name3",
        ...
        "nameN"
    ]
}
```

### Valid Markov Chains
To understand the fundamentals of what a Markov Chain is and how it works, the [Brilliant](https://brilliant.org/wiki/markov-chains/) page on them is an excellent introduction. The rest of this section is written assuming you understand the concept of a Markov Chain.

For the purposes of this API, a valid Markov Chain is a 27 by 26 array of arrays, the axes representing the letters of the alphabet. The prior states list is one longer than the list of future states to account for the Starting State, representing the probability of a given letter being the first letter of a name.

For any given cell in the Markov Chain `chain[x][y]`, the value of the cell is the probability of the letter represented by index y following the letter represented by index [x]. So, for example:

* `chain[0][0]` is the probability of the first letter of a word being A
* `chain[1][0]` is the probability of an A being followed by another A
* `chain[17][20]` is the probability of a Q being followed by a U

Because of the existence of the Starting State, it should be noted that the index-to-letter mapping varies by 1 between the priors and the future state.

Because these cells contain probabilities, the sum of all values in a column should sum to 1 (it actually can be more than 1, the code will automatically clamp the last value in the column to whatever value makes it sum to 1).

## Additional Scope
While programmatic handling of the Markov Chain objects is simple, manually using the Markov Chain endpoints is kind of a pain. As both a potential for further learning and to increase usability, I think it would be useful to be able to store those chains in a database. Then, when I want to use a Markov Chain to generate names, I can simply provide a database key as an argument to the API and have it withdraw it manually. This has a few key advantages:
* As previously mentioned, it makes building payloads for the Markov name generation endpoint easier. You just need to provide a key and some database credentials instead of a 27 x 26 2D array
* I only need to validate the chain once, when I insert it into the database. I can assume anything I pull out has already been validated
* I can use the same chain over and over again over a long period of time, conducive to RPG play (a single RPG campaign can take years)

To implement this, I'd probably want to avoid any significant performance hits to the API that I can. So, when I generate a Markov Chain, I'd probably want to post it somewhere (probably an S3 bucket?) for another Lambda function to pick up and process without delaying the API execution time any further.

Further optimization could be done by caching Markov Chains retrieved from said database, but until this API is used by more people than, well, me, that degree of optimization feels like overkill. Maybe as a learning exercise.

This API also has some dormant frameworks for creating authorization endpoints. While I could see that being useful if I start dealing with database management, maybe setting up some admin endpoints to do things like clear the database or view saved Markov chains, for now it isn't *aggressively* useful, so I'm going to leave it blank.

## Deployment Notes
This project has been set up to deploy to AWS fairly simply using Claudia.js. There are NPM scripts set up to deploy to your own AWS account with `npm run setup`, as well as update it with `npm run deploy`. Make sure you have [Claudia.js set up](https://claudiajs.com/tutorials/installing.html), and lemme know in an issue if something is wonky.

To run locally, just run index.js with an environment variable called ENVIRONMENT set to 'local'.

## To-Do List
* Write unit tests for Markov chain generation
* Clean up the NPC generation unit tests
* Write functional tests that actually hit the API