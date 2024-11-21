import { useState } from 'react'
import { VolumeX, Volume2 } from 'lucide-react'
const PartnerVideoDisplay = (): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<number>(0)
  const [isMuted, setIsMuted] = useState<boolean>(true)

  const handleVideoSource = (tab: number): string => {
    switch (tab) {
      case 0:
        return '/videos/tennis-partner.mp4'
      case 1:
        return '/videos/padel-partner.mp4'
      case 2:
        return '/videos/pickle-partner.mp4'
      default:
        return '/videos/tennis-partner.mp4'
    }
  }

  return (
    <>
        {selectedTab === 0 && (
            <div className="aspect-[16/9] w-[80%] mx-auto bg-cover bg-center rounded-xl overflow-hidden relative" >
                <button
                    onClick={() => { setIsMuted(!isMuted) }}
                    className="absolute bottom-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <video
                    className="w-full h-full object-cover bg-[url('/images/buy/court-sweeping-cover.webp')] bg-cover bg-center"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                >
                    <source src={handleVideoSource(selectedTab)} type="video/mp4" />
                    {'Your browser doesn\'t support the video tag.'}
                </video>
            </div>
        )}
        {selectedTab === 1 && (
            <div className="bg-[url('/images/general/bm.webp')] aspect-[16/9] w-[80%] mx-auto bg-cover bg-center rounded-xl overflow-hidden relative" >
                <button
                    onClick={() => { setIsMuted(!isMuted) }}
                    className="absolute bottom-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <video style={{ boxShadow: 'inset 4px 4px 4px 6px black' }} className="w-full h-full object-cover bg-[url('/images/buy/court-sweeping-cover.webp')] bg-cover bg-center" autoPlay loop muted={isMuted} playsInline>
                    <source src={handleVideoSource(selectedTab)} type="video/mp4" />
                    {'Your browser doesn\'t support the video tag.'}
                </video>
            </div>
        )}
        {selectedTab === 2 && (
            <div className="bg-[url('/images/general/bm.webp')] aspect-[16/9] w-[80%] mx-auto bg-cover bg-center rounded-xl overflow-hidden relative" >
                <button
                    onClick={() => { setIsMuted(!isMuted) }}
                    className="absolute bottom-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <video style={{ boxShadow: 'inset 4px 4px 4px 6px black' }} className="w-full h-full object-cover bg-[url('/images/buy/court-sweeping-cover.webp')] bg-cover bg-center" autoPlay loop muted={isMuted} playsInline>
                    <source src={handleVideoSource(selectedTab)} type="video/mp4" />
                    {'Your browser doesn\'t support the video tag.'}
                </video>
            </div>
        )}
        <div className="w-[80%] mx-auto flex flex-row gap-5 pt-10 pb-24" >
            <a onClick={() => { setSelectedTab(0) }} className={`border-t-2 pt-5 cursor-pointer w-[100%] ${selectedTab === 0 ? 'border-t-green' : 'border-transparent opacity-50 hover:opacity-80'} transition-all duration-500 ease-in-out`} >
                <h3 className="font-avenirBold text-t-green text-2xl mb-2" >Tennis</h3>
                <p className="font-pluto text-t-off-white text-sm" >The most human ball machine you have ever practiced with! The Partner detects your movements and moves around the court to ensure a challenging practice for any shot you can think of.</p>
            </a>
            <a onClick={() => { setSelectedTab(1) }} className={`border-t-2 pt-5 cursor-pointer w-[100%] ${selectedTab === 1 ? 'border-t-green' : 'border-transparent opacity-50 hover:opacity-80'} transition-all duration-500 ease-in-out`} >
                <h3 className="font-avenirBold text-t-green text-2xl mb-2" >Padel</h3>
                <p className="font-pluto text-t-off-white text-sm" >Perfect your bajada and chiquita with AI-powered drills that adapt to your style, keeping each rally challenging so you stay on your toes every time you step on the court.</p>
            </a>
            <a onClick={() => { setSelectedTab(2) }} className={`border-t-2 pt-5 cursor-pointer w-[100%] ${selectedTab === 2 ? 'border-t-green' : 'border-transparent opacity-50 hover:opacity-80'} transition-all duration-500 ease-in-out`} >
                <h3 className="font-avenirBold text-t-green text-2xl mb-2" >Pickle</h3>
                <p className="font-pluto text-t-off-white text-sm" >Dinks, drives, and third shot drops - Practice any shot you want, anywhere on the court with the most realistic gameplay a ball machine can provide.</p>
            </a>
        </div>
    </>
  )
}
export default PartnerVideoDisplay
