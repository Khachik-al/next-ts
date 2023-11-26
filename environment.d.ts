declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CUSTOMER: 'tbv' | 'wfm' | 'gosmart' | 'net10' | 'pageplus' | 'simplemobile' | 'straigthtalk' | 'tracfone' | 'safelink';
    }
  }
}
export { }