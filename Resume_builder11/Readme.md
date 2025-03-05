## Google Configuration

📌 1️⃣ Enable Google Drive API in Google Cloud Console
Go to Google Cloud Console
Select an existing project or create a new one
Click on "Select a Project" (top bar)
Click "New Project", give it a name, and Create
Enable Google Drive API
In the left sidebar, go to "APIs & Services" > "Library"
Search for Google Drive API
Click "Enable"

📌 2️⃣ Create a Service Account
Go to "APIs & Services" > "Credentials"
Click "Create Credentials" > "Service Account"
Fill in the Service Account Details:
Name: drive-api-service
Description: Service account for uploading files to Google Drive
Click "Create and Continue"
Grant Permissions:
Under "Select a role", choose:
Editor (if you want full Drive access)
Owner (if you want to manage files and permissions)
Click "Continue"
Click "Done"

📌 3️⃣ Generate JSON Key for Service Account
Go to "APIs & Services" > "Credentials"
Click on the service account you just created
Go to the "Keys" tab
Click "Add Key" > "Create New Key"
Select "JSON" format and click "Create"
A JSON file will be downloaded – Keep it safe!
📌 Rename it to service-account.json and move it to your backend project folder.

📌 4️⃣ Share a Google Drive Folder with the Service Account
By default, Google Drive API cannot access your personal Drive files. You need to create a shared folder where your service account can upload files.

Go to Google Drive
Create a New Folder (Drive API Uploads)
Right-click > "Share"
Find the Service Account Email:
In Google Cloud Console, go to IAM & Admin > Service Accounts
Copy the email (looks like: drive-api@your-project-id.iam.gserviceaccount.com)
Paste this email in the "Share" box and select "Editor" permissions
Click "Done"
📌 Note the Folder ID:

Open the folder in Google Drive
Look at the URL:
ruby
Copy
Edit
https://drive.google.com/drive/folders/1A2B3C4D567EFGHIJKLMNOP
The part after /folders/ (1A2B3C4D567EFGHIJKLMNOP) is your Folder ID.

## NPM Install:-

npm install express googleapis
