import { useState, useRef, useLayoutEffect } from 'react'
import Hello from './Hello.svelte'

import './index.css'

function App() {
  const [count, setCount] = useState(0);
  const svelteRef = useRef(0);
  /* The Svelte component would be available in the svelteRef.current, but only after the React component has been mounted, so useLayoutEffect() is used over here to wait for the component to be mounted, so the ref would be available.
  This fn() will be called directly after the component is mounted and before the updates are painted 
  
  The Svelte component would be rendered twice, as by default App.jsx is wrapped withing React.StrictMode.
  In React18, StrictMode means in dev, the app gets mounted, unmounted and then remounted, which is why the useLayoutEffect() gets execute twice => Svelte component gets displayed twice, but rather than replaceing the value, it is just appending the values with the previous values.
  
  */
  useLayoutEffect(() => {
    /*If there is 1st child remove it, and keep on doing it till there are no children left*/
    while(svelteRef.current?.firstChild){
      svelteRef.current?.firstChild?.remove();
    }
    // Create a Hello component
    new Hello({
      target: svelteRef.current,
      props:{
        // Props to the Svelte Component
        extraText:'Wassup from React!',
        // Callback() as Props to the Svelte Component
        onClick: () => alert("Got a click for Svelte from React")
      }
    })
  },[]);

  return (
    <>
      <div>
        {/*Div to mount the Svelte component*/}
        <div ref={svelteRef}></div>
        <button className='btn btn-success' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
