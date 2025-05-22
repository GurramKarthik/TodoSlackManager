# 📝 TODO Summary Assistant

## ✅ Prerequisites

1. Your machine should support a Node.js environment.
2. You should have a Slack account and a channel that accepts incoming webhooks (along with its URL).
3. A Firebase Firestore configuration file.

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/GurramKarthik/TodoSlackManager.git
```

### Backend Setup
```bash
cd Backend
npm install
node index.js
```

### Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```


### Slack Setup
1. Create a Slack account.
2. Create a channel (e.g., #project-updates).
3. Go to the Slack API - Incoming Webhooks page.
4. Create a new app and enable Incoming Webhooks.
5. Choose the created channel and authorize the app.
6. Under OAuth & Permissions, add the following scopes:
   ```bash
   chat:write
   chat:write.public
   ```
7. Restart the Slack channel (optional but recommended).
8. Copy the Webhook URL from the Incoming Webhooks section.
9. Add it to the .env file inside the Backend/ directory as:
    ```bash
       SLACK_WEBHOOK_URL=your_copied_webhook_url
    ```

### LLM Setup
1. Go to [GROQ Console](https://console.groq.com/keys) and sign in.
2. Create and copy your API key.
3. The model used in this application is LLAMA by Meta.
4. Add the API key to your .env file in the Backend/ directory as:
   ```bash
      GROQ_API_KEY=your_groq_api_key
   ```

### Firebase FireStore Setup
1. Go to firebase console and create a project.
2. Selcet the firestore database from the build project and create a database
3. Download the setup configuration file from the project's setting > Service accounts > Generate the new private Key.
4. Copy the contents in that file and paste that in serviceAccountKey.json present in Backend/Utils directory.


## System Design
The TODO Summary Assistant is a full-stack application that enables users to:
1. Manage their to-do list.
2. Generate intelligent summaries using an LLM (LLAMA).
3. Send those summaries to a Slack channel via webhooks.
4. Store data using Firebase Firestore

### Architecture Diagram
   ```psql
      +---------------------+        +-------------------------+
      |      Frontend       |        |         Backend         |
      |     (React.js)      |        |   (Node.js + Express)   |
      +---------------------+        +-------------------------+
               |                              |
               |  REST API calls (CRUD + /summarize)
               | ---------------------------> |
               |                              |
               |                              | 1. Handle CRUD ops with Firestore
               |                              | 2. Fetch pending todos
               |                              | 3. Send prompt to LLAMA (via GROQ)
               |                              | 4. Format result using Slack Blocks
               |                              | 5. Send summary to Slack Webhook
               | <--------------------------- |
               |  JSON Response (Todos, Summary Status)
               
      +--------------------------+     +--------------------------+     +--------------------------+
      |   Firebase Firestore     |     |      LLAMA API           |     |  Slack Incoming Webhook  |
      |   (Todos Collection)     |     |  (Summarize To-Dos)      |     | (Send Summary to Slack)  |
      +--------------------------+     +--------------------------+     +--------------------------+
   ```

### Model Overview

1. Frontend (React.js)
  - UI to manage to-dos: Add, Edit, Delete, Mark as Completed, View all Todos.
  - Button to trigger the LLM-powered summarization.
  - Displays success/failure messages for Slack integration.

2.  Backend (Node.js + Express)
   - REST API for CRUD operations.
   - Integrates with Firestore for persistent storage.
   - Uses GROQ API to summarize pending tasks.
   - Sends summary to Slack using a webhook and rich formatting (Slack Blocks).

3. Database (Firestore)
   - Stores todos in a todos collection.
   - Schema:
      ```bash
         {
           "title": "string",
           "description": "string",
           "completed": "boolean"
         }
      ```
4. LLM API (LLAMA via GROQ)
   - Converts pending todos into a clean, readable summary.

5. Slack Integration
   - Sends LLM-generated summaries to a Slack channel.
   - Uses block formatting for clear message presentation


 




   




