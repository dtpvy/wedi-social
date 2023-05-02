const TRACKING_EVENT = {
  ENTER_SIGNIN: "enterSignin",
  ENTER_SIGNUP: "enterSignup",
  SIGNIN: "signin",
  SIGNUP: "signup",
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
  [TRACKING_EVENT.SIGNIN]: "Lượt truy cập",
  [TRACKING_EVENT.SIGNUP]: "Người dùng",
  [TRACKING_EVENT.ENTER_SIGNIN]: "Truy cập trang đăng nhập",
  [TRACKING_EVENT.ENTER_SIGNUP]: "Truy cập trang đăng ký",
  [TRACKING_EVENT.ENTER_FEED]: "Truy cập trang Lướt",
  [TRACKING_EVENT.ENTER_PROFILE]: "Truy cập trang cá nhân",
  [TRACKING_EVENT.ENTER_TRIP]: "Truy cập trang Chuyến đi",
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
