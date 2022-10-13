import { getLocation } from "../services/geolocation";

export async function getAddress(lat, lon) {
    const data = await getLocation(lat, lon);
    return { city: data.city, country: data.country, error: data.error };
}


export const printCity = async (address) => {
  return address.city;
};

export const printCountry = async (address) => {
  return address.country;
};