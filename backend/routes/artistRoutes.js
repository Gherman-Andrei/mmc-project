import express from 'express';
import {
    getAllArtists,
    getArtistById,
    createArtist,
    updateArtist,
    deleteArtist,
    getAlbumsByArtistId
} from '../controllers/artistController.js';

const router = express.Router();

router.get('/', getAllArtists);
router.get('/:id', getArtistById);
router.post('/', createArtist);
router.put('/:id', updateArtist);
router.delete('/:id', deleteArtist);

router.get('/:id/albums',getAlbumsByArtistId)

export default router;