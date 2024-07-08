import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
//GET ALL
export async function getAllArtists(required,response){
    try{
        const artists = await prisma.artist.findMany();
        response.json(artists);
    }catch (e){
        response.status(500).json({message : e.message});
    }
}
//GET BY ID
export async function getArtistById(required,response){
    try{
        const artist = await prisma.artist.findUnique({ where: {id : parseInt(required.params.id)}});
        response.json(artist);
    }catch (e){
        response.status(500).json({message : e.message});
    }
}

// CREATE
export async function createArtist(required,response){
    try{
        const artist = await prisma.artist.create({data: {name: required.body.name}});
        response.status(201).json(artist)
    }catch (e){
        response.status(500).json({message:e.message});
    }
}

// UPDATE

export async function updateArtist(required,response){
    try{
        const artist = await prisma.artist.update({
            where: {id:parseInt(required.params.id)},
            data: {name: required.body.name}
        });
        response.json(artist)
    }catch (e){
        response.status(400).json({message:e.message});
    }
}

// DELETE
export async function deleteArtist(required,response){
    try{
        await prisma.artist.delete({where:{id:parseInt(required.params.id)}});
        response.json({message:'Artist deleted'});
    }catch (e){
        response.status(500).json({message:e.message});
    }
}
