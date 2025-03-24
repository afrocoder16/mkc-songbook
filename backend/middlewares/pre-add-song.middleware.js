/**
 * Pre-add song validation middleware module.
 * Provides middleware functions for validating song-related data before adding a new song.
 */

import SongModel from "../models/song.model.js";
import AlbumModel from "../models/album.model.js";
import { ClientFaultError } from "../utils/error.util.js";

/**
 * Checks if a song with the provided ID already exists.
 * @param {Object} req - Express request object
 * @param {Object} _res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws {ClientFaultError} If a song with the provided ID already exists
 */
export const checkSongNumberExists = async (req, _res, next) => {
    const { id } = req.body;
    const song = await SongModel.findById(id);
    if (song)
        throw new ClientFaultError(
            "A song exists with the provided song number"
        );
    next();
};

/**
 * Validates that all album IDs in the request exist in the database.
 * If albums are provided in the request, converts the comma-separated album IDs
 * into an array of album objects and attaches them to the request body.
 * @param {Object} req - Express request object
 * @param {Object} _res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws {ClientFaultError} If any of the provided album IDs don't exist
 */
export const checkAlbumExists = async (req, _res, next) => {
    const { albums: albumIds } = req.body;
    if (!albumIds) return next();
    const albums = [];
    for (const albumId of albumIds.split(",")) {
        const album = await AlbumModel.findById(albumId);
        if (!album)
            throw new ClientFaultError(
                `The album with id "${albumId}" doesn't exist.`
            );
        albums.push(album);
    }
    req.body.albums = albums;
    next();
};
