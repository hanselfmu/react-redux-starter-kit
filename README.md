This is a starter kit for simple frontend projects with React and Redux. It also comes with simple promise-based API structure, and optional Express/Koa as backend.

This starter kit has some prerequisites and assumptions about the runtime environment of the project:
1. it needs a Node server on the backend, and the Node version should be no less than v6.0.0 (so that I don't need "use strict" in every function scope);
2. it assumes that the application sits on HTTPS, and we have HTTP2 enabled.

This starter kit is somewhat opinionated, meaning that there are certain preferred tools and predefined structures that follow certain standards.

The following things are NOT opinionated, or not integral to this kit, thus open for changes with individual project requirements:
1. routing schemes, including how Node server interacts with React side;
2. whether it is universal/isomorphic React or not

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

"Modules" folder serves more like a utility folder; it does not have relations with page division.

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
1. We use webpack 1.13 for now;
2. We watch closely on webpack 2 and its release date, which has its documentations at https://webpack.js.org/. It provides many useful tools compared to Webpack 1.13, including tree shaking and native ES6 import/export.

# Notes on Backend
This is not a backend-focused starter kit, and this backend layer is very thin -- hardly any business logic, mostly just a communication layer between the real backend on a Java Tomcat server and the pure frontend.
In another word, we don't have a full-fledged backend architecture here.

Another big purpose of including one backend here in a frontend starter kit is because we often find ourselves waiting for backend APIs to finish. Understandably, it takes much time to plan, implement, and integrate all backend magic together to provide functioning APIs.
Meanwhile we don't have a very easy way to mock data up and develop frontend logic and UI in parallel to backend development.
So here we provide a basic setup for mocking APIs, as well as a very simple DB (just a json file). It is by no means robust, but it does the job.

We choose Express as the primary choice, but you can find Koa-supported backend on branch "koa". The reasoning behind this is simple: Express is more mature, with more support, and more tutorials on edgy use cases.
Koa, on the other hand, is thriving, but it has a bigger learning curve, which does not come easy for developers focusing more on pure frontend tech stack.

# Notes on NPM and package.json

# Notes on CSS & SASS
## basic rules
1. use .scss instead of .sass;
2. use class prefix ".js-" for JS-specific classes when you need to perform JS-related operations (so that functionality and styles are not mixed together);

# Caveats
1. Don't use Babel plugin "transform-runtime" together with "export * from ...". This will cause a bug in Babel, making the built code un-runnable (basically would not translate "import" anymore).
And since this plugin is mostly used in a library/tool according to Babel, it it recommended not to use it unless you have a very good reason.


# What this starter kit has, and does not have
To better illustrate a proposed frontend app architecture with a layer of Node server, we use a traditional TodoMVC example. Check out http://todomvc.com/ for more information.