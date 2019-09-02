import { Request, NextFunction } from 'express'
import { Document, Types } from 'mongoose'

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
    username?: string
    password?: string
    accessToken?: string
    refreshToken?: string
    provider?: string
    businessName?: string
    address?: string
    lat?: number
    lng?: number
    email?: string
    firstName?: string
    lastName?: string
    displayName?: string
    selectedPhoto?: string
  }

  interface IMoment extends Document {
    photographerId: Types.ObjectId
    filename: string
    mimeType: string
    bucket: string
    contentType: string
    location: string
    originalEtag: string
    resizedLocation: string
    resizedEtag: string
    amount: number
  }

  interface IOrder extends Document {
    moments: Type.ObjectId[]
    amount: number
    name: string
    email: string
    addressLine1: string
    addressLine2: string
    city: string
    postalCode: string
    state: string
    country: string
  }

  interface IEnv {
    HOST: string
    PORT
    DB_CONNECTION_STRING: string
    FACEBOOK_APP_ID: string
    FACEBOOK_APP_SECRET: string
    DEFAULT_MOMENT_PRICE: number
    STRIPE_SECRET_KEY: string
    FACEBOOK_CALLBACK_URL: string
    JWT_SECRET: string
    JWT_ISSUER: string
    JWT_AUDIENCE: string
  }

  interface IPayment extends Document {
    orderId: Types.ObjectId
    moments: Types.ObjectId[]
    amount: number
    paid: boolean
    status: string
    receipt: string
    stripeCharge: any
    purchased: Date
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
    buffer: Buffer
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
