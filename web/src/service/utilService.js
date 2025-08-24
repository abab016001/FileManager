const GET = ({ url }) => {
  return new Promise((resolve, reject) => {
    fetch(url).then(res => {
      if (res.ok) return res.json();
      else throw Error(res.text());
    })
      .then(data => resolve({ "state": "success", "data": data }))
      .catch(err => reject({ "state": "fail", "data": err }));
  });
};

const POST = ({ url, paramObj }) => {
  console.log("POST", { url, paramObj });
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paramObj)
    }).then(res => {
      if (res.ok) return res.json();
      else return new Error(res.text());
    })
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

const resourceRoot = "http://localhost:3000/api/resource";

export const ServiceUtil = {
  GET,
  POST,
  resourceRoot
};