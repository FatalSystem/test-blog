import { useState } from 'react'
import tennibotLogo from '../assets/tennibot-logo.svg'

const links = [{ label: 'How does it work?', href: '/rover' }, { label: 'About us', href: '/about-us' }, { label: 'Clubs and Coaches', href: '/clubs-and-coaches' }, { label: 'Buy', href: '/buy' }]

export default function Header () {
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = () => { setOpen(!open) }

  return (
    <header>
      <nav
        className={` absolute bg-t-black rounded-b-lg shadow-lg backdrop-blur-xl w-11/12 h-50vh left-1/2 transform top-16 -translate-x-1/2 transition duration-450 ease-in-out ${
          open ? 'opacity-100 z-20 ' : ' -translate-y-1/4 opacity-0 '
        } `}
      >
        <ul className="px-10 flex flex-col pt-10 ">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={`text-xl text-t-white font-bold mb-10 transform cursor-pointer transition duration-${
                (index + 1) * 100
              } ${open ? 'opacity-100' : 'opacity-0'} ease-in-out`}
            >
              {link.label}
            </a>
          ))}
        </ul>
      </nav>
      <div className="bg-t-black px-5 py-4 flex flex-row max-h-96 justify-between z-20">
        <a href="/" className="align-middle flex z-20">
          <img src={tennibotLogo.src} width={40} alt="Tennibot Logo" />
        </a>
        <div className="relative my-auto">
          <button onClick={handleOpen} className="w-12 h-10 ">
            <div className="block w-10  absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
              <span
                aria-hidden="true"
                className={`block rounded-md absolute h-0.5 w-10 bg-t-white transform transition duration-500 ease-in-out ${
                  open ? 'rotate-45' : '-translate-y-2.5'
                }`}
              ></span>
              <span
                aria-hidden="true"
                className={`block absolute rounded-md h-0.5 w-10 bg-t-white  transform transition  duration-500  ease-in-out  ${
                  open && 'opacity-0'
                } `}
              ></span>
              <span
                aria-hidden="true"
                className={`block absolute rounded-md h-0.5 w-10  bg-t-white transform  transition duration-500 ease-in-out ${
                  open ? '-rotate-45' : ' translate-y-2.5'
                } `}
              ></span>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
