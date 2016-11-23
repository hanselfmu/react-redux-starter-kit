This is a starter kit for simple frontend projects with React and Redux. It also comes with simple promise-based API structure, and optional Express/Koa as backend.

This starter kit has some prerequisites and assumptions about the runtime environment of the project:
1. it needs a Node server on the backend;
2. it assumes that the application sits on HTTPS, and we have HTTP2 enabled.

This starter kit is somewhat opinionated, meaning that there are certain preferred tools and predefined structures that follow certain standards.

The following things are NOT opinionated, or not integral to this kit, thus open for changes with individual project requirements:
1. routing schemes, including how Node server interacts with React side;
2. whether it is universal/isomorphic React or not

# Project Structure Notes
1. Traditionally backend-focused (i.e. Node Express) starter kits put frontend code in a folder called "public", and frontend-focused starter kits put backend code in a simple "server.js" file. This starter kit, while putting frontend as its main concern, will try to address the inherent complexity of backend in structure as well. Therefore, we have separate "frontend" and "backend" source folders for each side.
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
1. (From Redux site) " Action creators let you decouple additional logic around dispatching an action, from the actual components emitting those actions. It's very handy when the application is under heavy development, and the requirements change often."
This is why we use Redux boilerplate, or boilerplates in general: they make developing heavy and complex apps much easier, and developers can focus
much more on application logic, rather than tooling or architecture during the development cycle.
2. We respect Flux and Redux's idea of keeping "actions" in a certain shape, check out https://github.com/acdlite/flux-standard-action for more. Therefore we use redux-actions to generate FSAs, at the same time reducing some boilerplates from Redux.

# Notes on Backend
This is not a backend-focused starter kit, and this backend layer is very thin -- hardly any business logic, mostly just a communication layer between the real backend on a Java Tomcat server and the pure frontend.
In another word, we don't have a full-fledged backend architecture here.

Another big purpose of including one backend here in a frontend starter kit is because we often find ourselves waiting for backend APIs to finish. Understandably, it takes much time to plan, implement, and integrate all backend magic together to provide functioning APIs.
Meanwhile we don't have a very easy way to mock data up and develop frontend logic and UI in parallel to backend development.
So here we provide a basic setup for mocking APIs, as well as a very simple DB (just a json file). It is by no means robust, but it does the job.

We choose Express as the primary choice, but you can find Koa-supported backend on branch "koa". The reasoning behind this is simple: Express is more mature, with more support, and more tutorials on edgy use cases.
Koa, on the other hand, is thriving, but it has a bigger learning curve, which does not come easy for developers focusing more on pure frontend tech stack.

# Notes on NPM and package.json

# What this starter kit has, and does not have
To better illustrate a proposed frontend app architecture with a layer of Node server, we use a traditional TodoMVC example. Check out http://todomvc.com/ for more information.