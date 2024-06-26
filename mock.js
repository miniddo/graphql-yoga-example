const usersInfo = [
  {
    message: "success",
    code: 1,
    profile: {
      uid: 1,
      name: "홍길동",
      email: "gildong_hong@tmax.co.kr",
      createdAt: "2020-03-20 10:00:34",
    },
    responseAt: "2024-06-25 17:49:39",
  },
  {
    message: "fail",
    code: 0,
    profile: {
      uid: 2,
      name: "김철수",
      email: "cheolsu_kim@tmax.co.kr",
      createdAt: "2021-07-07 19:13:02",
    },
    responseAt: "2024-06-25 17:49:39",
  },
];

const moneyInfo = {
  message: "success",
  code: 1,
  uid: 1,
  total: 10000000,
};

export { usersInfo, moneyInfo };
