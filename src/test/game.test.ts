import gamesService from "../services/gamesService";

test("Games Test", async () => {
  let response = await gamesService.getGames({    
    user : {
        id : 1
    },
    query : {

    }
  });
  expect(response.data.length).toBeGreaterThan(1);
}, 30000);

test("Games Test With Query", async () => {
    let response = await gamesService.getGames({    
      user : {
          id : 1
      },
      query : {
        query : "Tome of Madness"
      }
    });
    expect(response.data.length).toBe(1);
  }, 30000);
