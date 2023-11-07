import React, { useEffect, useState } from "react";
import {
  FaGamepad,
  FaExternalLinkAlt,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const GetAllGames = () => {
  const navigate = useNavigate();
  const [gamesList, setGamesList] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(null);
  const [updatedGame, setUpdatedGame] = useState({
    name: "",
    url: "",
    author: "",
    published_date: "",
  });

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('games_list');
    navigate('/login')
  }

  useEffect(() => {
    // Check if the data exists in localStorage
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    // Check if all data is present and valid
    if (storedUsername && storedEmail && storedPassword) {
      console.log("Good Data")
    } else {
      // Clear stored data if any value is missing
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('games_list');
      navigate('/login');
    }
  }, [navigate]);

  const handleGoToCreateGame = () => {
    // Navigate to the "/create" page
    navigate("/");
  };

  useEffect(() => {
    // Get the games list from local storage
    const storedGamesList =
      JSON.parse(localStorage.getItem("games_list")) || [];
    setGamesList(storedGamesList);
  }, []);

  const handleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const handleUpdate = (index) => {
    // Open the modal and set the index for updating
    setModalIsOpen(true);
    setUpdateIndex(index);

    // Set the initial values in the modal fields
    const { name, url, author, published_date } = gamesList[index];
    // Extract only the date part from the stored format
    const dateOnly = published_date.split("T")[0];
    setUpdatedGame({ name, url, author, published_date: dateOnly });
  };

  const handleDelete = (index) => {
    // Create a copy of the gamesList array
    const updatedList = [...gamesList];

    // Remove the game at the specified index
    updatedList.splice(index, 1);

    // Update the local storage item
    localStorage.setItem("games_list", JSON.stringify(updatedList));

    // Update the state with the modified list
    setGamesList(updatedList);
  };

  const handleModalClose = () => {
    // Close the modal
    setModalIsOpen(false);
    setUpdateIndex(null);

    // Clear the updated game state
    setUpdatedGame({
      name: "",
      url: "",
      author: "",
      published_date: "",
    });
  };

  const handleModalSubmit = () => {
    // Validate the updatedGame fields if needed

    // Update the game in the gamesList
    const updatedList = [...gamesList];
    updatedList[updateIndex] = updatedGame;

    // Update the local storage item
    localStorage.setItem("games_list", JSON.stringify(updatedList));

    // Update the state with the modified list
    setGamesList(updatedList);

    // Close the modal
    handleModalClose();
  };

  const formatPublishDate = (publishedDate) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(publishedDate).toLocaleDateString(undefined, options);
  };

  const handleSortLatest = () => {
    // Sort gamesList by latest
    const sortedList = [...gamesList].sort(
      (a, b) => new Date(b.published_date) - new Date(a.published_date)
    );
    setGamesList(sortedList);
  };

  const handleSortAlphabetical = () => {
    // Sort gamesList alphabetically
    const sortedList = [...gamesList].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setGamesList(sortedList);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-400 to-pink-500">
      <div className="flex flex-col items-center w-full max-w-screen-xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition duration-300"
              onClick={handleSortLatest}
            >
              Sort by Latest
            </button>
            <button
              className="ml-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition duration-300"
              onClick={handleSortAlphabetical}
            >
              Sort Alphabetically
            </button>
            <button
              className="ml-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition duration-300"
              onClick={handleGoToCreateGame}
            >
              Create Another Game
            </button>
            <button
              className="ml-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gamesList.map((game, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ${
                expandedIndex === index ? "h-auto" : "h-fit"
              } cursor-pointer`}
              onClick={() => handleExpand(index)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FaGamepad className="text-3xl text-purple-500 mr-4" />
                  <h2 className="text-xl font-semibold">{game.name}</h2>
                </div>
              </div>
              <div
                className={`mt-4 transition-opacity duration-300 ${
                  expandedIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                {expandedIndex === index && (
                  <>
                    <p className="text-gray-700 font-medium">{`Author: ${game.author}`}</p>
                    <p className="text-gray-700 font-medium">{`Published By: ${formatPublishDate(
                      game.published_date
                    )}`}</p>
                    <a
                      href={game.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline mt-2 font-semibold flex items-center"
                    >
                      <FaExternalLinkAlt className="mr-2" />
                      Visit Game
                    </a>
                    <div className="flex mt-4 space-x-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition duration-300 flex items-center"
                        onClick={() => handleUpdate(index)}
                      >
                        <FaPencilAlt className="mr-2" />
                        Update
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-700 transition duration-300 flex items-center"
                        onClick={() => handleDelete(index)}
                      >
                        <FaTrash className="mr-2" />
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal for Update */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        className="modal"
        overlayClassName="overlay"
        shouldCloseOnOverlayClick={true}
      >
        <div
          className="bg-black bg-opacity-50 fixed inset-0"
          onClick={handleModalClose}
        ></div>
        <div className="bg-white p-8 rounded-lg shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96">
          <h2 className="text-2xl font-semibold mb-4">Update Game</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={updatedGame.name}
                onChange={(e) =>
                  setUpdatedGame({ ...updatedGame, name: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="url"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                URL:
              </label>
              <input
                type="text"
                id="url"
                value={updatedGame.url}
                onChange={(e) =>
                  setUpdatedGame({ ...updatedGame, url: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="author"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Author:
              </label>
              <input
                type="text"
                id="author"
                value={updatedGame.author}
                onChange={(e) =>
                  setUpdatedGame({ ...updatedGame, author: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="publishedDate"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Published Date:
              </label>
              <input
                type="date"
                id="publishedDate"
                value={updatedGame.published_date}
                onChange={(e) =>
                  setUpdatedGame({
                    ...updatedGame,
                    published_date: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
              onClick={handleModalSubmit}
            >
              Update
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default GetAllGames;
