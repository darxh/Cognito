import "dotenv/config";

const getGeminiAPIResponse = async (message) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: message,
            },
          ],
        },
      ],
    }),
  };

  try {
    const apiresult = await fetch(URL, options);
    const data = await apiresult.json();

    return (text = data.candidates[0].content.parts[0].text);
    // console.log(data);
    // res.send(text);
  } catch (err) {
    console.log(`error while processing the data`, err);
    res.status(500).send({ error: "Failed to fetch data from Gemini API" });
  }
};

export default getGeminiAPIResponse;

// // using the SDK
// app.post("/chat", async (req, res) => {
//   try {
//     const { message } = req.body;

//     const result = await model.generateContent(message);

//     const response = await result.response;
//     const text = response.text();
//     res.send({ message: text });
//   } catch (error) {
//     console.error("Error generating content:", error);
//     res.status(500).send({ error: "Failed to generate content" });
//   }
// });
