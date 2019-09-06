'use strict'

export interface Context {
  [x: string]: any
}

export interface NextFunction {
  (): Promise<void>
}

export interface MiddlewareFunction<C = Context> {
  (ctx: C, next?: NextFunction): Promise<void>
}

export function compose<C = Context> (...stack: MiddlewareFunction<C>[]): MiddlewareFunction<C> {
  return async (ctx: C, next?: NextFunction) => {
    let index = -1

    const dispatch = async (i: number) => {
      if (i <= index) {
        throw new Error('next() called multiple times')
      }

      index = i
      const fn = stack[i]

      if (fn) {
        return fn(ctx, dispatch.bind(null, i + 1))
      } else if (index === i && next) {
        return next()
      }
    }

    return dispatch(0)
  }
}

export default compose
