import { FC as ReactFC, PropsWithChildren } from 'react'

export type Nullable<T> = T | null

export type PropsWithClassName<T = unknown> = T & { className?: string }

export type FCWithClassName<T = unknown> = ReactFC<PropsWithClassName<T>>

export type FCWithChildren<T = unknown> = ReactFC<PropsWithChildren<PropsWithClassName<T>>>

export type FC<T = unknown> = ReactFC<PropsWithChildren<PropsWithClassName<T>>>
