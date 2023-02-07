import gamesService from "../services/gamesService";

test("Slot Test", async () => {
  let response = await gamesService.slotMachine({    
    user : {
        id : 1
    }    
  });
  expect(response.data.success).toBe(true);
}, 30000);


