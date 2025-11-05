export default function fakeAsync() {
  return new Promise((resolve) => {
      setTimeout(resolve, 0);
  });
}