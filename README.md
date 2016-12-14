# Starter Kit for React and Redux

*This is a starter kit for simple frontend projects with React and Redux. It also comes with simple promise-based API structure, and Node.js as a thin backend.*

## Table of Contents

  1. [Usage](#Usage)
    - [Setup](#setup)
    - [Watch](#watch)
    - [Build](#build)
  1. [Frontend Notes](#frontend-notes)
    - [Basic Architecture](#basic-architecture)
    - [React](#react)
    - [Redux](#redux)
    - [ES2015](#es2015)
    - [General Javascript](#general-javacript)
    - [CSS and Sass](#css-and-sass)
  1. [Backend Notes](#backend-notes)
    - [Architecture](#architecture)
    - [Node Express](#node-express)

## Usage

This starter kit has some prerequisites:
1. it needs a Node server that is >=6.0.0 (so that I don't need "use strict" in every function scope and I get many good ES6 features)

There are many tools I have chosen to use or not to use, but by no means it should stop you from using or not using them. Feel free to plug in or take out things.

### Setup

Currently there are two branches: *master* and *koa*. The difference is that master branch uses Express 4 as the backend server, while koa branch uses (of course) Koa. If you would like a taste of Koa, you can switch to that branch.

```bash
npm install
```

### Watch

I'm personally not a fan of Webpack's [development server](https://webpack.github.io/docs/webpack-dev-server.html), because I can get what I need from the simple `webpack --watch` and my own customizable Node server.

To watch everything (client and server):
```
npm run watch
```
The Node server will automatically start, and this simple TodoApp can be viewed at http://localhost:3000.

To just watch client side or server side, you can:
```
# watch frontend
npm run watch-fe
# watch backend
npm run watch-be
```

We use [Webpack 2](https://webpack.js.org/) to watch for client file changes, and [Nodemon](https://nodemon.io/) for server file changes.

### Build
Similar to watching, to build everything into production:
```
npm run build
```

Then simply start the server with `node server/app.js`.

There are other simple npm scripts for building with development settings, building client or server side separately, or profiling the build.

## Frontend Notes
*The thought process behind all these frontend choices.*

## Basic Architecture

I use simple code splitting from Webpack to deliver a performance-oriented SPA flow:

![](https://www.lucidchart.com/publicSegments/view/6a315e35-5fa8-4a3e-b2fb-62c331bfc66d/image.png)

To explain more, imagine a SPA with 3 views: TodoApp, About, and Settings. The ideal way for the client to use this SPA would be:
1. user visits "http://my.site/todoapp" from browser;
2. browser gets "main.js", "main.css", "todoapp.js", and "todoapp.css"; first two of these resources would be shared across views/pages; the last two are view/page-specific;
3. user navigates to "http://my.site/about";
4. browser gets "about.js" and "about.css".

This flow echoes [this awesome post by Ryan Florence](https://medium.com/@ryanflorence/welcome-to-future-of-web-application-delivery-9750b7564d9f).

For css with React, there are a few ways to do it, including:
1. use them inline;
2. import/require css into React, and later a \<style\> tag would be appended to the html *after JS is loaded*;
3. import/require css into React, and extract css into a different file, load it on demand together with JS *in parallel*.

We will use the 3rd option, although it requires more configuration to get it right.


## ES2015

# Project Structure Notes
1. Traditionally backend-focused (i.e. Node Express) starter kits put frontend code in a folder called "public", and frontend-focused starter kits put backend code in a simple "server.js" file. This starter kit, while putting frontend as its main concern, will try to address the inherent complexity of backend in structure as well. Therefore, we have separate "client" and "server" source folders for each side.
2. We put assets (images) inside style folder, because we need to accommodate possible sprite images.
3. There are several different design patterns in terms of style folder structure, as in:
    1. https://scotch.io/tutorials/aesthetic-sass-1-architecture-and-style-organization
    2. https://subvisual.co/blog/posts/32-our-css-sass-project-architecture-and-styleguide
    3. http://timhartmann.net/frontend-development/scss-styleguide-with-bem-oocss-smacss/
    4. http://thesassway.com/beginner/how-to-structure-a-sass-project

and I personally prefer the architecture from scotch.io. It is enough to handle a complex SPA, yet still simple enough to be understandable.
However I tuned it down a little so that it does not have "pages" folder, or "themes" folder.

In BEM, an application is visually divided into blocks, and then elements to form blocks. In SMACSS, it is divided into Layout and Modules. In the 7-to-1 Design, it is divided into modules and components.
In all these designs above, it is clear that there are 2 layers of categories, from simple to complex, from small to big. Therefore we divide
our pages into reusable components like headers or nav bars, and components are divided into common elements like buttons and inputs.

"Utils" folder serves as a utility folder with mixins and functions; it does not have relations with page division.

Since we are incorporating with React, it's better to map style/components to js/components. Therefore we will have all the components, be it a simple button, or a complex form, inside "components".

We use some ES2015 features that are not shipped with Node.js, namely, async functions and such, so we will need separate babel transformations for frontend and backend, thus the separate babelrc files.

# Notes on General Code Styles
When in doubt, we try to stick to Airbnb's style guides as close as possible.

Sadly we prefer semicolons at the end of Javascript statements, although it looks hideous. Some posts about why it is necessary:

1. https://stackoverflow.com/questions/7365172/semicolon-before-self-invoking-function
2. https://stackoverflow.com/questions/16664824/no-semicolon-before-is-causing-error-in-javascript

Although JS provides "automatic semicolon insertion" (as in http://www.ecma-international.org/ecma-262/6.0/#sec-automatic-semicolon-insertion), it fails at certain edge cases that would drive developers crazy.


# Notes on Modular JS
We use and prefer ES2015 modules, with named imports, exports, and export default. The difference, and the advantage over CommonJS, is that CommonJS does not support named exports by itself. module.exports in CJS is a single value, and does not provide much flexibility as ES2015's module system.
For interoperability between ES2015 and CJS, check out the following link for reference:
https://github.com/nodejs/node-eps/blob/master/002-es6-modules.md#54-es-consuming-commonjs

# Notes on Redux
1. (From Redux site) "Action creators let you decouple additional logic around dispatching an action, from the actual components emitting those actions. It's very handy when the application is under heavy development, and the requirements change often."
This is why we use Redux boilerplate, or boilerplates in general: they make developing heavy and complex apps much easier, and developers can focus
much more on application logic, rather than tooling or architecture during the development cycle." This quote explains the primary purpose of not only using action creators, but also this starter kit as well.
2. We respect Flux and Redux's idea of keeping "actions" in a certain shape, check out https://github.com/acdlite/flux-standard-action for more. Therefore we use redux-actions to generate FSAs, at the same time reducing some boilerplates from Redux.
3. In terms of routing, React-Router will work with Redux just fine in many simple cases, but when we need to update components based on route changes or take actions on url parameters, it is recommended that we use either react-router-redux or redux-router.
The differences between these two bindings are nicely explained here:
https://github.com/acdlite/redux-router#differences-with-react-router-redux

We will use react-router-redux by default, but feel free to exclude it, or use redux-router if it fits your needs.

We use redux-actions to generate our actions and reducers. Facilitating flux-standard-actions reduces the possibility of action/reducer-related bugs.
https://github.com/acdlite/redux-actions

In terms of where should business logic go, we don't prefer either fat-action-thin-reducer style, or thin-action-fat-reducer style. Instead, we try to find the balance between actions and reducers.
If it is logic about how things should interact, or side-effects, it should probably go into actions; if it is data logic, i.e. how data composes and decomposes, it should probably go into reducers.

## Notes on Redux structure
1. We use a "pages" folder to keep distinct pages, like About page, Settings page, Login/Register page, and one or more App pages. They are essentially just Redux containers.
2. We choose traditional "Rails-style" app structure over "Domain-style", because we are more familiar with rails-style, which are also common in backend structures. We will try out domain-style as soon as we have the opportunity.

# Notes on Webpack
1. We use webpack 2 now, which has its documentations at https://webpack.js.org/. It provides many useful tools compared to Webpack 1.13, including tree shaking and native ES6 import/export.

# Advanced topics

# Notes on Backend
This is not a backend-focused starter kit, and this backend layer is very thin -- hardly any business logic, mostly just a communication layer between the real backend on a Java Tomcat server and the pure frontend.
In another word, we don't have a full-fledged backend architecture here.

Another big purpose of including one backend here in a frontend starter kit is because we often find ourselves waiting for backend APIs to finish. Understandably, it takes much time to plan, implement, and integrate all backend magic together to provide functioning APIs.
Meanwhile we don't have a very easy way to mock data up and develop frontend logic and UI in parallel to backend development.
So here we provide a basic setup for mocking APIs, as well as a very simple DB (just a json file). It is by no means robust, but it does the job.

We choose Express as the primary choice, but you can find Koa-supported backend on branch "koa". The reasoning behind this is simple: Express is more mature, with more support, and more tutorials on edgy use cases.
Koa, on the other hand, is thriving, but it has a bigger learning curve, which does not come easy for developers focusing more on pure frontend tech stack.

# Notes on NPM and package.json

# Notes on CSS

We use PostCSS together with Sass.

The good things about PostCSS:
1. PostCSS embraces CSS4, and its plugin mechanism means we can get only what we need and nothing else (more flexibility);
2. PostCSS have been accepted and adopted by some major companies according to its documentation;
3. PostCSS is modular, much faster, and much more powerful.

The reason we still stick with Sass right now:
1. it is easier to learn and use: considering the fact that this starter kit already brings on a lot of new stuff, we try to keep the learning curve down;
2. it does not have as big a community as Sass;
3. the plugin mechanism, just like Babel, means that now that developers does not only need to learn a tool, they need to learn many "plugins" that come with the tool, i.e. the notorious .\*rc file.

We will slowly transition to PostCSS in the future.

"Preprocessors saved us from CSS. CSS will save us from preprocessors.".

## basic rules
1. use class prefix ".js-" for JS-specific classes when you need to perform JS-related operations (so that functionality and styles are not mixed together);
2. use ".scss" syntax instead of ".sass";

BEM naming convention was considered, but not favorable because it is more complex. The idea is to create a structure likes this:
- block
- block—element
- block—element__modifier

PostCSS has been integrated into Webpack.

# Caveats
1. Don't use Babel plugin "transform-runtime" together with "export * from ...". This will cause a bug in Babel, making the built code un-runnable (basically would not translate "import" anymore).
And since this plugin is mostly used in a library/tool according to Babel, it it recommended not to use it unless you have a very good reason.
2. Watch out for Webpack 2.* updates, and when it will transition into an official release (we are using beta now);
3. Watch out for Babel 6's support of decorator syntax; we are now using a legacy plugin from Babel 5.
4. IE9 imposes the infamous stylesheet limits (https://blogs.msdn.microsoft.com/ieinternals/2011/05/14/stylesheet-limits-in-internet-explorer/); use code splitting with styles cautiously if you are accomodating IE9 (why?).

# What this starter kit has, and does not have
To better illustrate a proposed frontend app architecture with a layer of Node server, we use a traditional TodoMVC example. Check out http://todomvc.com/ for more information.
