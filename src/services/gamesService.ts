import { Request } from "express";
import db from "../core/db";
import external_source from "../data/data";
import CustomJson from "../interfaces/json";

const getGames = async (props: any) : Promise<CustomJson> => {
    const { query } = props.query;
    let games = await external_source.getData(query?.toString());
    return {
        success : true,
        data : games,
        errorMessage : null
    };
};

const slotMachine = async (props:any): Promise<CustomJson> => {
    let user_id = (<any>props).user.id;
    let user_money = await getUserMoney(user_id);
    if(user_money < 1){
        return {
            success : false,
            data : null,
            errorMessage : "Insufficient Balance"
        }
    }
    let random_reel = getReels();
    var rewards = 0;
    for (let i = 0; i < random_reel.length; i++) {
        try {            
            if(random_reel[i] === random_reel[i+1] && random_reel[i] === random_reel[i+2]){                                
                rewards = rewards + awardCalculator(random_reel[i],3);                
            }else if(random_reel[i] === random_reel[i+1]){
                rewards = rewards + awardCalculator(random_reel[i],2);
            }            
        } catch (error) {            
        }     
    }

    const money = await updateUserMoney(user_id,rewards);

    return {
        success : true,
        data : {
            reel : random_reel,
            rewards : rewards,   
            money : money                         
        },
        errorMessage : null
    }
}

const getUserMoney = async(id : number) => {
    let data: any = await db(
        `SELECT * FROM test.users WHERE id = $1
          ORDER BY id ASC`,
        [id]
      );
      return data[0].money;
}

const updateUserMoney = async(id : number, rewards : number) => {
    let data: any = await db(
        `SELECT * FROM test.users WHERE id = $1
          ORDER BY id ASC`,
        [id]
      );
      data = data[0];
      data.money = data.money - 1;
      data.money = data.money + rewards;
      await db("UPDATE test.users SET money = $1 WHERE id = $2 RETURNING *",
      [data.money,data.id]
      )
      return data.money;
}

const getReels = () => {
    let reel1 = ["cherry", "lemon", "apple", "lemon", "banana", "banana", "lemon", "lemon"];
    let reel2 = ["lemon", "apple", "lemon", "banana", "cherry", "apple", "banana", "lemon"];
    let reel3 = ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"];
    let reels = [reel1,reel2,reel3];
    return reels[Math.floor(Math.random()*reels.length)];
}

const awardCalculator = (name : string, count : number) : number => {
    let type = name;
        
    if(type === "cherry"){
        return count == 3 ? 50 : 40
    }else if(type === "apple"){
        return count == 3 ? 20 : 10
    }else if(type === "banana"){
        return count == 3 ? 15 : 5
    }else if(type === "lemon"){
        return count == 3 ? 3 : 0
    }
    return 0;
}

export default {getGames,slotMachine}
