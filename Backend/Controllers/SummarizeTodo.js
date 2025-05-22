import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config({});
import axios from "axios";


export const summarizeItems = async (req, res) => {
  try {
    const { PendingTodos } = req.body;
    

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Summarize the following todos line by line. Do not consider id for each tot item.",
        },
        {
          role: "user",
          content: JSON.stringify(PendingTodos),
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    

    const summary = chatCompletion.choices[0]?.message?.content || "no content";
    

    await axios.post(process.env.SLACK_WEBHOOK_URL, {
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "To-Do Summary",
            emoji: true,
          },
        },
        {
          type: "divider",
        },
        ...summary.split("\n").map((line) => ({
          type: "section",
          text: {
            type: "mrkdwn",
            text: ` ${line}`,
          },
        })),
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: "_Generated using AI",
            },
          ],
        },
      ],
    });

    
    return res.status(200).json({
        success:true,
        message:summary
    })
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({success:false, error: "Failed to summarize or send to Slack." });
  }
};
