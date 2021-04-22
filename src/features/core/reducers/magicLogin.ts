const magicLoginRequest = (state, { payload }) => ({
    ...state,
    ...payload
});

const magicLoginSuccess = (state, { payload }) => ({
    ...state,
    ...payload
});

const invalidToken = (state, { payload }) => ({
    ...state,
    ...payload
});

const getMagicLogin = (state, { payload }) => ({
    ...state,
    ...payload
});

export default {
    magicLoginRequest,
    magicLoginSuccess,
    invalidToken,
    getMagicLogin,
};

// http://localhost:3000/magic-login?magic_token=eyJzIjoiMldIRGhDSFRPLUhud2UyODVfQ1RxaU9qeWhVIiwidiI6MSwicCI6IntcInVcIjozMTExNDkyMixcInZcIjoxLFwidXJsXCI6XCJodHRwczpcXFwvXFxcL3N0YWdpbmctd2ViLm1hcmNlbGZvcmFydC5jb21cXFwvbWFnaWMtbG9naW4_bWFnaWNfdG9rZW49ZTJmYmVhMzkyMjcwNDAyODhmNTAzMDQ4ZGU2NzdmMGZcIixcImlkXCI6XCJkZDc3ZTQwNmMxZTQ0ZTE3OGEwMjRkNTdiZTc4NTYzOFwiLFwidXJsX2lkc1wiOltcIjhhZWZkYzk2Nzg3NTdkYWFiYWEwOWVmY2Q4NGUwOWJlZDM5NGM2NTZcIl19In0