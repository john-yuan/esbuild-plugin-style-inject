export declare function styleInjectPlugin(options?: {
  /**
   * Inject css. Default: `true`.
   */
  css?: boolean

  /**
   * Inject less. Default: `true`.
   */
  less?: boolean
}): {
  name: string
  setup: (build: any) => void
}
