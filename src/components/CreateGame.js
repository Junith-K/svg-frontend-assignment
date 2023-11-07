import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateGame = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedDate, setPublishedDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the data exists in localStorage
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    // Check if all data is present and valid
    if (storedUsername && storedEmail && storedPassword) {
      console.log("Good Data");
    } else {
      // Clear stored data if any value is missing
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("games_list");
      navigate("/login");
    }
  }, [navigate]);

  const handleCreate = () => {
    // Create the game object
    const gameObject = {
      name,
      url,
      author,
      published_date: publishedDate,
    };

    // Get the existing games list from local storage or initialize an empty array
    const existingGamesList =
      JSON.parse(localStorage.getItem("games_list")) || [];

    // Add the new game object to the list
    existingGamesList.push(gameObject);

    // Update the local storage with the modified games list
    localStorage.setItem("games_list", JSON.stringify(existingGamesList));

    // Print the game object
    console.log(gameObject);

    // Reset the form fields
    setName("");
    setUrl("");
    setAuthor("");
    setPublishedDate("");
  };

  const handleNavigateToGetAll = () => {
    // Navigate to the "/getall" page
    navigate("/getall");
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("games_list");
    navigate("/login");
  };

  function getCurrentDate() {
    const currentDate = new Date().toISOString().split("T")[0];
    return currentDate;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-400 to-pink-500">
      <div className="w-2/3 bg-white p-12 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-bold mb-6 text-purple-800">
          Create a New Game
        </h2>
        <form>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Game Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="url"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Game URL:
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="author"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Author:
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="publishedDate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Published Date:
            </label>
            <input
              type="date"
              id="publishedDate"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              min="1900-01-01" // Set a minimum date if needed
              max={getCurrentDate()} // Set the current date as the maximum date
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
            />
          </div>
          <button
            type="button"
            onClick={handleCreate}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded hover:opacity-80 focus:outline-none mb-4"
          >
            Create
          </button>
          <button
            type="button"
            onClick={handleNavigateToGetAll}
            className="w-full bg-purple-500 text-white p-4 rounded hover:opacity-80 focus:outline-none mb-4"
          >
            View All Games
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full bg-purple-500 text-white p-4 rounded hover:opacity-80 focus:outline-none mb-4"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGame;
