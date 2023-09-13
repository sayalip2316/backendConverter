const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;
const cors=require("cors");

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Endpoint to convert code
app.post('/convert', async (req, res) => {
  try {
    const { code, language } = req.body;
    const apiKey = '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'; // Replace with your ChatGPT API key
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-002/completions', {
      prompt: `Translate the following ${language} code: ${code}`,
      max_tokens: 50,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const convertedCode = response.data.choices[0].text;
    res.json({ convertedCode });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Code conversion failed.' });
  }
});

// app.post('/debug', async (req, res) => {
//   try {
//     const {code} = req.body;
//     let response = await generateCompletion(`Debug the following code:-  ${code} \n please check if there is any error and also correct it. also if it's correct provide steps what code is doing and how we can improve it`);
//     res.json({ response });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

app.post('/debug', async (req, res) => {
  try {
    const { code} = req.body;
    const apiKey = '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'; // Replace with your ChatGPT API key
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-002/completions', {
      prompt: `Debug the following code:-  ${code} \n please check if there is any error and also correct it. also if it's correct provide steps what code is doing and how we can improve it`,
      max_tokens: 50,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const convertedCode = response.data.choices[0].text;
    res.json({ convertedCode });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Code conversion failed.' });
  }
});

app.post('/quality', async (req, res) => {
  try {
    const { code} = req.body;
    const apiKey = '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'; // Replace with your ChatGPT API key
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-002/completions', {
      prompt: `Check the quality of the following code:-  ${code} \n please provide detailed info and also provide some tips to improve. provide in points`,
      max_tokens: 50,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const convertedCode = response.data.choices[0].text;
    res.json({ convertedCode });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Code conversion failed.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
