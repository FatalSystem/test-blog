import { useState } from 'react'

export default function Test (): JSX.Element {
  const [toggle, setToggle] = useState<boolean>(true)
  return (
    <div>
        <button onClick={() => { setToggle(!toggle) }} className={`${toggle ? 'bg-t-green' : 'bg-t-off-white'} w-64 text-t-off-black rounded-none`} >Toggle</button>
        {/* <div className={toggle ? 'hidden' : 'block'} >
            <div id='product-component-1697596901031' className={'self-center md:self-start '} />
        </div> */}
        {/* <div className={`${toggle ? 'block' : 'hidden'}`} > */}
            <div id='product-component-1710990852401' ></div>
        {/* </div> */}
    </div>
  )
}
