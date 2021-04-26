const rewards = [
  {
    name: "點數 3 點",
    points: 3,
  },
  {
    name: "點數 5 點",
    points: 5,
  },
  {
    name: "點數 10 點",
    points: 10,
  },
  {
    name: "點數 20 點",
    points: 20,
  },
  {
    name: "點數 50 點",
    points: 50,
  },
  {
    name: "親親卷一張",
  },
  {
    name: "波摩5分鐘",
  },
  {
    name: "小故事",
  },
];

const getReward = (rmn) => {
  if (rmn > 60 && rmn <= 100) {
    return rewards[0];
  } else if (rmn > 30 && rmn <= 60) {
    return rewards[1];
  } else if (rmn > 20 && rmn <= 30) {
    return rewards[2];
  } else if (rmn > 15 && rmn <= 20) {
    return rewards[3];
  } else if (rmn > 10 && rmn <= 15) {
    return rewards[4];
  } else if (rmn > 5 && rmn <= 10) {
    return rewards[5];
  } else if (rmn > 3 && rmn <= 5) {
    return rewards[6];
  } else if (rmn >= 0 && rmn <= 3) {
    return rewards[7];
  }
};

export default getReward;
