export const setDecodedToken = (decodedToken) => {
    return {
        type: 'SET_DECODED_TOKEN',
        payload: decodedToken,
    };
};
