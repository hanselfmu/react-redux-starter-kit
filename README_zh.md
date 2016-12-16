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
    - [基本的Javascript](#基本的Javascript)
    - [CSS与Sass](#css与sass)
  1. [后端说明](#后端说明)
    - [各自的Babel文件](#各自的Babel文件)
  1. [注意事项](#注意事项)
  1. [该套件有与没有的](#该套件有与没有的)

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

1. 我使用了一个"pages"文件夹用来单独存放独立的页面，例如About页面，Settings页面，Login/Register页面，以及一个或多个不同的应用页面。这些页面本质上就是Redux容器。
2. 我选择了传统的Rails Style文件结构，而不是同样很流行的Domain Style（详见[这里](http://redux.js.org/docs/faq/CodeStructure.html#what-should-my-file-structure-look-like-how-should-i-group-my-action-creators-and-reducers-in-my-project-where-should-my-selectors-go))。这是因为当应用并不复杂的时候，这样的文件结构更加扁平，更容易管理。值得注意的是，"actions"与"reducers"文件夹都由一个"index.js"来汇总。“action/index.js”看起来是这样的：

```
// using ES6 modules
export * from './todos';
```

这样一来，我们在使用action的时候，可以：
```
import { addTodo } from '../actions';
```
而并不用从各自的action文件中引入action。当你需要添加新action，或移动现有的actions的时候，你不需要更新所有引用这些action文件的容器了。

组件是按照Domain Style的结构来存放的。

“中间件”文件夹专门用来存放自定义的Redux中间件。我已经添加了一个很简单的中间件：*reduxFSAThunk.js*；你可以随意添加更多的。

#### Actions与Reducers

对于业务逻辑该写在哪里的问题，我不建议全部写在action里，或reducer里。两者之间的平衡性才是最为重要的。比如，有关用户操作产生的“副作用”也许应该放入action中；有关数据的组合与分离的，也许应该放在reducer中。

我喜欢[flux-standard-action](https://github.com/acdlite/flux-standard-action)的概念，并使用[redux-actions](https://github.com/acdlite/redux-actions)创建actions与reducers。

(来自于Redux官方文档) "Action creators使得多余的逻辑与action的派发中解藕出来。这在项目的深度开发时期是十分有必要的。" 这就是为什么我使用不局限于Redux的一些公式化的代码：这些公式化代码使得开发复杂应用变得相对简单，开发者也能更专注于应用的逻辑本身，而不是工具的调配或架构。

值得注意的是，这是一个简单的启动套件。为了使得Redux新手的学习成本降低，我使用了比较基本的使用thunk的异步工作流。详情可参见Redux相关文档：[async tutorial](http://redux.js.org/docs/advanced/AsyncActions.html)。这种异步工作流十分基础：你需要写一些公式化的（无聊的）代码。如果想减少这些公式化代码，你可以写一个自己的 *asyncActionFactory*，不过该套件不会试图左右你如何定制自己的异步工作流。

另外，也可以参见[redux-saga](https://github.com/yelouafi/redux-saga)；我会单独为使用saga的异步工作流创建一个分支。

#### 路由

对于路由来说，在大多数情况下，React-Router与Redux可以直接合作。但是当我们需要做一些复杂操作时，比如根据路由变化更新组件，或根据url参数派发actions，建议你使用react-router-redux或redux-router。[这篇文章](https://github.com/acdlite/redux-router#differences-with-react-router-redux)详细阐述了这两种绑定库的区别。

该套件默认使用react-router-redux，不过请随意替换。

### ES2015与ES7

#### 模块系统

我使用并推荐ES2015的模块系统；它带来了命名的导入、导出，以及默认导出。相对于CommonJS的模块系统，它的优势在于它是静态的模块系统：你不需要运行代码就可以分析检查你的引用依赖。而且，在CommonJS中，module.exports只是一个值，它无法提供类似于ES2015的灵活性。

有关ES2015与CommonJS之间的互通性，参见：
https://github.com/nodejs/node-eps/blob/master/002-es6-modules.md#54-es-consuming-commonjs

### Webpack

该套件使用[Webpack 2](https://webpack.js.org/)，请注意它的官方地址与Webpack 1并不一样。Webpack 2提供了一些有用的新特性，比如未引用代码的移除（tree shaking），以及原生的ES6模块支持。

#### 未引用代码移除（Tree Shaking）

这是一个已经由Rollup模块打包器实现了的小优化，现在Webpack也支持它了。需要注意的是，如果要使用它，需要在前端的.babelrc文件中的es2015 preset添加`{ "modules": false }`这个选项，这样Babel就不会试图将ES6模块转化成CommonJS模块了。

#### 原生的ES6模块支持

更明确的来说，这项特性支持了System.import语句，该语句是ES6模块系统异步加载的方式。Webpack 2可以通过该语句来实现按需加载以及代码分割。在React应用中，可以配合React-Router来实现简单的按需加载。详情参见[路由服务文件](client/js/services/routing.js)。

### 基本的Javascript

当我有疑问时，我通常会遵循Airbnb的规范。

遗憾的是该启动套件倾向于在Javascript代码每一行结束后写分号，尽管这样看起来有些丑。以下是关于为什么这样做有必要的两个问题：

1. https://stackoverflow.com/questions/7365172/semicolon-before-self-invoking-function
2. https://stackoverflow.com/questions/16664824/no-semicolon-before-is-causing-error-in-javascript

尽管Javascript提供了[自动分号插入](http://www.ecma-international.org/ecma-262/6.0/#sec-automatic-semicolon-insertion)，它还是会在一些特殊情况时给开发人员造成极大困扰。

### CSS与Sass

#### 基本规则

使用".scss"语法；不建议使用".sass"语法。

#### 文件结构

在设计样式文件夹结构时，我参考了以下几篇文章：
    1. https://scotch.io/tutorials/aesthetic-sass-1-architecture-and-style-organization
    2. https://subvisual.co/blog/posts/32-our-css-sass-project-architecture-and-styleguide
    3. http://timhartmann.net/frontend-development/scss-styleguide-with-bem-oocss-smacss/
    4. http://thesassway.com/beginner/how-to-structure-a-sass-project

而我本人更倾向于scotch.io的结构，这种结构借鉴自[the 7-1 pattern](https://sass-guidelin.es/#the-7-1-pattern)。这种结构既可以承载较为复杂的单页应用，本身也比较简单易懂。现在的架构就是从7-1 pattern演化而来的。“base”，”elements“，”utils”这些文件夹会被汇总到"\_common.scss"模块。这个common模块定义了全局的Sass mixins以及变量，所有的组件或页面都会引用这个common模块，从而使用全局变量等。另外有一个main.scss来定义全局的样式。

#### Preprocessors或PostCSS？

我结合使用PostCSS与Sass。

关于PostCSS的好处在于：

1. PostCSS可以使用CSS4，而它的插件机制意味着我们可以按需插拔，从而获得更大的灵活性；
2. PostCSS的官方文档说，许多大公司都已经沿用PostCSS；
3. PostCSS更模块化，更迅速，也提供了更多功能。

至于我们仍然主要使用Sass的原因是：

1. Sass使用和理解起来十分简单；考虑到该启动套件已经使用了一些较新的工具，我会尽量把学习曲线保持地平滑些；
2. PostCSS的社区还没有Sass这么成熟；
3. 插件机制是把双刃剑，意味着开发人员不但需要学习某一项工具，他还通常需要学习这项工具带来的许多不同插件（想一想烦人的各种.\*rc文件吧）。

今后我们会慢慢过渡到PostCSS的。

若想使用CSS4，可以将[CSSNext](http://cssnext.io/)插件添加进来.

## 后端说明

传统的以后端（Node Express）为主的启动套件们会把前端代码放置在一个叫“public”的文件夹中，而前端的启动套件们则把所有的后端代码扔到一个简单的server.js文件中。该套件在以前端为中心的同时，会尽量尊重后端开发本身带来的复杂性，并在结构中反应这一点。因此，我把前端和后端分别放在了“client”与”server“文件夹中。

这并不是一个以后端为主的启动套件，因此这层后端非常的薄：几乎没有任何业务逻辑，很大程度上仅仅作为一个转发的中间层。换句话说，这并不是一个完整的后端结构。

这套套件内置了这套后端还有另一个重要的原因：我在开发应用的过程中，经常需要等到后端提供API才能继续。这很能理解，因为后端的工作更为复杂，更为系统化，更需要良好的计划、深思熟虑的结构，以及完善的测试。在这过程中，我没有一个好的办法来虚拟一个后端服务器用来支持我同步开发前端。因此，该套件提供了一套十分简单的虚拟机制：json文件。这种方法十分的初步，但是它对我来说够用了。

我选择了Express作为后端服务器的框架，不过你可以在koa分支中体验Koa框架。做这个选择的原因很简单：Express更成熟，有更多的支持，也能在遇到更多复杂问题时找到解决办法。而对于Koa来说，尽管它成长得非常快，也很好用，但对于完全专心于纯前端技术栈的开发者来说还是有着更大的学习曲线的。

### 各自的Babel文件

该套件使用了一些Node.js本身还未支持的ES7语言特性，具体来说，是async方程等。因此我们需要前端与后端各自使用一套Babel配置文件。

## 注意事项

1. 不要在使用`export * from ...`的时候引入Babel的插件[transform-runtime](http://babeljs.io/docs/plugins/transform-runtime/)。这会导致Babel产生转译错误，使得构建后的代码无法运行（简单地来说，它不会转译import语句）；而且根据Babel，由于此插件绝大多数情况下是在工具库中才需使用，我建议除非必需，否则不用引入；
2. 时刻关注何时Webpack 2会进入正式版（我们现在使用的是Beta版，尽管它已经比较稳定了）；
3. 时刻关注何时Babel 6会支持装饰器语法；现在我们使用的是Babel 5遗留下来的一个插件；
4. IE9强加了[对style标签个数的限定](https://blogs.msdn.microsoft.com/ieinternals/2011/05/14/stylesheet-limits-in-internet-explorer/)；假如你需要支持IE9（为什么？），请在使用代码分割时注意此限定。

## 该套件有与没有的

为了更好诠释我在这套套件中设计的这套架构，我做了一个传统的应用实例：TodoMVC。有关此应用实例本身，参见 http://todomvc.com/ 。

这套启动套件试图讨论许多前端的选择，包括但不局限于Redux，Webpack，以及CSS。这套启动套件的目的是为前端开发人员提供一套简单的公式化的架构，用来快速初始化一个前端应用。它几乎不需要任何配置；只需`npm install`就可以开始开发了。

从另一个角度来说，该套件不会试图左右你关于前端的认知与看法，比如你如何制定并使用Redux的异步工作流。另外，该套件也不适合用来开发一个十分复杂的前段应用（有上百个组件，多层的继承关系，许多自定义的服务，组装成了不同的子应用，并使用了多种设计模式的结合）。通常当你发现你被安排开发一个大型复杂应用的时候，你的水平应该也不需要一个启动套件了。
