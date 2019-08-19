import { Request, Response, NextFunction } from 'express'
import { IUser } from 'database/schema/user'

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    PUBLIC_URL: string
  }
}

declare module '*.bmp' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>

  const src: string
  export default src
}

declare module '*.module.css' {
  const css: { [key: string]: string }
  export default css
}

declare module '*.css' {
  export default any
}

declare global {
  interface Window {
    browserHistory: any
    Stripe: any
  }
  declare const __BROWSER__: string
  declare const __SERVER__: string
}

interface OrderParams {
  orderId: string
}

interface RequestWithUser extends Request {
  user: IUser
}

interface RequestWithFile extends RequestWithUser {
  file: UploadedFile
}

interface RequestWithOrder extends Request {
  user: IUser
  file: UploadedFile
  params: OrderParams
}

type UploadedFile = {
  originalname: String
  mimetype: String
  transforms: TransformedFile[]
}

type TransformedFile = {
  id: String
  bucket: String
  contentType: String
  location: String
  etag: String
}
