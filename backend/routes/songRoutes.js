import express from "express";
import {createSong, deleteSong, getAllSongs, getSongById, updateSong} from "../controllers/songController.js";

const router = express.Router();

router.get('/', getAllSongs);
router.get('/:id', getSongById);
router.post('/', createSong);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);

export default router;