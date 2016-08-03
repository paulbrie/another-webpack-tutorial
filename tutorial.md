## Why?

I realized that many developers were using webpack and its hot reloading capabilities using settings which were already provided with the projects and without understanding precisely how this tool was working. Therefore, this tutorial has been written  with extensive explanations to clarify all their questions.

## What is webpack?

Webpack is a module bundler. It takes modules and their dependencies and emits static assets representing those modules. Learn more about webpack here: <a href="https://webpack.github.io/">https://webpack.github.io/</a>. If you haven't done it yet, I strongly suggest that you read webpack's <a href="http://webpack.github.io/docs/motivation.html" target="_blank">motivation</a> section.

## Tutorial

### Step 1 - basic setup

First  we will install webpack using [npm](https://www.npmjs.com/). For now we will use the global flag <em>-g</em> so that we can have the webpack command available globally.

&nbsp;

<pre>npm install webpack -g</pre>

Then we will initialize a new project.

<pre>npm init</pre>

The latest command will create a *package.json* file at the root of the folder from which you run the command. Here is my final output:

```javascript
{
  "name": "webpack-tutorial",
  "version": "1.0.0",
  "description": "This is a basic tutorial for webpack with hot reload capabilities",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" &amp;&amp; exit 1"
  },
  "author": "Paul BRIE", "license": "ISC"
}
```

In the `main` section of *package.json* I've set *app.js* as my main file for this project. Let's create the file:
```javascript
// app.js
console.log('my app');
```
In my folder I should have at this point the following structure:
```
app.js
package.json
```
Let's run our app. The output should be `my app`.
```
node app.js
> my app
```

### Step 2 - adding modules
Let's add 2 modules, **module1.js** and **module2.js** and load them into our app. To make our project look more clean we will save them in the **src/ ** subfolder.
```javascript
// src/module1.js
module.exports = {
  doSomething: function() {
    console.log("I'm the module 1");
  }
}
```

```javascript
// src/module2.js
module.exports = {
  doSomething: function() {
    console.log("I'm the module 2");
  }
}
```
Let's also move app.js in the src/ subfolder and update it as follows:
```javascript
// src/app.js

var module1 = require('./module1');
var module2 = require('./module2');

module1.doSomething();
module2.doSomething();
```
My folder structure should look now like this:
```
src/
---/app.js
---/module1.js
---/module2.js
package.json
```
Let's run our app.
```
node src/app.js
> I'm the module 1
> I'm the module 2
```
### Step 3 - our first bundle
Let's create a webpack config file. For now it will have the following attributes:

 * entry: a string indicating the main file from which webpack should build the bundle
 * output:
	* path: a string indicating the folder where the bundle should be saved
	* filename: the name of bundle file</li>

```javascript
// webpack.config.js
module.exports = {
  entry: './src/app.js',
  output: {
    path: './bin',
    filename: 'app.bundle.js'
  }
};
```
My folder structure should look now like this:
```
bin/
src/
---/app.js
---/module1.js
---/module2.js
package.json
webpack.config.json
```
Let's run webpack. Since no arguments are passed to the command it will search for the existence of webpack.config.js and if it founds the file it will use it.
<pre>webpack</pre>
![](https://paulbrie.files.wordpress.com/2016/08/capture-d_ecc81cran-2016-08-01-acc80-14-00-34.png)

Webpack has build the bundle in *bin/app.build.js*. My updated folder structure is:
<pre>bin/
---/app.build.js
src/
---/app.js
---/module1.js
---/module2.js
package.json
webpack.config.json

### Step 4 - integrating the bundle in a html page
Now that my bundle is built I want to be able to serve it to a html page. For this purpose webpack offers a great tool which is <a href="http://webpack.github.io/docs/webpack-dev-server.html" target="_blank">webpack-dev-server</a>. It is available under another npm package. Let's install it:

<pre>npm install webpack-dev-server -g</pre>

Webpack-dev-server  is a small web server based on Express.js.  As a first step lets launch it from the command line. By default it will try launch on http://localhost:8080.

<pre>webpack-dev-server</pre>

Below is the output of my console:

![Output of my console](https://paulbrie.files.wordpress.com/2016/08/capture-d_ecc81cran-2016-08-02-acc80-17-02-18.png)

Let's take a closer look to the 3 first lines of my console:

<pre>http://localhost:8080/webpack-dev-server/
webpack result is served from /
content is served from /var/www/tutorial/part1</pre>

**Line #1**: webpack-dev-server has exposed a first route  which displays this:
![test](https://paulbrie.files.wordpress.com/2016/08/capture-d_ecc81cran-2016-08-02-acc80-17-10-10.png)"

It is an out-of-the-box  UI provided by webpack-dev-server. We won't enter into details about it in this article but it basically allows you to see the bundle and to experience the hot reload capabilities without any special configuration.

**Line #2: ** `webpack result is served from /`. This line means that our file *bin/app.bundle.js* (which is our "webpack result")  will be served from the root of the server.  Therefore I can access our file at this address: http://localhost:8080/app.bundle.js

![](https://paulbrie.files.wordpress.com/2016/08/capture-d_ecc81cran-2016-08-02-acc80-17-19-13.png)

**Line #3**: `content is served from /var/www/tutorial/part1`. This means that http://localhost:8080/ will display all the content of my server starting from the folder in which I launched my command.

And this is what you should get in the browser:
![](https://paulbrie.files.wordpress.com/2016/08/capture-d_ecc81cran-2016-08-02-acc80-17-00-30.png)

Wow, that's a lot of things! It is a bit overwhelming at first especially because you can access the bundle with http://localhost:8080/app.bundle.js and http://localhost:8080/bin/app.bundle.js.  We will deal with this particularity a bit later.

For now, the only thing we still need is a HTML file that will load our bundle. Let's add an *index.html* file in our  folder.
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Webpack-dev-server tutorial</title>
  </head>
  <body>
    <h1>Webpack-dev-server tutorial</h1>
    <!-- Note that app.bundle.js is now coming after the /assets/ path 
        provided by webpack-dev-server -->
    <script src="app.bundle.js"></script>
  </body>
</html>
```
The new folder structure is:
<pre>bin/
---/app.build.js
src/
---/app.js
---/module1.js
---/module2.js
index.html
package.json
webpack.config.json</pre>

And this moment this is what you should have in your browser. As you can see, the *app.bundle.js* file has been correctly loaded.

![](https://paulbrie.files.wordpress.com/2016/08/capture-d_ecc81cran-2016-08-01-acc80-20-47-41.png)

Well, well, if you are reading this line, and if you followed all the previous steps, congratulations to you! You've got a working basic setup with webpack and webpack-dev-server.
### Step 5 - hot reload

Now we're arriving to the interesting part: the famous hot reloading feature!

For many years front-end developers did the same sequence of actions again and again: change a file on the server - reload the page in the browser and check for the result. Tiresome!  And inefficient too, but that was then only available option. Now with webpack and the awesome hot reload feature this old times are over. Actually, this is even better than one would think because it does not refresh all the page: the feature is also capable of reloading only chunks of code that have been affected by the last changes in your files without breaking your application logic! I know that young developers might find that "just" normal, but I personally find this amazing given all the years spent doing it with the old technique...

Let's discover how it works.

Before continuing I will do a little tweak to our code to have a cleaner configuration: I will map the access to our bundle using the `publicPath: '/assets/'` option.

```javascript
// webpack.config.js
module.exports = {
  entry: './src/app.js',
  output: {
    path: './bin',
    publicPath: '/assets/',
    filename: 'app.bundle.js'
  }
};
```

Therefore I have to update my *index.html* file as well.
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Webpack-dev-server tutorial</title>
  </head>
  <body>
    <h1>Webpack-dev-server tutorial</h1>
    <!-- Note that app.bundle.js is now coming after the /assets/ path 
        provided by webpack-dev-server -->
    <script src="assets/app.bundle.js"></script>
  </body>
</html>
```

Now the only thing that I have to do is to add the `--inline --hot` options to my webpack-dev-server command.

Before launching the command let's save locally the *webpack* and  *webpack-dev-server* modules because the hot reload function will need it and it will be easier to have all the dependencies marked in the *package.json* file.

<pre>npm install webpack webpack-dev-server --save-dev</pre>

Then:

<pre>webpack-dev-server --inline --hot</pre>

The `--inline` option will make webpack-dev-server to embed into our bundle a client that will use web sockets to communicate with the server. Each time a files has been modified and the bundle has been rebuilt, the server will notify the client and will trigger an automatic update.

The `--hot option` - if possible - will try to update parts of the application without reloading all the page.

Open your browser at http://localhost:8080/. If you open your console, you should have something like this:

![](https://paulbrie.files.wordpress.com/2016/08/capture-d_ecc81cran-2016-08-02-acc80-00-34-58.png)

You can see 4 lines in the console. The second and the third are coming from our own code but the first and fourth lines are coming from webpack-dev-server. `[HMR]` stands for "Hot Module Replacement" and `[WDS]` stands for Webpack Development Server. In our case it is confirmed the "Hot Module Replacement" is now enabled.

From now on, any change on your files will trigger an update in the browser.

Please find <a href="https://github.com/paulbrie/another-webpack-tutorial/blob/master/README.md" target="_blank">here</a> all the source code of this tutorial.
