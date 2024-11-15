import { sfcCode } from '../tmp/css-scoped.html'
import { esmConverter } from './esmConverter'
import { scriptConverter } from './scriptConverter'
import { styleConverter } from './styleConverter'
import { templateConverter } from './templateConverter'

// console.log(esmConverter(sfcCode))
// console.log(
//   scriptConverter(`
//     import { ref } from 'vue';
//     const count = ref(0);`,
//   ),
// )
// console.log(
//   templateConverter(`
//     <button @click="count++">{{ count }}</button>
//   `),
// )
// console.log(
//   styleConverter(`
//     @import "https://unpkg.com/@tofukit/resetcss";

//     button {
//       margin: auto;
//     }
//   `, { isScoped: true }),
// )
