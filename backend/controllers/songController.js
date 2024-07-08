import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllSongs(required, response) {
    try {
        const songs = await prisma.song.findMany();
        response.json(songs);
    } catch (e) {
        response.status(500).json({ message: e.message });
    }
}

export async function getSongById(required, response) {
    try {
        const song = await prisma.song.findUnique({ where: { id: parseInt(required.params.id) } });
        response.json(song);
    } catch (e) {
        response.status(500).json({ message: e.message });
    }
}

export async function createSong(required, response) {
    try {
        const song = await prisma.song.create({
            data: {
                title: required.body.title,
                length: required.body.length,
                albumId: required.body.albumId
            }
        });
        response.status(201).json(song);
    } catch (e) {
        response.status(400).json({ message: e.message });
    }
}

export async function updateSong(required, response) {
    try {
        const song = await prisma.song.update({
            where: { id: parseInt(require.params.id) },
            data: {
                title: required.body.title,
                length: required.body.length
            }
        });
        response.json(song);
    } catch (e) {
        response.status(400).json({ message: e.message });
    }
}

export async function deleteSong(required, response) {
    try {
        await prisma.song.delete({ where: { id: parseInt(required.params.id) } });
        response.json({ message: 'Song deleted' });
    } catch (e) {
        response.status(500).json({ message: e.message });
    }
}
