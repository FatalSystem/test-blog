import { type PropsWithChildren } from 'react'

export type TArrowButton = PropsWithChildren<
React.DetailedHTMLProps<
{ svg?: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>,
HTMLButtonElement
>
>

export type TDotButton = PropsWithChildren<
React.DetailedHTMLProps<
React.ButtonHTMLAttributes<HTMLButtonElement>,
HTMLButtonElement
>
>
