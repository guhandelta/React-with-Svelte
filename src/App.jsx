import { useRef, useLayoutEffect } from 'react'

import Counter from './Counter.svelte'
import Hello from './Hello.svelte'

import './index.css'
import useStore from './store';

/* Svelte wrapper fn() to make passing props, more generic and, to get a Svelte component aas prop and convert it into a React component and execute all the hooks, (i.e.) useLayoutEffect and useRef to mount the component and pass the props to the Svelte component */
function SvelteWrapper(Component){
  return (props) => {
    const svelteRef = useRef();
    useLayoutEffect(() => {
      /*If there is 1st child remove it, and keep on doing it till there are no children left*/
      while(svelteRef.current?.firstChild){
        svelteRef.current?.firstChild?.remove();
      }
      // Create a Hello component
      new Component({
        target: svelteRef.current,
        props
      })
    },[]);
    return <div ref={svelteRef}></div>
  };

}

const SvelteHello = SvelteWrapper(Hello);
const SvelteCounter = SvelteWrapper(Counter);

function App() {
  // Replaced useState with a Global store
  const {count, increment } = useStore();

  return (
    <>
      <div>
        {/*Svelte component*/}
        <SvelteHello 
          extraText="Props from React passed down to the Svelte"
          onClick={increment}
        />
        <button className='btn btn-success' onClick={increment}>
          count is {count}
        </button>
        <SvelteCounter />
      </div>
    </>
  )
}

export default App
