import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';


const filename = fileURLToPath(import.meta.url);
const directoryname = path.dirname(filename);

const prisma = new PrismaClient();

const dataPath = path.join(directoryname, 'data', 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath,'utf-8'));

async function importData(){
    try{
        for (const artist of data){
            await prisma.artist.create({
                data:{
                    name:artist.name,
                    albums:{
                        create: artist.albums.map(album =>({
                            title: album.title,
                            description: album.description.trim(),
                            songs:{
                                create: album.songs.map(song =>({
                                    title:song.title,
                                    length: song.length
                                }))
                            }
                        }))
                    }
                }
            });
        }
        console.log('Data imported successful');
    }catch (e){
        console.error('Data import error', e);
    }finally {
    await prisma.disconnect;
}
}
importData();
