import './src/styles/reset.css'
import './src/styles/bg.scss'
import './src/styles/class.css'

const fn = (arg) => {
  return arg?.a || 'none';
}

console.log(process.env.NODE_ENV)
Array.from({ length: 3 }).forEach(() => {
  console.log('success')
})
console.log(fn())
console.log($('#app'))
