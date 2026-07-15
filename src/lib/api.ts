'use server';

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "./auth";

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user;
}

export const  getEvent = async (email: string)=>{
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
    const res = await fetch(`http://localhost:5000/dashboard/my-events/${email}`, {
       cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.json();
}
export const  getAllEvent = async ()=>{
    const res = await fetch(`http://localhost:5000/all-events`);
    return res.json();
}


export const getSingleEvent = async (id: string | number) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(`http://localhost:5000/my-event/${id}`, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
  });

  return res.json();
};