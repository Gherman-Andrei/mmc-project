import express from "express";
import {
    createAlbum,
    deleteAlbum,
    getAlbumByID,
    getAllAlbums,
    getSongsByAlbumId,
    updateAlbum
} from "../controllers/albumController.js";


const router = express.Router();

router.get('/', getAllAlbums);
router.get('/:id', getAlbumByID);
router.post('/', createAlbum);
router.put('/:id', updateAlbum);
router.delete('/:id', deleteAlbum);

router.get('/:id/songs',getSongsByAlbumId);

export default router;