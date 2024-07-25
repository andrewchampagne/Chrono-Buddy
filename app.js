import express from 'express';
import { getResponseFromPrompt } from './openAiHandler.js';


const app = express();

app.use(express.static('public'));

app.get('/api/response', async (req, res) => {
    console.log("received request");
    const prompt = req.query.prompt;
    const response = await getResponseFromPrompt(prompt);
    res.json({ response });
  });

app.listen(3000, () =>{
    console.log("App Running on 3000")
})