<h1 align="center">React Tutorial: Social Network Demo SPA</h1>

This is a learning project created to master **`React`** and related technologies. The project is based on the 
"**`React - Путь Самурая`**" course from **`IT-Incubator`**. It is a simplified version of a social network, 
built as a **`Single Page Application`** (SPA), where I implemented core features like user authentication, 
profile management, and post creation. Additionally, I developed a real-time chat feature using **`WebSocket`**.
I also implemented a paginated user search, allowing users to browse through profiles efficiently.

At its core, the project leverages **`React`** and **`TypeScript`**, providing a strong foundation for building 
scalable and type-safe components. To handle routing, I used React **`Router DOM`**. For state management, I 
integrated **`Redux`** alongside **`React Redux`**, utilizing **`Redux Thunk`** for handling asynchronous 
actions and **`Reselect`** for efficient state selection. For forms implementation, I used both **`Redux Form`**
and **`Formik`**, ensuring solid validation and user-friendly interactions. To handle HTTP requests, I relied 
on **`Axios`**, which allowed me to interact with APIs smoothly, and **`querystring`** for encoding URL 
parameters. For generating unique identifiers, I used **`UUID`**, while **`Classnames`** helped me manage 
conditional class names in a clean and readable way. The user interface is built with **`Ant Design`**. I used 
**`Jest`** alongside **`React Test Renderer`** to write unit tests for components and application logic. 
Finally, I deployed the project using **`GitHub Pages`**, making it accessible to anyone who wants to explore 
the demo.

Throughout the codebase, I have included extensive comments to explain the logic, structure, and purpose of 
each component, function, and module. These comments are designed to make the code more accessible to other 
developers, as well as to serve as a learning resource for myself when revisiting the project in the future.

<hr>

<h3 align="center" font-size='25px'>Tech Stack</h3>

<table align="center">
  <tr>    
    <td align="center" width="121">
        <img src="./readme-images/javascript-icon.png" alt="icon" width="65" height="65" />
      <br>Javascript
    </td>
    <td align="center" width="121">
        <img src="./readme-images/npm-icon.png" alt="icon" width="65" height="65" />
      <br>NPM
    </td>
    <td align="center" width="121">
        <img src="./readme-images/typescript-icon.png" alt="icon" width="65" height="65" />
      <br>Typescript 4.3.5
    </td>    
    <td align="center" width="121">
        <img src="./readme-images/node-js-icon.png" alt="icon" width="65" height="65" />
      <br>Node.js 16.20.2
    </td>
    <td align="center" width="121">
        <img src="./readme-images/react-icon.png" alt="icon" width="65" height="65" />
      <br>React 17.0.2
    </td>
    <td align="center" width="121">
        <img src="./readme-images/react-router-dom.png" alt="icon" width="65" height="65" />
      <br>React Router DOM 5.2.0
    </td>
  </tr>

  <tr>
    <td align="center">
        <img src="./readme-images/redux-icon.png" alt="icon" width="65" height="65" />
      <br>Redux 4.1.0
    </td>
    <td align="center">
        <img src="./readme-images/redux-icon.png" alt="icon" width="65" height="65" />
      <br>React Redux 7.2.4
    </td>
    <td align="center">
        <img src="./readme-images/redux-icon.png" alt="icon" width="65" height="65" />
      <br>Redux Thunk 2.3.0
    </td>
    <td align="center">
        <img src="./readme-images/redux-icon.png" alt="icon" width="65" height="65" />
      <br>Reselect 4.0.0
    </td>
    <td align="center">
        <img src="./readme-images/redux-form-icon.jpg" alt="icon" width="65" height="65" />
      <br>Redux Form
    </td>
    <td align="center">
        <img src="./readme-images/formik-icon.png" alt="icon" width="65" height="65" />
      <br>Formik 2.2.9
    </td>
  </tr>

  <tr>
    <td align="center">
        <img src="./readme-images/axios-icon.png" alt="icon" width="65" height="65" />
      <br>Axios 0.21.1
    </td>
    <td align="center">
        <img src="./readme-images/uuid-icon.png" alt="icon" width="65" height="65" />
      <br>UUID 8.3.2
    </td>
    <td align="center">
        <img src="./readme-images/ant-design-icon.png" alt="icon" width="65" height="65" />
      <br>Ant Design 4.16.9
    </td>
    <td align="center">
        <img src="./readme-images/jest-icon.png" alt="icon" width="65" height="65" />
      <br>Jest 5.14.1
    </td>
    <td align="center">
        <img src="./readme-images/react-icon.png" alt="icon" width="65" height="65" />
      <br>React Test Renderer 17.0.2
    </td>
    <td align="center">
        <img src="./readme-images/github-pages-icon.png" alt="icon" width="65" height="65" />
      <br>GitHub Pages 3.2.3
    </td>
  </tr>
</table>

<hr>

<h3 align="center" font-size='25px'>Scripts</h3>

<table align="center">
  <tr>
    <td align="center" width="200">
        <b>Script</b>
    </td>
    <td align="center" width="300">
        <b>Description</b>
    </td>
  </tr>

  <tr>
    <td>
        npm install
    </td>
    <td>
        Installs the modules
    </td>
  </tr>
  
  <tr>
    <td>
        npm start
    </td>
    <td>
        Runs the application
    </td>
  </tr>

  <tr>    
    <td>
        npm test
    </td>
    <td>
        Runs the unit tests
    </td>
  </tr>
</table>

<hr>