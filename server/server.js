import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from CodeMind!'
    })
})

app.post('/', async (req, res) => {
    try{
const prompt = req.body.prompt;

const response = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: `${prompt}`,
  temperature: 0,
  max_tokens: 2000,
  top_p: 1,
  frequency_penalty: 0.5,
  presence_penalty: 0,
});

        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } 
    catch (error) {
        console.error(error);
        res.status(500).send(error || 'Something went wrong');
    }
})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));