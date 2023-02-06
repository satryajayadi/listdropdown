import React, { useState } from "react";
import Select from "react-select";
import { Inter } from "@next/font/google";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [datas, setData] = useState([]);
  const [userSelect, setUser] = useState("");
  const [userText, setText] = useState(false);

  const getTaste = async () => {
    const taste = await fetch("https://pokeapi.co/api/v2/berry/");
    const value = await taste.json();
    let result = value.results.map((data) => {
      return {
        label: data.name,
        value: data.name,
      };
    });

    setData(result.sort((a, b) => a.label.localeCompare(b.label)));
  };

  useEffect(() => {
    getTaste();
  }, []);

  const submit = () => {
    setText(true);
  };

  const change = (value) => {
    setUser(value);
  };

  return (
    <>
      <div className="app w-full h-full">
        <Select
          options={datas}
          className="z-2 w-full h-full border"
          onChange={(e) => change(e.value)}
        />
      </div>
      <div className="py-10 w-full h-28 flex justify-center">
        <button
          onClick={submit}
          className="bg-blue-500 h-10 w-4/12 rounded-full text-white"
        >
          Submit
        </button>
      </div>

      <h1 className="text-center text-4xl font-bold ">
        {userText ? userSelect : ""}
      </h1>
    </>
  );
}
