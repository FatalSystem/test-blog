import { DependencyList, useEffect } from "react"

type TimerType = "interval" | "timeout"

interface IUseTimer {
  type?: TimerType
  duration: number
  onStart?: () => void
  onComplete: (() => void) | (() => Promise<void>)
  onDeactivate?: () => void
  onDestroy?: () => void
  key?: string
  deps: DependencyList
  activateWhen: boolean | boolean[] | string
}

const useTimer = ({
  type = "timeout",
  duration,
  onStart = () => {},
  onComplete,
  onDeactivate = () => {},
  onDestroy = () => {},
  deps,
  activateWhen = true,
}: IUseTimer) => {
  useEffect(() => {
    let timeout: undefined | NodeJS.Timeout
    let interval: undefined | NodeJS.Timeout
    const activationCondition = Array.isArray(activateWhen)
      ? activateWhen.every((bool) => bool)
      : activateWhen
    if (activationCondition) {
      onStart()
      if (type === "interval") {
        interval = setInterval(onComplete, duration)
      } else {
        timeout = setTimeout(onComplete, duration)
      }
    } else {
      if (type === "interval" && interval) clearInterval(interval)
      else if (type === "timeout" && timeout) clearTimeout(timeout)
      onDeactivate()
    }
    return () => {
      if (type === "interval" && interval) clearInterval(interval)
      else if (type === "timeout" && timeout) clearTimeout(timeout)
      onDestroy()
    }
  }, [...deps, duration])
}

export default useTimer
