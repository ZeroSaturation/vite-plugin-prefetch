const pluginConfig = {
    api: 'fetch',
    list: [
        { url: '/api/test', method: 'get', adapter: (params) => ({header: {}, query: {}, body: {}}), trigger: (params) => true },
        { url: '/api/test', method: 'post', adapter: (params) => ({header: {}, query: {}, body: {}}), trigger: (params) => false },
    ]
}