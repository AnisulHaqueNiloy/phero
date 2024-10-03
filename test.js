// const isVerified = true;

// if (isVerified === true) {
//   console.log("verified");
// } else {
//   console.log("not");
// }

function time(time) {
  const hour = parseInt(time / 3600);
  const remainSec = time % 3600;
  const min = parseInt(remainSec / 60);
  const sec = remainSec % 60;
  return `${hour} ${min} ${sec} second ago`;
}
