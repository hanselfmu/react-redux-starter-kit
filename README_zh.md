# React 与 Redux 的启动套件

[English Version](README.md)

*这是一个为React和Redux定做的前端项目启动套件。该套件包含了简单的基于Promise的API结构，以及基于Node.js的薄后端。*

## 文档目录

  1. [使用方式](#使用方式)
    - [初始化](#初始化)
    - [监听](#监听)
    - [构建](#构建)
  1. [前端说明](#前端说明)
    - [基础架构](#基础架构)
    - [React](#react)
    - [Redux](#redux)
    - [ES2015与ES7](#es2015与es7)
    - [一般的Javascript](#一般的javacript)
    - [CSS与Sass](#css与sass)
  1. [后端说明](#后端说明)
    - [ES2015](#es2015)
  1. [注意事项](#注意事项)
  1. [该套件有与没有的](#该套件有于没有的)

## 使用方式

该启动套件有以下前提条件:
1. 它需要一个不低于6.0.0版本的Node服务器（这样一来我就不用在每个方程里都写"use strict"了，而且可以获得6.0.0之后的许多ES6语言特性支持）；

在这个套件中，我选择了使用或不使用很多工具，但这并不代表你也需要作出同样的选择。请根据个人喜好或项目需要随意添加或移除各种工具。

### 初始化

现在该项目有两个分支：*master*与*koa*。区别在于master分支使用Express 4作为后端应用框架，而koa分支则使用了koa。如果你想体验一下koa，可以切换到koa分支。


```bash
npm install
```

### 监听

我个人并不喜欢Webpack提供的[development server](https://webpack.github.io/docs/webpack-dev-server.html), 因为我可以通过简单的 `webpack --watch` 和完全自主控制的Node服务器获得我想要的。

同时监听并实时更新前端与后端:
```
npm run watch
```

Node服务器会自动启动，示例的TodoApp也可以在 http://localhost:3000 浏览。

如果只想单独监听前端或后端：
```
# watch frontend
npm run watch-fe
# watch backend
npm run watch-be
```

该套件使用[Webpack 2](https://webpack.js.org/)来监听前端文件的更新, 使用[Nodemon](https://nodemon.io/)来监听后端文件的更新。

### 构建
与监听类似，使用下面的命令来构建前端与后端：
```
npm run build
```

然后通过`node server/app.js`来启动服务器。

还有其他简单的npm scripts用来为开发环境构建，单独构建前端或后端，或对构建进行性能分析。

## 前端说明
*作出这些关于前端的种种选择的想法。*

### 基础架构

我使用了Webpack提供的简单的代码分割来实现一个优化了性能的单页应用：

![](https://www.lucidchart.com/publicSegments/view/6a315e35-5fa8-4a3e-b2fb-62c331bfc66d/image.png)

为了更好的解释，假设该应用有三个页面：TodoApp，About，以及Settings。理想情况下，用户访问该单页应用应该是这样的：

1. 用户通过浏览器访问"http://my.site/todoapp";
2. 浏览器请求获得"main.js", "main.css", "todoapp.js", and "todoapp.css"这些资源; 前两者是所有页面公用的资源; 后两者专门服务于TodoApp页面;
3. 用户导航至"http://my.site/about";
4. 浏览器请求获得"about.js"与"about.css"。

这套简单的流程与[这篇文章](https://medium.com/@ryanflorence/welcome-to-future-of-web-application-delivery-9750b7564d9f)以及其他许多有关单页应用优化的文章的思想一样。基本地来说，用户只需要请求当前页面需要的资源，而不是该单页应用包含的所有资源。

在一个更复杂的应用中，前端的公共资源也许会来自于不同的CDN（专门服务于图片的CDN，专门服务于JS的CDN等等），单一的公共JS打包文件 *main.js* 会被进一步分解成为独立的组件，比如 *util.js*，*user-tracking.js*，*events.js*，从而优化缓存性能，并进一步模块化。该套件并不会针对这种复杂的应用作出处理。当你的应用增长到这种复杂程度时，你应该早已不需要什么启动套件了。

### React

React本身是十分简单的。使用React不需要做太多选择，而仅有的一些选择也会把优劣展示得很清楚。该套件针对React仅有以下几点偏好，请随意在.eslintrc中添加或删减：

如果你关心你的React组件的性能, 请参考[React's guide for optimization](https://facebook.github.io/react/docs/optimizing-performance.html), 也可以参考React的[reconciliation algorithm](https://facebook.github.io/react/docs/reconciliation.html) (重点在"Tradeoffs")。值得注意的是，如果你使用了Redux以及它的 [connect()](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)方程, 可能你已经不需要手动优化`shouldComponentUpdate()`了。

#### CSS和React
CSS与React结合有多种方案，包括：

1. 使用Javascript创建行内的仅限于组件的样式;
2. 在React组件中引入单独的css模块并使用它们; 在React组件加载时，这些样式也会被按需加载进来;
3. 写与React组件在文件结构上完全分离的css样式。

可以看出来，以上三种方案是按照样式与组件最耦合至最不耦合，以及需要更多准备工作至更少准备工作这个顺序排的。这三种方案都各有优劣，而该套件选取的是第二种，因为它在两端之间有一定的平衡。

对我来说，使用Javascript写css样式的确会提供更多的灵活性，而且完全写在React组件中的样式也会使组件样式本地化，不会污染到全局的样式。我会继续尝试使用Javascript书写css样式，当我觉得它明显比第二种方案好的时候，我会把它融入到该套件中。

### Redux

在你开始阅读此部分之前，请详读Redux作者Dan Abramov的这篇文章：[You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)。我个人因为在初次接触Redux时没有细读这篇文章，吃了一些亏。这篇文章中最关键的一点是：*组件本地维护、使用state是完全没问题的*. 事实上，我在使用Redux开发应用时，问（自己）的最多的问题应该是：

*我要写的这个新的组件是自我包含的吗？*

换句话说，这个新组建的state会影响其他组件吗？我需不需要把它的state交给Redux来管理？

#### 文件结构
1. I use a "pages" folder to keep distinct pages, like About page, Settings page, Login/Register page, and one or more App pages. They are essentially just Redux containers.
2. I choose traditional "Rails-style" app structure over "Domain-style", because people are more familiar with rails-style, which is also common in backend structures. Worth noticing is that in "actions" and "reducers" folder, I have an "index.js" file to combine every action files and reducer files together. "action/index.js" looks just like this:
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

#### Actions and reducers

In terms of where should business logic go, I don't prefer either fat-action-thin-reducer style, or thin-action-fat-reducer style. Instead, I try to find the balance between actions and reducers.
If it is logic about how things should interact, or side-effects, it should probably go into actions; if it is data logic, i.e. how data composes and decomposes, it should probably go into reducers.

I like the idea of [flux-standard-action](https://github.com/acdlite/flux-standard-action), and I use [redux-actions](https://github.com/acdlite/redux-actions) to help create actions and reducers.

(From Redux site) "Action creators let you decouple additional logic around dispatching an action, from the actual components emitting those actions. It's very handy when the application is under heavy development, and the requirements change often."
This is why I use Redux boilerplate, or boilerplates in general: they make developing heavy and complex apps much easier, and developers can focus much more on application logic, rather than tooling or architecture during the development cycle.

Please note that this starter kit is simple, and to keep a smooth learning curve to people that are new to Redux, I have kept the very simple thunk-style async action flows. Check out Redux's [async tutorial](http://redux.js.org/docs/advanced/AsyncActions.html) for more information. This style is very primitive: you have to write some boilerplate code to get async flow working correctly. To reduce these boilerplates, you can write your own *asyncActionFactory*, but this starter kit tries to stay unopinionated toward how you do your async flows.

Also, check out [redux-saga](https://github.com/yelouafi/redux-saga); I will create a separate branch using saga to optimize async flow.  

#### Routing

In terms of routing, React-Router will work with Redux just fine in many simple cases, but when we need to update components based on route changes or take actions on url parameters, it is recommended that we use either react-router-redux or redux-router.
The differences between these two bindings are nicely explained here:
https://github.com/acdlite/redux-router#differences-with-react-router-redux

We will use react-router-redux by default, but feel free to exclude it, or use redux-router if it fits your needs.

### ES2015 and ES7

#### Module system

We use and prefer ES2015 modules, with named imports, exports, and export default. The difference, and the advantage over CommonJS, is that CommonJS does not support named exports by itself. module.exports in CJS is a single value, and does not provide much flexibility as ES2015's module system.
For interoperability between ES2015 and CJS, check out the following link for reference:
https://github.com/nodejs/node-eps/blob/master/002-es6-modules.md#54-es-consuming-commonjs

### Webpack

We use webpack 2 now, which has its documentations at https://webpack.js.org/. It provides many useful tools compared to Webpack 1.13, including tree shaking and native ES6 import/export.

#### Tree Shaking

It's a nice little feature already present in other module bundlers like [Rollup](http://rollupjs.org), and now Webpack 2 supports it as well. Make sure to add `{ "modules": false }` to the client .babelrc's es2015 preset so that Babel does not try to transform ES6 modules to CommonJS.

#### Native ES6 modules

Specifically, it supports `System.import`, which is ES6 module's way of importing a module asynchronously. Webpack 2 is smart enough to understand ES6 modules and use JSONP (if your webpack config's target is "web") to load resources on demand. Combine this with React-Router, you get simple on-demand resource loading. Check out "client/app/services/routing.js" for more information.

### General Javascript
When in doubt, I try to stick to Airbnb's style guides as close as possible.

Sadly this starter kit prefers semicolons at the end of Javascript statements, although it looks hideous. Some posts about why it is necessary:

1. https://stackoverflow.com/questions/7365172/semicolon-before-self-invoking-function
2. https://stackoverflow.com/questions/16664824/no-semicolon-before-is-causing-error-in-javascript

Although JS provides [automatic semicolon insertion](http://www.ecma-international.org/ecma-262/6.0/#sec-automatic-semicolon-insertion), it fails at certain edge cases that would drive developers crazy.

### CSS and Sass

#### Basic Rules

Use ".scss" syntax instead of ".sass".

#### File Structure

There are several different design patterns in terms of style folder structure, as in:
    1. https://scotch.io/tutorials/aesthetic-sass-1-architecture-and-style-organization
    2. https://subvisual.co/blog/posts/32-our-css-sass-project-architecture-and-styleguide
    3. http://timhartmann.net/frontend-development/scss-styleguide-with-bem-oocss-smacss/
    4. http://thesassway.com/beginner/how-to-structure-a-sass-project

and I personally prefer the architecture from scotch.io. It is enough to handle a complex SPA, yet still simple enough to be understandable. What you see right now is a derived version from that. "base", "elements", and "utils" are global Sass modules that get compiled into "\_common.scss" module. This common module defines Sass mixins and global Sass variables, and all the component-level stylesheets (components, pages, etc.) import this module to use globally defined variables and utilities. We also have a "main.scss" that defines global styles.

#### Preprocessors or PostCSS?

We use PostCSS together with Sass.

The good things about PostCSS:
1. PostCSS embraces CSS4, and its plugin mechanism means we can get only what we need and nothing else (more flexibility);
2. PostCSS have been accepted and adopted by some major companies according to its documentation;
3. PostCSS is modular, much faster, and much more powerful.

The reason we still stick with Sass right now:
1. it is easier to learn and use: considering the fact that this starter kit already brings on a lot of new stuff, we try to keep the learning curve down;
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

### ES2015

We use some ES2015 features that are not shipped with Node.js, namely, async functions and such, so we will need separate babel transformations for frontend and backend, thus the separate babelrc files.

## Caveats
1. Don't use Babel plugin "transform-runtime" together with "export * from ...". This will cause a bug in Babel, making the built code un-runnable (basically would not translate "import" anymore).
And since this plugin is mostly used in a library/tool according to Babel, it it recommended not to use it unless you have a very good reason.
2. Watch out for Webpack 2.* updates, and when it will transition into an official release (we are using beta now);
3. Watch out for Babel 6's support of decorator syntax; we are now using a legacy plugin from Babel 5.
4. IE9 imposes the infamous stylesheet limits (https://blogs.msdn.microsoft.com/ieinternals/2011/05/14/stylesheet-limits-in-internet-explorer/); use code splitting with styles cautiously if you are accommodating IE9 (why?).

## What This Starter Kit Has and Has Not

To better illustrate a proposed frontend app architecture with a layer of Node server, I use a traditional TodoMVC example. Check out http://todomvc.com/ for more information.

This starter kit tries to address many frontend decisions, including but not limited to Redux, Webpack, and CSS. It is aimed at providing an easy boilerplate to start a simple frontend app. It requires minimal configuration or setup; you can just `npm install` and start coding.

On the other hand, it does not dictate, or tries to stay out of many decisions, like how to make Redux async action flows. It may also not suitable for a very complex frontend app (with hundreds of components, levels of inheritance, many custom services, assembled in different sub-apps and uses a combination of design patterns). Usually when you find yourself developing a frontend app with great complexity, you probably don't need a starter kit anyway.
