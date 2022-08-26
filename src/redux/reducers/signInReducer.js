import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

var token = Cookies.get('admin_token');
if (token) {
    var decoded = jwt_decode(token);
}

export const decodedToken = (state = { decodedToken: decoded }, action) => {
    switch (action.type) {
        case 'SET_DECODED_TOKEN':
            return { ...state, decodedToken: action.payload };
        default:
            return state;
    }
};
