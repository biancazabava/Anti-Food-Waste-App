import { SERVER } from "../config/global";

export const GET_ALIMENTE_FUFILLED = "GET_ALIMENTE_FUFILLED";

export function getAlimente() {
  return {
    type: GET_ALIMENTE_FUFILLED,
    payload: async () => {
      const response = await fetch(`${SERVER}/api/getAlimente`);
      const data = await response.json();
      return data;
    },
  };
}
