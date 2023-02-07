import fs from "fs";
import IGames from "../interfaces/games";
const readData = async (): Promise<IGames[]> => {
  let json: any = await fs.promises.readFile(
    "src/data/external_data.json",
    "utf8"
  );
  let data : any[] = JSON.parse(json.toString());
  let games: IGames[] = [];
  data.forEach(
    (element) => {      
      games.push({
        id: element.id,
        title: element.title,
        slug: element.slug,
        providerName: element.providerName,
        thumb: {
          url: element.thumb == null ? "" : element.thumb.url ,
        },
      });
    }
  );

  return games;
};

const getData = async (query?: string) => {  
  const games = await readData();  
  if (query) {    
    return games.filter((e) => e.title?.toString().toLowerCase().includes(query.toString().toLowerCase()));
  }
  return games;
};

export default { getData };
