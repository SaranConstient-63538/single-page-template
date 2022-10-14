
const { createStore } = React.lazy(()=> import('redux'));
const { reducer } = React.lazy(()=> import('./reducer'))

export const store = createStore(reducer);