const root = "http://localhost:3000/dialog";
export const openFolderWindow = () => {
  return new Promise((resolve, reject) => {
    fetch(`${root}/select-folder`)
      .then(resp => resp.json())
      .then(data => {
        resolve(data);
      })
      .catch(err => reject(err))
  })
}