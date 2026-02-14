declare module 'typewriter-effect/dist/core' {
  type Speed = 'natural' | number

  export interface TypewriterOptions {
    strings?: string | string[]
    cursor?: string
    delay?: Speed
    deleteSpeed?: Speed
    loop?: boolean
    autoStart?: boolean
    devMode?: boolean
    skipAddStyles?: boolean
    wrapperClassName?: string
    cursorClassName?: string
    pauseFor?: number
    stringSplitter?: (text: string) => string[]
    onCreateTextNode?: (character: string, textNode: Text) => Text | null
    onRemoveNode?: (param: { node: Node | void; character: string }) => void
    /** Custom options - may be supported by extensions or ignored */
    cursorColor?: string
    cursorBlinkSpeed?: number
    cursorStyle?: string
    cursorBlink?: boolean
    cursorBlinkInterval?: number
    [key: string]: unknown
  }

  export interface TypewriterState {
    elements: {
      container: HTMLDivElement
      cursor: HTMLSpanElement
      wrapper: HTMLSpanElement
    }
  }

  export default class TypewriterClass {
    constructor(
      container: string | HTMLElement,
      options?: TypewriterOptions
    )

    start(): TypewriterClass
    stop(): TypewriterClass
    pause(): TypewriterClass
    pauseFor(ms: number): TypewriterClass
    typeString(string: string): TypewriterClass
    pasteString(string: string, node?: HTMLElement | null): TypewriterClass
    deleteAll(speed?: Speed): TypewriterClass
    deleteChars(amount: number): TypewriterClass
    callFunction(
      callback: (state: TypewriterState) => void,
      thisArg?: Record<string, unknown>
    ): TypewriterClass
    changeDeleteSpeed(speed?: Speed): TypewriterClass
    changeDelay(delay?: Speed): TypewriterClass
  }
}
