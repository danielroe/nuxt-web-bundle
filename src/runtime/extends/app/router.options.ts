import type { RouterOptions } from '@nuxt/schema'
import { createMemoryHistory } from 'vue-router'

export default <RouterOptions> {
  history: (baseURL) => {
    return createMemoryHistory(baseURL)
  }
}
