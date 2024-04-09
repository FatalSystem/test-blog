import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn (...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export const wait = async (duration: number) => {
  await new Promise<void>((resolve) => {
    setTimeout(() => { resolve() }, duration)
  })
}
