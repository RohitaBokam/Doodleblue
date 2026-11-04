const API_URL = "http://localhost:3000/events";

//GetALL

export async function getEvents() {
  const response = await fetch(API_URL);
  return response.json();
}
