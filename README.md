# Starter Kit for React and Redux

[中文版说明文档](README_zh.md)

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
    - [ES2015 and ES7](#es2015-and-es7)
    - [General Javascript](#general-javacript)
    - [CSS and Sass](#css-and-sass)
  1. [Backend Notes](#backend-notes)
    - [Separate Babels](#separate-babels)
  1. [Caveats](#caveats)
  1. [What This Starter Kit Has and Has Not](#what-this-starter-kit-has-and-has-not)

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

### Basic Architecture

I use simple code splitting from Webpack to deliver a performance-oriented SPA flow:

![](https://www.lucidchart.com/publicSegments/view/6a315e35-5fa8-4a3e-b2fb-62c331bfc66d/image.png)

To explain more, imagine a SPA with 3 views: TodoApp, About, and Settings. The ideal way for the client to use this SPA would be:

1. user visits "http://my.site/todoapp" from browser;
2. browser gets "main.js", "main.css", "todoapp.js", and "todoapp.css"; first two of these resources would be shared across views/pages; the last two are view/page-specific;
3. user navigates to "http://my.site/about";
4. browser gets "about.js" and "about.css".

This flow echoes [this awesome post by Ryan Florence](https://medium.com/@ryanflorence/welcome-to-future-of-web-application-delivery-9750b7564d9f), and many other similar ideas. Basically, users shouldn't load resources they don't need; they only need to load what is necessary right now.

In a more complex app, common resources might come from different CDNs (one for images, one for js, and such), and usually the single common JS bundle *main.js* will be broken into different pieces, like *util.js*, *user-tracking.js*, *events.js*, to optimize cache performance and modularity. This starter kit does not intend to cover these cases or how to optimize for them. As your app grows, the solution will find itself :).

### React

React itself is quite simple. There are not many choices to make, and the few choices you have to make present their tradeoffs clearly. This starter kit only has the some stylistic preferences for React (mostly from Airbnb), and feel free to remove any or all of them from .eslintrc:

If you are concerned with React's performance, look at [React's guide for optimization](https://facebook.github.io/react/docs/optimizing-performance.html), and also look at the notes for React's [reconciliation algorithm](https://facebook.github.io/react/docs/reconciliation.html) (look for "Tradeoffs"). Keep in mind that if you use Redux and its [connect()](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) function, chances are you don't have to optimize `shouldComponentUpdate()` yourself.

#### CSS with React
For css with React, there are a few ways to do it, including:

1. use Javascript to create inline component-specific styles;
2. import separate css modules into React, and use them in the component; these styles can be loaded on demand together with components or pages;
3. write css completely separately and independent of React components.

As you can see, these options are listed in a order from the most coupling with components to the least coupling, and from the most setup to the least setup. There are pros and cons to all these options, and I will use the **2nd** option here because it provides more balance.

To me, writing css with Javascript does give more flexibility, and it conforms with the idea of keeping styles local instead of global. So I will keep trying out the 1st option, and I will integrate it into the kit when I feel it works much better than the 2nd option.

### Redux

Before you dive into this section, read this post [You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367) from Dan Abramov, Redux's creator. Trust me, I didn't read it thoroughly when I started using Redux in a somewhat complex app, and **I paid the price**. The key thing to remember is: *local state is fine*. In fact, probably the most asked question when I'm developing my apps using Redux is this:

*Is this new component truly self-containing?*

In other words, does this new component's state interact with other components? Should I elevate it to a global state and let Redux handle it?

#### File Structure
1. I use a "pages" folder to keep distinct pages, like About page, Settings page, Login/Register page, and one or more App pages. They are essentially just Redux containers.
2. I choose traditional "Rails-style" app structure over "Domain-style", because it is flatter, and simpler to understand when the app is not so complex. Worth noticing is that in "actions" and "reducers" folder, I have an "index.js" file to combine every action files and reducer files together. "action/index.js" looks just like this:
```
// using ES6 modules
export * from './todos';
```
This way, we can write
```
import { addTodo } from '../actions';
```
instead of importing specific actions from respective action files. When you need to add new actions, or move existing actions around, you don't have to update every single container.

Components are structured in a "Domain-style" fashion.

There is also a "middleware" folder specifically for Redux middleware. You can customize Redux by adding more middleware. I've included one simple middleware: *reduxFSAThunk.js*; feel free to add more.

#### Actions and Reducers

In terms of where should business logic go, I don't prefer either fat-action-thin-reducer style, or thin-action-fat-reducer style. Instead, I try to find the balance between actions and reducers.
If it is logic about how things should interact, or side-effects, it should probably go into actions; if it is data logic, i.e. how data composes and decomposes, it should probably go into reducers.

I like the idea of [flux-standard-action](https://github.com/acdlite/flux-standard-action), and I use [redux-actions](https://github.com/acdlite/redux-actions) to help create actions and reducers.

(From Redux site) "Action creators let you decouple additional logic around dispatching an action, from the actual components emitting those actions. It's very handy when the application is under heavy development, and the requirements change often."
This is why I use Redux boilerplate, or boilerplates in general: they make developing heavy and complex apps much easier, and developers can focus much more on application logic, rather than tooling or architecture during the development cycle.

Please note that this starter kit is simple, and to keep a smooth learning curve to people that are new to Redux, I have kept the very simple thunk-style async action flows. Check out Redux's [async tutorial](http://redux.js.org/docs/advanced/AsyncActions.html) for more information. This style is very primitive: you have to write some boilerplate code to get async flow working correctly. To reduce these boilerplates, you can write your own *asyncActionFactory*, but this starter kit tries to stay unopinionated toward how you do your async flows.

Also, check out [redux-saga](https://github.com/yelouafi/redux-saga); I will create a separate branch using saga to optimize async flow.  

#### Routing

In terms of routing, React-Router will work with Redux just fine in many simple cases, but when you need to update components based on route changes or take actions on url parameters, it is recommended that you use either react-router-redux or redux-router.
The differences between these two bindings are nicely explained here:
https://github.com/acdlite/redux-router#differences-with-react-router-redux

This kit uses react-router-redux by default, but feel free to exclude it, or use redux-router if it fits your needs.

### ES2015 and ES7

#### Module system

I use and prefer ES2015 modules, with named imports, exports, and export default. The difference, and the advantage over CommonJS, is that ES2015 uses a static module system, meaning you can statically analyze dependencies without running the code. Also, module.exports in CJS is a single value, and does not provide much flexibility as ES2015's module system.
For interoperability between ES2015 and CJS, check out the following link for reference:
https://github.com/nodejs/node-eps/blob/master/002-es6-modules.md#54-es-consuming-commonjs

### Webpack

This kit uses webpack 2 now, which has its documentations at https://webpack.js.org/. It provides many useful tools compared to Webpack 1.13, including tree shaking and native ES6 import/export.

#### Tree Shaking

It's a nice little feature already present in other module bundlers like [Rollup](http://rollupjs.org), and now Webpack 2 supports it as well. Make sure to add `{ "modules": false }` to the client .babelrc's es2015 preset so that Babel does not try to transform ES6 modules to CommonJS.

#### Native ES6 modules

Specifically, it supports `System.import`, which is ES6 module's way of importing a module asynchronously. Webpack 2 is smart enough to understand ES6 modules and use JSONP (if your webpack config's target is "web") to load resources on demand. Combine this with React-Router, you get simple on-demand resource loading. Check out [this simple routing service file](client/js/services/routing.js) for more information.

### General Javascript
When in doubt, I try to stick to Airbnb's style guides as close as possible.

Sadly this starter kit prefers semicolons at the end of Javascript statements, although it looks hideous. Some posts about why it is necessary:

1. https://stackoverflow.com/questions/7365172/semicolon-before-self-invoking-function
2. https://stackoverflow.com/questions/16664824/no-semicolon-before-is-causing-error-in-javascript

Although JS provides [automatic semicolon insertion](http://www.ecma-international.org/ecma-262/6.0/#sec-automatic-semicolon-insertion), it fails at certain edge cases that would drive developers crazy.

#### Linting

I use Eslint, but it is not required, nor integrated into Webpack configurations. I personally don't like developers having to learn another tool, and a bunch of plugins from that tool, just to get some stylistic preferences right.

On the other hand, if you are stringent about how your code conforms to a certain standard, I have included 2 sets of linting configurations: *.eslintrc.js* and *.fixable.eslintrc.js*. I personally use the *fixable* one (by running `npm run lint-fix`) to automatically fix some minor issues, like console messages, missing semicolons, and such.

*Remember to run this command:*
```
npm info "eslint-config-airbnb@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "eslint-config-airbnb@latest"
```
*to get the correct versions of airbnb config's peer dependencies.*

### CSS and Sass

#### Basic Rules

Use ".scss" syntax instead of ".sass".

#### File Structure

There are several different design patterns in terms of style folder structure, as in:
    1. https://scotch.io/tutorials/aesthetic-sass-1-architecture-and-style-organization
    2. https://subvisual.co/blog/posts/32-our-css-sass-project-architecture-and-styleguide
    3. http://timhartmann.net/frontend-development/scss-styleguide-with-bem-oocss-smacss/
    4. http://thesassway.com/beginner/how-to-structure-a-sass-project

and I personally prefer the architecture from scotch.io, which is borrowed from [the 7-1 pattern](https://sass-guidelin.es/#the-7-1-pattern). It is enough to handle a complex SPA, yet still simple enough to be understandable. What you see right now is a derived version from that. "base", "elements", and "utils" are global Sass modules that get compiled into "\_common.scss" module. This common module defines Sass mixins and global Sass variables, and all the component-level stylesheets (components, pages, etc.) import this module to use globally defined variables and utilities. We also have a "main.scss" that defines global styles.

#### Preprocessors or PostCSS?

I use PostCSS together with Sass.

The good things about PostCSS:
1. PostCSS embraces CSS4, and its plugin mechanism means we can get only what we need and nothing else (more flexibility);
2. PostCSS have been accepted and adopted by some major companies according to its documentation;
3. PostCSS is modular, much faster, and much more powerful.

The reason we still stick with Sass right now:
1. it is easier to learn and use: considering the fact that this starter kit already brings on a lot of new stuff, I try to keep the learning curve down;
2. it does not have as big a community as Sass;
3. the plugin mechanism, just like Babel, means that now that developers does not only need to learn a tool, they need to learn many "plugins" that come with the tool, i.e. the notorious .\*rc file.

We will slowly transition to PostCSS in the future. *"Preprocessors saved us from CSS. CSS will save us from preprocessors."*

Feel free to add [CSSNext](http://cssnext.io/) into PostCSS and use CSS4.

## Backend Notes

Traditionally backend-focused (i.e. Node Express) starter kits put frontend code in a folder called "public", and frontend-focused starter kits put backend code in a simple "server.js" file. This starter kit, while putting frontend as its main concern, will try to address the inherent complexity of backend structure as well. Therefore, I have separate "client" and "server" source folders for each side.

This is not a backend-focused starter kit, and this backend layer is very thin -- hardly any business logic, mostly just a communication layer between the real backend on a Java Tomcat server and the pure frontend.
In another word, I don't have a full-fledged backend architecture here.

Another big purpose of including one backend here in a frontend starter kit is because I often find myself waiting for backend APIs to finish. Understandably, it takes much time to plan, implement, and integrate all backend magic together to provide functioning APIs.
Meanwhile I don't have a very easy way to mock data up and develop frontend logic and UI in parallel to backend development.
So this kit provides a basic setup for mocking APIs, as well as a very simple DB (just a json file). It is by no means robust, but it does the job.

I choose Express as the primary choice, but you can find Koa-supported backend on branch "koa". The reasoning behind this is simple: Express is more mature, with more support, and more tutorials on edgy use cases.
Koa, on the other hand, is thriving, but it has a bigger learning curve, which does not come easy for developers focusing more on pure frontend tech stack.

### Separate Babels

This kit uses some ES7 features that are not shipped with Node.js, namely, async functions and such, so we will need separate babel transformations for frontend and backend, thus the separate babelrc files.

## Caveats
1. Don't use Babel plugin [transform-runtime](http://babeljs.io/docs/plugins/transform-runtime/) together with `export * from ...`. This will cause a bug in Babel, making the built code un-runnable (basically would not translate "import" anymore).
And since this plugin is mostly used in a library/tool according to Babel, it it recommended not to use it unless you have a very good reason.
2. Watch out for Webpack 2.* updates, and when it will transition into an official release (we are using beta now, though it's kind of stable now);
3. Watch out for Babel 6's support of decorator syntax; we are now using a legacy plugin from Babel 5.
4. IE9 imposes the infamous stylesheet limits (https://blogs.msdn.microsoft.com/ieinternals/2011/05/14/stylesheet-limits-in-internet-explorer/); use code splitting with styles cautiously if you are accommodating IE9 (why?).

## What This Starter Kit Has and Has Not

To better illustrate a proposed frontend app architecture with a layer of Node server, I use a traditional TodoMVC example. Check out http://todomvc.com/ for more information.

This starter kit tries to address many frontend decisions, including but not limited to Redux, Webpack, and CSS. It is aimed at providing an easy boilerplate to start a simple frontend app. It requires minimal configuration or setup; you can just `npm install` and start coding.

On the other hand, it does not dictate, or tries to stay out of many decisions, like how to make Redux async action flows. It may also not suitable for a very complex frontend app (with hundreds of components, levels of inheritance, many custom services, assembled in different sub-apps and uses a combination of design patterns). Usually when you find yourself developing a frontend app with great complexity, you probably don't need a starter kit anyway.
