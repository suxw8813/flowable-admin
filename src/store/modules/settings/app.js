const app = {
    state: {
        user: {
            passport: '',
            passwd: ''
        },
        routerViews: [],
        checkRouter: '',
        includePageNames: []
    },
    mutations: {
        updataUser (state, user) {
            console.log("update")
            console.log(user)
            state.user.passport = user.passport
            state.user.passwd = user.passwd
            var str = {"passport": user.passport, "passwd": user.passwd}
            sessionStorage.setItem("loginInfo", JSON.stringify(str))
            //console.info(state.user)
        },
        updataCheckRouter (state, tag) {
            state.checkRouter = tag
        },
        pushRouterViews (state, item) {
            if (state.routerViews.some(v => v.path === item.path)) return
            state.routerViews.push(item)
            state.includePageNames.push(item.meta.name)
        },
        pushIncludePageNames (state, item) {
            debugger
            if (state.includePageNames.some(v => v.path === item.path)) return
            debugger
            state.includePageNames.push(item.meta.name)
        },
        delRouterViews (state, tag) {
            for (const [i, v] of state.routerViews.entries()) {
                if (v.path === tag.path) {
                    state.routerViews.splice(i, 1)
                    state.includePageNames.splice(i, 1)
                    break
                }
            }
            if (state.routerViews.length !== 0) state.checkRouter = state.routerViews[state.routerViews.length - 1].fullPath
        }
    }
}
export default app
