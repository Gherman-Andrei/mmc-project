import {PrismaClient} from '@prisma/client';


const prisma = new PrismaClient();

export async function getAllAlbums(required,response){
    try{
        const albums = await prisma.album.findMany();
        response.json(albums);
    }catch (e){
        response.status(500).json({message : e.message});
    }
}

export async function getAlbumByID(required,response){
    try{
        const album = await prisma.album.findUnique({where: {id: parseInt(required.params.id)}});
        response.json(album);
    }catch (e){
        response.status(500).json({message:e.message});
    }
}

export async function createAlbum(required,response){
    try{
        const album = await prisma.album.create({
            data: {
                title: required.body.title,
                description: required.body.description,
                artistId: required.body.artistId
            }
        });
        response.status(201).json(album);
    }catch (e){
        response.status(400).json({message: e.message});
    }
}

export async function updateAlbum(required,response) {
    try {
        const album = await prisma.album.update({
            where: {id: parseInt(required.params.id)},
            data: {
                title: required.body.title,
                description: required.body.description
            }
        });
        response.json(album);
    } catch (e){
        response.status(400).json({message: e.message});
    }
}

export async function deleteAlbum(required, response) {
    try {
        await prisma.album.delete({ where: { id: parseInt(required.params.id) } });
        response.json({ message: 'Album deleted' });
    } catch (e) {
        response.status(500).json({ message: e.message });
    }
}