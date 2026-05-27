"use client";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8000/v1/employees");
        const data = await res.json();
        console.log(data);
        setUsers(data);
      } catch (error) {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("Sending...");

    try {
      const res = await fetch("http://localhost:8000/v1/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
        }),
      });

      const data = await res.json();
      setSubmitStatus(`Posted successfully! Demo ID: ${data.id}`);
      setForm({ name: "", email: "", role: "" });
    } catch (error) {
      setSubmitStatus("Failed to submit demo data.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <div className="text-xl font-bold tracking-tight">Nova</div>
        <a
          href="#form"
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
        >
          Send Demo Data
        </a>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-slate-300">
              Live data + demo post form
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              A modern landing page that fetches and posts data.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              This component loads sample users on page load and lets you submit
              demo form data using the Fetch API.
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="#users"
                className="rounded-full bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400"
              >
                View Data
              </a>
              <a
                href="#form"
                className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/5"
              >
                Post Demo
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <h2 className="text-xl font-semibold">Fetched users</h2>
            <p className="mt-2 text-sm text-slate-400">
              {loading
                ? "Loading demo data..."
                : "Sample data fetched from an API."}
            </p>

            <div id="users" className="mt-6 space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="rounded-2xl bg-slate-900 p-4 ring-1 ring-white/10"
                >
                  <p className="font-medium">Name: {user.name}</p>
                  <p className="text-sm text-slate-300">Email: {user.email}</p>
                  <p className="text-sm text-slate-500 font-bold">
                    Role: {user.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-24 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Fetch on load",
              desc: "Gets data automatically with useEffect when the page opens.",
            },
            {
              title: "Post demo data",
              desc: "Sends sample form values with a JSON POST request.",
            },
            {
              title: "Clean UI",
              desc: "Simple, modern Tailwind styling that works well as a base.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-slate-300">{item.desc}</p>
            </div>
          ))}
        </section>

        <section
          id="form"
          className="mt-24 grid gap-10 lg:grid-cols-2 lg:items-start"
        >
          <div>
            <h2 className="text-3xl font-bold">Post demo data</h2>
            <p className="mt-4 max-w-xl text-slate-300">
              Fill in the form and send a demo POST request. The response is
              shown below after submission.
            </p>

            <p className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">
              Status: {submitStatus || "Ready to submit."}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl"
          >
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 outline-none ring-0 placeholder:text-slate-500 focus:border-indigo-500"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 outline-none placeholder:text-slate-500 focus:border-indigo-500"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Role
                </label>
                <input
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 outline-none placeholder:text-slate-500 focus:border-indigo-500"
                  placeholder="INTERN | ENGINEER | ADMIN"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400"
              >
                Submit Demo Data
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
