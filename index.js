const { Configuration, OpenAIApi } = require("openai");
const express = require('express');

const bodyParser = require('body-parser')
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-oTnXXZ2R3gBiucA0XZQn3fti",
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);


const app = express();
app.use(bodyParser.json())
app.use(cors())


const port = 3000;

app.post('/', async(req,res) => {
  const{message,currentModels} = req.body; 
  const response = await openai.createCompletion({
    model: `${currentModels}`,
    prompt:`${message}`,
    max_tokens:100,
    temperature:0.5,
  });
    res.json({
        // data:response.data
        message: response.data.choices[0].text,
    });
    
});

app.get('/models', async(req,res) => {
  const response = await openai.listEngines();
  console.log(response.data.data)
  res.json({
    models: response.data.data
  })
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

