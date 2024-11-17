<h1 align='center'>
  sfc2esm
  <a href="https://npmjs.com/package/setupin"><img src="https://img.shields.io/npm/v/setupin?color=orange"></a>
</h1>

<br>

<p align='center'>
  <b>English</b> | <a href="./README.zh-CN.md">简体中文</a>
</p>

<br>

### About various Vue SFC source code conversion methods

dependencies: [@vue/compiler-sfc](https://github.com/vuejs/core/tree/main/packages/compiler-sfc#readme)

```ts
export interface Options {
  id?: string
  appName?: string
}
export declare function useXxx2x({ id, appName }?: Options): {
  scr2app: (scriptSource: string, setup?: boolean) => string
  tem2render: (templateSource: string) => string
  sty2css: (styleSource: string, scoped?: boolean) => string
  sfc2x: (sfcSource: string, mount?: string) => {
    esm: string
    app: string
    render: string
    css: string
  }
}
```
