export enum ApiEndpoint {
    LOGIN = '/auth/admin/login',
    GET_ME = '/auth/admin/me',

    //user
    GET_USERS = '/manager/user/all',
    CREATE_USER = '/manager/user',
    EDIT_USER = '/manager/user',

    //product
    GET_PRODUCTS = '/product/all',
    CREATE_PRODUCT = '/product',
    EDIT_PRODUCT = '/product',
    DELETE_PRODUCT = '/product',


    //category
    GET_CATEGORIES = '/category/all',
    CREATE_CATEGORY = '/category',
    EDIT_CATEGORY = '/category',
    DELETE_CATEGORY = '/category',
}