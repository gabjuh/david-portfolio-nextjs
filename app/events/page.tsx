import React, { useState, useEffect } from "react";
import IData from "@/interfaces/IData";
import Title from "../components/Title";
import IEvents from '../../interfaces/IEvents';
import EventItem from "../components/EventItem";
import Link from "next/link";
import FilterEvents from "../components/FilterEvents";
import Events from "../components/Events";

export default async function HomePage() {

  const apiUrl = `https://${process.env.NEXT_PUBLIC_BACKEND_API}`;

  async function getData() {
    const res = await fetch(`${apiUrl}/data.json`,
      { cache: 'no-store' }
    );
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }

  const data: IData = await getData();


  return (
    <Events
      data={data}
    />
  );
}
