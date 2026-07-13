import React from 'react'; // Added this line to fix the 'React is not defined' error
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { a } from 'framer-motion/client';

function MyApp() {
  return (
    <div>
      <h1>Custom App!</h1>
    </div>
  )
}
// const ReactElement = {
//     type: 'a',
//     props: {
//         href: 'https://www.google.com',
//         target: '_blank'
//     },
//     children: 'Click me to visit Google'
// };

const anotherElement = (
  <a href="https://www.google.com" target="_blank">
    
    Click me to visit Google
  </a>
);

const anotherUser = "chai or code";

const reactElement = React.createElement(
  'a',
  {
    href: 'https://www.google.com',
    target: '_blank',
    rel: 'noopener noreferrer'
  },
  'Click me to visit Google',
    anotherElement
);
createRoot(document.getElementById('root')).
render(
  
    reactElement 
  
);