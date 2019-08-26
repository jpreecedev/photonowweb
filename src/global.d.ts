import { Request, NextFunction } from 'express'
import { Document } from 'mongoose'

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
  declare const FB: any

  interface Profile {
    id: string
    displayName: string
    username: string
    email: string
  }

  interface IUser extends Document {
    id: string
    accessToken?: string
    refreshToken?: string
    provider?: string
    businessName?: string
    address?: string
    lat?: Number
    lng?: Number
    email?: string
    displayName?: string
    username?: string
    selectedPhoto?: string
    stripeCustomerId?: string
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
    originalname: string
    mimetype: string
    transforms: TransformedFile[]
  }

  type TransformedFile = {
    id: string
    bucket: string
    contentType: string
    location: string
    etag: string
    key: string
  }
}
