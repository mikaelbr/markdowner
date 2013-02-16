# Markdowner

Markdowner is a cloud based application for writing and sharing 
Markdown documents. One can also create and share 
[Remark](http://github.com/gnab/remark) documents, using Markdowner.

_This repository holds all files and information also pushed to the Heroku Cloud Service._

## Markdowner Document Examples

* See example of [public Remark document](http://www.markdowner.com/document/511b9fea4913db020000000e) on Markdowner
* See this README as a [shared Markdowner document](http://www.markdowner.com/document/511c01f5c9b1c70200000006).

## Credits

Markdowner uses [ACE.js](http://ace.ajax.org/) (made for [Cloud9 IDE](http://c9.io/)) as 
an editor. This is a highly flexible and well performing editor with 
different themes for syntax highlighting and many hot keys. 

To compile and show Markdown-files [Marked](https://github.com/chjj/marked) 
by [chjj](https://github.com/chjj/).

## Contribute

To contribute to Markdowner, you have to be able to run it locally. 

### Requirements

* Node.js & NPM
* Jam.js (```npm install -g jamjs```). Package manager for front-end code
* MongoDB
* Require.js (```npm install -g requirejs```)

### Run Markdowner

Markdowner config can be changed in the ```/config/default.js``` file, or by adding the necessary 
enviroment variables:

```
MARKDOWNER_CALLBACK        => URL to the Twitter OAuth callback dest.
MARKDOWNER_CONSUMER_KEY    => Twitter Consumer Key
MARKDOWNER_CONSUMER_SECRET => Twitter Consumer Secret
MONGOHQ_URL                => mongodb://example.local:27017/someDatabase # MONGO DB URL
NODE_ENV                   => production or development
```

**Note:** If the ```NODE_ENV``` variable is set to ```production```, all front-end code from 
the ```/dist``` folder is run. If ```NODE_ENV``` = ```development```, the ```/public``` 
directory is used. 

Once these are added you can run the application. If you have Foreman installed, just run
```
foreman start
```

In the project root. Also ```npm start``` or just ```node app```.


### Compile & Optimize Front-end Code

After changing the front-end source at ```/public```, it needs to be compiled. If a feature is added or a bug is fixed, 
compile the front-end as a part of the same commit. 

Use Require.js (```r.js```) to optimize the front-end code. From root run the following:

```
r.js -o app.build.js
```

This will populate the ```/dist``` folder with the optimized front-end code from the ```/public``` directory. 
