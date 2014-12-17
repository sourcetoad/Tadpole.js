Tadpole.js
================
Tadpole is a boilerplate scaffold for projects built on backbone.js. It's designed to kickstart backbone application development by providing a boilerplate including powerful generators, gulp.js automation, package management, and more right out of the box.


Includes the following:

- Command line generators and automation using [Gulp.js](http://gulpjs.com).
- Package management with [Bower](http://bower.io) and Node.
- Boilerplate JS libraries including templating.
- Boilerplate directory structure, eliminating the need for configuration.


Included Libraries
================
- [jQuery.js](http://jquery.com/)
- [Underscore.js](http://underscorejs.org/)
- [Backbone.js](http://backbonejs.org/)
- [Async.js](https://github.com/caolan/async)
- [Handlebars.js](http://handlebarsjs.com/) for templating
- [Jasmine 2.1.3](https://github.com/jasmine/jasmine) for testing



File Structure
=================
- ```App/*``` - the contents of your application
  - ```css/*```
  - ```img/*```
  - ```templates/*``` - handlebars.js templates
  - ```js/*```
    - ```base/*```
    - ```views/*```
    - ```routers/*```
    - ```models/*```
    - ```collections/*```
- ```gulpfile.js``` - gulp.js automated tasks
  


Gulp Commands
=================
- ```gulp start``` - runs a server on localhost:8080 and jshint
- ```gulp server``` - runs a server on localhost:8080
- ```gulp distribute``` - creates a folder called ```dist``` that contains a minified build of your ```app```


Gulp Generators
=================
The generator commands are all subcommands of ```g``` which stands for ```generate```. In the examples commands below ```example``` can be replaced with the name of the view/model/etc.

- ```gulp g --view example``` - creates a file called ```exampleView``` in ```app/views/exampleView.js```
- ```gulp g --router example``` - creates a file called ```exampleRouter``` in ```app/views/exampleRouter.js```
- ```gulp g --model example``` - creates a file called ```exampleModel``` in ```app/views/exampleModel.js```
- ```gulp g --collection example``` - creates a file called ```exampleCollection``` in ```app/views/exampleCollection.js```


Getting Started
=================
The easiest way to get started with Tadpole.js is by cloning it with git.

Make sure you're in the right directory:
```
$ mkdir MyProject
```

```
$ cd MyProject
```
Clone the repo into the current directory:
```
$ git clone https://github.com/sourcetoad/Tadpole.js.git --bare
```



