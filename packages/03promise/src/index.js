const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p1");
  }, 100);
});

p1.then((res) => {
  console.log(res);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("p2");
    }, 1000);
  });
}).then((res) => {
  console.log(res);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("p3");
    }, 1000);
  });
});
