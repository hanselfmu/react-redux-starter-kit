This is a starter kit for simple frontend projects with React and Redux. It also comes with simple promise-based API structure, and optional Express/Koa as backend.

This starter kit has some prerequisites and assumptions about the runtime environment of the project:
1. it needs a Node server on the backend;
2. it assumes that the application sits on HTTPS, and we have HTTP2 enabled.

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
I thought about extracting larger and more complex components into "layouts" so aht we could have a flatter structure rather than deeper. But since we are incorporating with React, 
it's better to map style/components to js/components. Therefore we will have all the components, be it a simple button, or a complex form, inside "components".
 
# What this starter kit has, and does not have
To better illustrate a proposed frontend app architecture with a layer of Node server, we use a traditional TodoMVC example.