import { sfcCode } from '../tmp/css-scoped.html'
import { esmConverter } from './esmConverter'
import { scriptConverter } from './scriptConverter'
import { templateConverter } from './templateConverter'

console.log(esmConverter(sfcCode))
console.log(
  scriptConverter(`
    import { ref } from 'vue';
    const count = ref(0);`,
  ),
)
console.log(
  templateConverter(`
    <button @click="count++">{{ count }}</button>
  `),
)
