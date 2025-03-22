import backendURL from "../../config/backend-url.config";

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


export const getSong = async (id) => {
    const response = await fetch(`${backendURL}/api/song/${id}`);
    const data = await response.json();

    if (!response.ok) throw { message: data.message, status: response.status };

    return data;
};
