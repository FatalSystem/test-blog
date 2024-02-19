import { cn } from '@utils'
import createGlobe, { type COBEOptions } from 'cobe'
import { useCallback, useEffect, useRef } from 'react'
import { useSpring } from 'react-spring'

// markerColor: [192 / 255, 242 / 255, 12 / 255],
//   glowColor: [0.5, 0.5, 0.5],
//   markers: [
//     { location: [47.751076, -120.740135], size: 0.1 },
//     { location: [43.8041, -120.5542], size: 0.1 },
//     { location: [36.7783, -119.4179], size: 0.15 },
//     { location: [34.0489, -111.0937], size: 0.1 },
//     { location: [31.9686, -99.9018], size: 0.19 },
//     { location: [39.5501, -105.7821], size: 0.1 },
//     { location: [39.0119, -98.4842], size: 0.1 },
//     { location: [37.9643, -91.8318], size: 0.1 },
//     { location: [40.6331, -89.3985], size: 0.1 },
//     { location: [32.3182, -86.9023], size: 0.1 },
//     { location: [32.1574, -82.9071], size: 0.1 },
//     { location: [27.6648, -81.5158], size: 0.1 },
//     { location: [35.5175, -86.5804], size: 0.1 },
//     { location: [40.4173, -82.9071], size: 0.1 },
//     { location: [42.7251, -84.4791], size: 0.1 },
//     { location: [43.2994, -74.2179], size: 0.1 },
//     { location: [35.7596, -79.0193], size: 0.1 },
//     { location: [42.4072, -71.3824], size: 0.1 },
//     { location: [40.0583, -74.4057], size: 0.1 },
//     { location: [39.0458, -76.6413], size: 0.1 }
//   ],

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.5,
  dark: 1,
  diffuse: 3,
  mapSamples: 16000,
  mapBrightness: 1.8,
  baseColor: [1, 1, 1],
  markerColor: [192 / 255, 242 / 255, 12 / 255],
  // glowColor: [ 25 / 255, 26 /255, 22 /255],
  glowColor: [0.2, 0.2, 0.2],
  markers: [
    { location: [47.751076, -120.740135], size: 0.1 },
    { location: [43.8041, -120.5542], size: 0.1 },
    { location: [36.7783, -119.4179], size: 0.15 },
    { location: [34.0489, -111.0937], size: 0.1 },
    { location: [31.9686, -99.9018], size: 0.19 },
    { location: [39.5501, -105.7821], size: 0.1 },
    { location: [39.0119, -98.4842], size: 0.1 },
    { location: [37.9643, -91.8318], size: 0.1 },
    { location: [40.6331, -89.3985], size: 0.1 },
    { location: [32.3182, -86.9023], size: 0.1 },
    { location: [32.1574, -82.9071], size: 0.1 },
    { location: [27.6648, -81.5158], size: 0.1 },
    { location: [35.5175, -86.5804], size: 0.1 },
    { location: [40.4173, -82.9071], size: 0.1 },
    { location: [42.7251, -84.4791], size: 0.1 },
    { location: [43.2994, -74.2179], size: 0.1 },
    { location: [35.7596, -79.0193], size: 0.1 },
    { location: [42.4072, -71.3824], size: 0.1 },
    { location: [40.0583, -74.4057], size: 0.1 },
    { location: [39.0458, -76.6413], size: 0.1 }
  ],
  scale: 1
}

export default function Globe ({
  className,
  config = GLOBE_CONFIG
}: {
  className?: string
  config?: COBEOptions
}) {
  let phi = 0
  let width = 0
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef(null)
  const pointerInteractionMovement = useRef(0)
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001
    }
  }))

  const updatePointerInteraction = (value: any) => {
    pointerInteracting.current = value
    canvasRef.current!.style.cursor = value ? 'grabbing' : 'grab'
  }

  const updateMovement = (clientX: any) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      api.start({ r: delta / 200 })
    }
  }

  const onRender = useCallback(
    (state: Record<string, any>) => {
    //   if (!pointerInteracting.current) phi += 0.005
      state.phi = phi + r.get()
      state.width = width * 2
      state.height = width * 2
    },
    [pointerInteracting, phi, r]
  )

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth
    }
  }

  useEffect(() => {
    window.addEventListener('resize', onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender
    })

    setTimeout(() => (canvasRef.current!.style.opacity = '1'))
    return () => { globe.destroy() }
  }, [])

//   return (
//     <div
//       className={cn(
//         'absolute inset-0 mx-auto aspect-[-1/1] w-full ',
//         className
//       )}
//     >
//       <canvas
//         className={cn(
//           'h-full w-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]'
//         )}
//         ref={canvasRef}
//         onPointerDown={(e) => {
//           updatePointerInteraction(
//             e.clientX - pointerInteractionMovement.current
//           )
//         }
//         }
//         onPointerUp={() => { updatePointerInteraction(null) }}
//         onPointerOut={() => { updatePointerInteraction(null) }}
//         onMouseMove={(e) => { updateMovement(e.clientX) }}
//         onTouchMove={(e) => {
//           e.touches[0] && updateMovement(e.touches[0].clientX)
//         }
//         }
//       />
//     </div>
//   )

  return (
    <div
    className={cn(
      "absolute inset-0 mx-auto aspect-[1/1] w-full",
      className,
    )}
  >
    <canvas
      className={cn(
        "h-full w-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
      )}
      ref={canvasRef}
      onPointerDown={(e) =>
        updatePointerInteraction(
          e.clientX - pointerInteractionMovement.current,
        )
      }
      onPointerUp={() => updatePointerInteraction(null)}
      onPointerOut={() => updatePointerInteraction(null)}
      onMouseMove={(e) => updateMovement(e.clientX)}
      onTouchMove={(e) =>
        e.touches[0] && updateMovement(e.touches[0].clientX)
      }
    />
  </div>
  )
}
