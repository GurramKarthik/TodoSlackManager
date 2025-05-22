<h1> TODO Summary Assistant </h1>
<br>
<br>
<h2> Pre Requiretise to run this application</h2>
1. Your machine should support Node Envirment 
2. You should have a slack account and a channel that accepts incomming weebhook and its URL.
3. A FireBase FireStore configuration file.

<br>
<br>
<h3>SetUp Instructions </h3>
1. Clone the repo into your machine

<h4> Backend </h4>
<p>
1. In Terminal go to Backend dir
2. run <i> npm install </i>
3. TO start the Backend server <i> node index.js </i>
</p>

<h4>Frontend </h4>
1. In Terminal Go to Frontend dir
2. run <i> npm install </i>
3. To Start the applicaiton <i> npm run dev </i>

<hr/>
<br>

<h3> Slack Setup</h3>
1. Create a Slack Account.
2. Create a channel with name  Eg: <i>project-updates</i>
3. In the channel, activate the incomming webhook and create a new wrokspace in the webHook
4. Choose the channel that you created and allow it.
5. After successfully creating the webhook, under OAuth & Permission Seciton add the bellow scopes in scope section.
   <li>chat:write <li>
   <li>chat:write.public<li>
6. Now re start the channel you have created.
7. Now Under  <b>incomming webHook </b> tab copy the <b> webHook URL </b> present at webHook URL Section.
8. Now assign this URL to <b>SLACK_WEBHOOK_URL</b> present in   <i> Backend/.env <i> 

<h3> LLM Key Setup <h3>
1. Go to <i>https://console.groq.com/keys</i> and create an API KEY by sigining in.
2. Copy that API key.
3. The model used by this applicaiton is <i> LLAMA </i> provided by META.
4. Now assgin this URL to <b>GROQ_API_KEY</b> present in  <i> Backend/.env <i> 


<hr>
<br>
<h2>System Design </h2>
The Todo Summary Assistant is a full-stack application that enables users to manage their to-dos, generate intelligent summaries using an LLM (e.g., LLAMA), and send those summaries to a Slack channel using Slack Webhooks. It leverages Firebase Firestore for backend data storage.
<br>
<br>
<h3>Architecture Diagram</h3>
            +---------------------+        +-------------------------+
            |      Frontend       |        |         Backend         |
            |     (React.js)      |        |   (Node.js + Express)   |
            +---------------------+        +-------------------------+
                    |                                |
                    |   REST API calls (CRUD + /summarize)          |
                    | ----------------------------> |
                    |                                |
                    |                                |  1. Handle CRUD ops with Firestore
                    |                                |  2. Fetch pending todos
                    |                                |  3. Send prompt to LLM (LLAMA)
                    |                                |  4. Format result with Slack Blocks
                    |                                |  5. Send summary to Slack Webhook
                    |                                |
                    | <---------------------------- |
                    |      JSON Response (Todos, Summary Status)     |

                                +--------------------------+
                                |   Firebase Firestore     |
                                |   (Todos Collection)     |
                                +--------------------------+

                                +--------------------------+
                                |      LLAMA API           |
                                |  (Summarize To-Dos)      |
                                +--------------------------+

                                +--------------------------+
                                |  Slack Incoming Webhook  |
                                | (Send Summary to Slack)  |
                                +--------------------------+


<br>
<br>
<h3>1. Frontend (React.js) </h3>
1. Created an UI to manage to-dos (Add, Edit, Delete, Mark as Completed, veiw all Todos).
2. Button to trigger the LLM-powered summarization.
3. Display success/failure messages for Slack notification.

<br>
<h3>2. Backend  (Node.js + Express) </h3>
1. REST API for CRUD operations.
2. Integrates with Firestore for persistent data storage.
3. Calls GROQ's API for LLM-based summarization.
4. Sends the summary to Slack using a webhook with rich formatting (Slack Blocks).
<br>
<h3>3. Database (Firestore) </h3>
1. Stores to-dos in a todos collection.
2. Schema: { title: string, description: string,  completed: boolean }

<br>
<h3>4. LLM API (OpenAI)</h3>
1. Converts raw pending todos into a clean, human-readable summary.

<br>
<h3>5. Slack Integration </h3>
1. Slack Webhook used to post the summary in a specific channel with Markdown-style block formatting.



