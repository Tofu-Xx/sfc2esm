interface ConverterOptions {
  id?: string
}
/*  */
interface EsmConverterOptions extends ConverterOptions {
  appName?: string
}
interface CssConverterOptions extends ConverterOptions {
  isScoped?: boolean
}
/*  */
interface SfcConverterOptions extends EsmConverterOptions {
  mount?: string
}
interface ScriptConverterOptions extends EsmConverterOptions {
  setup?: boolean
}
interface templateConverterOptions extends EsmConverterOptions {}
