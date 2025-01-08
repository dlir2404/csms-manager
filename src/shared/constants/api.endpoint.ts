export enum ApiEndpoint {
  LOGIN = '/auth/admin/login',
  GET_ME = '/auth/admin/me',

  //user
  GET_USERS = '/manager/user/all',
  CREATE_USER = '/manager/user',
  EDIT_USER = '/manager/user',
  TOGGLE_LOCK_USER = '/manager/user/toggle-lock',

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
  GET_ORDER = '/order',
  GET_ORDERS_OVERVIEW = '/order/overview',
  GET_ORDERS_DAILY_STATISTIC = '/order/statistic/day',
  GET_ORDERS_MONTHLY_STATISTIC = '/order/statistic/month',
  GET_ORDERS_CREATED_BY_STATISTIC = 'order/statistic/created-by',
  GET_ORDERS_PROCESSED_BY_STATISTIC = 'order/statistic/procecssed-by',
  GET_ORDERS_STATISTIC_CREATED_BY = 'order/statistic/created-by',
  GET_ORDERS_STATISTIC_PROCCESS_BY = 'order/statistic/processed-by',
  GET_ORDERS_STATISTIC_BY_PRODUCTS = 'order/statistic/by-product',
  GET_QUANTITY_STATISTIC_BY_PRODUCTS = 'order/statistic/quantity/by-product',

  //payment
  GET_PAYMENTS = '/api/payment/all',
  GET_PAYMENTS_OVERVIEW = '/api/payment/overview',
  GET_PAYMENTS_DAILY_STATISTIC = '/api/payment/statistic/day',
  GET_PAYMENTS_MONTHLY_STATISTIC = '/api/payment/statistic/month',
}
