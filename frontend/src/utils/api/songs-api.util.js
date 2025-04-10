import backendURL from "../../config/backend-url.config";

/**
 * @fileoverview Songs API utility functions
 * Contains functions for interacting with the song endpoints
 */

/**
 * Fetches all songs or searches songs based on query parameters
 * @param {Object|null} searchQuery - Search parameters
 * @param {string} [searchQuery.q] - Search text
 * @param {string} [searchQuery.type] - Search type
 * @param {string} [searchQuery.sortBy] - Sort criteria
 * @param {number} page - Page number for pagination
 * @returns {Promise<Object>} Song data from the server
 * @throws {Object} Error with message and status if request fails
 */
export const getAllOrSearchSongs = async (searchQuery = null, page = 1) => {
    console.log("🔍 FETCHING FROM:", `${backendURL}/api/song?page=${page}${   //for debuging 
        searchQuery.q ? "&q=" + searchQuery.q : ""
    }${searchQuery.type ? "&type=" + searchQuery.type : ""}${
        searchQuery.sortBy ? "&sortBy=" + searchQuery.sortBy : ""
    }`);

    const response = await fetch(
        `${backendURL}/api/song?page=${page}${
            searchQuery.q ? "&q=" + searchQuery.q : ""
        }${searchQuery.type ? "&type=" + searchQuery.type : ""}${
            searchQuery.sortBy ? "&sortBy=" + searchQuery.sortBy : ""
        }`
    );

    const data = await response.json();

    if (!response.ok) throw { message: data.message, status: response.status };

    return data;
};

/**
 * Fetches a single song by ID
 * @param {string} id - Song ID to fetch
 * @returns {Promise<Object>} Song data
 * @throws {Object} Error with message and status if request fails
 */
export const getSong = async (id) => {
    if (id.length === 0) {
        throw { message: "Song number is required.", status: 400 };
    }
    const response = await fetch(`${backendURL}/api/song/${id}`);
    const data = await response.json();

    if (!response.ok) throw { message: data.message, status: response.status };

    return data;
};

/**
 * Creates or updates a song
 * @param {FormData} formData - Form data containing song details
 * @param {boolean} edit - If true, updates existing song; if false, creates new song
 * @param {string|null} songId - ID of song to edit (required if edit is true)
 * @param {string} token - Authentication token (defaults to token in localStorage)
 * @returns {Promise<Object>} Created or updated song data
 * @throws {Object} Validation errors or server error response
 */
export const addOrEditSong = async (
    formData,
    edit = false,
    songId = null,
    token = localStorage.getItem("_s")
) => {
    const error = { status: 400 };
    let errorOccured = false;
    if (!formData.get("title") || formData.get("title").trim().length === 0) {
        errorOccured = true;
        error.titleMessage = "Title is required.";
    }
    if (!formData.get("id")) {
        errorOccured = true;
        error.songNumberMessage = "Please enter a valid song number.";
    }
    if (
        formData.get("video-link") &&
        !(
            formData.get("video-link").includes("youtu.be") ||
            formData.get("video-link").includes("youtube.com")
        )
    ) {
        errorOccured = true;
        error.videoLinkMessage = "Please enter a valid youtube link.";
    }
    if (
        formData.get("tempo") &&
        (isNaN(parseInt(formData.get("tempo"))) ||
            parseInt(formData.get("tempo") < 30))
    ) {
        errorOccured = true;
        error.tempoMessage = "Please enter a valid tempo.";
    }
    if (!formData.get("lyrics")) {
        errorOccured = true;
        error.lyricsMessage = "Lyrics is required.";
    }
    if (!formData.get("tempo")) formData.delete("tempo");
    if (!formData.get("video-link")) formData.delete("video-link");
    if (errorOccured) throw error;

    const albums = formData.getAll("albums");
    if (albums.length === 1 && !albums[0]) formData.delete("albums");
    else
        formData.set(
            "albums",
            albums.filter((a) => a)
        );

    const response = await fetch(
        `${backendURL}/api/song${edit ? "/" + songId : ""}`,
        {
            method: edit ? "PUT" : "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();
    if (!response.ok) throw { message: data.message, status: response.status };

    return data;
};

/**
 * Deletes a song by ID
 * @param {string} songId - ID of song to delete
 * @param {string} token - Authentication token (defaults to token in localStorage)
 * @returns {Promise<void>}
 * @throws {Object} Error with message and status if deletion fails
 */
export const deleteSong = async (
    songId,
    token = localStorage.getItem("_s")
) => {
    const response = await fetch(`${backendURL}/api/song/${songId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();
    if (!response.ok)
        throw {
            message: "An unexpected error occurred.",
            status: response.status,
        };
    if (!data.deleted) throw { message: "An unexpected error occurred." };
};
