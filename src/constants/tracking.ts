const TRACKING_EVENT = {
  ENTER_SIGNIN: "enterSignin",
  ENTER_SIGNUP: "enterSignup",
  ENTER_FEED: "enterFeed",
  ENTER_PROFILE: "enterProfile",
  ENTER_TRIP: "enterTrip",
  ADD_FRIEND: "addFriend",
  CREATE_POST: "createPost",
  CREATE_COMMENT: "createComment",
  CREATE_TRIP: "createTrip",
  CREATE_SCHEDULE: "createSchedule",
  CREATE_REACTION: "createReaction",
};

const TRACKING_TITLE = {
  [TRACKING_EVENT.ENTER_SIGNIN]: "Xem trang Đăng nhập",
  [TRACKING_EVENT.ENTER_SIGNUP]: "Xem trang Đăng ký",
  [TRACKING_EVENT.ENTER_FEED]: "Xem trang Lướt",
  [TRACKING_EVENT.ENTER_PROFILE]: "Xem trang cá nhân",
  [TRACKING_EVENT.ENTER_TRIP]: "Xem trang Chuyến đi",
  [TRACKING_EVENT.ADD_FRIEND]: "Kết bạn",
  [TRACKING_EVENT.CREATE_POST]: "Tạo bài viết",
  [TRACKING_EVENT.CREATE_COMMENT]: "Tạo comment",
  [TRACKING_EVENT.CREATE_TRIP]: "Tạo chuyến đi",
  [TRACKING_EVENT.CREATE_SCHEDULE]: "Tạo sự kiện",
  [TRACKING_EVENT.CREATE_REACTION]: "Thả reaction",
};

const TRACKING_PAGE = {
  FEED: "feed",
  PROFILE: "profile",
  TRIP: "trip",
  SIGNIN: "signin",
  SIGNUP: "signup",
};

export { TRACKING_EVENT, TRACKING_PAGE, TRACKING_TITLE };
