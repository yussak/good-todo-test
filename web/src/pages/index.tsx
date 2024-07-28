import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchText();
  }, []);

  const fetchText = async () => {
    try {
      const res = await axios.get("http://localhost:8080/todos");
      setTodos(res.data);
    } catch (error) {
      throw new Error(`An error occurred: ${error}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, body } = e.target.elements;
    console.log("t", title.value, body.value);
    try {
      await axios.post("http://localhost:8080/todo", {
        title: title.value,
        body: body.value,
      });
    } catch (error) {
      throw new Error("error", error);
    }
    fetchText();
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className}`}>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" />
          <input type="text" name="body" />
          <input type="submit" value="add" />
        </form>
        {todos.map((todo) => (
          <p key={todo.id}>
            {todo.id}: {todo.title}, {todo.body}
          </p>
        ))}
      </main>
    </>
  );
}
