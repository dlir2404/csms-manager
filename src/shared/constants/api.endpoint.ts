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

  //order
  GET_ORDERS = '/order/all',
  GET_ORDERS_DAILY_STATISTIC = '/order/statistic/day',
  GET_ORDERS_MONTHLY_STATISTIC = '/order/statistic/month',
  GET_ORDERS_CREATED_BY_STATISTIC = 'order/statistic/created-by',
  GET_ORDERS_PROCESSED_BY_STATISTIC = 'order/statistic/procecssed-by',
}
