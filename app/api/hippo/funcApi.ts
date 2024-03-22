const axios = require("axios");

//
export function generateRandomToken(length: number): string {
  const characters: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token: string = "";
  for (let i: number = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }
  return token;
}
export async function getPathVidStream(): Promise<any> {
  try {
    const res = await axios.get(process.env.STREAMBOT_BOT);
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function saveConentHippo(text: string) {
  try {
    //
    const userId = localStorage.getItem("userId");
    const res = axios.post(process.env.SAVETOVECTORDATABASE_BOT, {
      text: text,
      userId: userId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
export async function searchVidHippo(text: string) {
  const res = await axios.post("/api/hippo/search/pathVid", {
    text: text,
  });
  const dataPathResult = res.data.collection[0].metadata.url;
  localStorage.setItem("pathVidStream", dataPathResult);
  return res.data;
}