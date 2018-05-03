export default (context) => {
    console.log('Middleware - check auth');
    context.store.dispatch('initAuth', context.req);
}