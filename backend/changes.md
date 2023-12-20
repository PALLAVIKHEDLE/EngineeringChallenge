## Installation

Follow these steps to set up:

1. Navigate to the project directory:

   ```bash
   cd api
   ```
2. Install dependencies using Yarn (or npm if you prefer):

   ```bash
   yarn
   ```
### Starting the API
To start the API, run the following command:
```bash
yarn start
```
## Requirement
It utilizes the following technologies and components:
1. MongoDB Cloud Setup:
MongoDB Cloud connection setup is configured in `../backend/netlify/functions/api/db.ts`.

2. Authentication Middleware:

JSON Web Token (jsonwebtoken) is used for authentication middleware. The setup is done in `../backend/netlify/functions/api/authMiddleware.ts`.

# Authentication and Session Management:

User Schema: The user schema is defined in  `../backend/netlify/functions/api/user.ts`

### User Registration

Register a user by sending a POST request to the `/register` endpoint. Here's an example using cURL:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  {
  "username": "testUser",
  "password": "testPassword"
}' http://localhost:3001/register
```

The response will include the user name and password
```Json
{
    "user": {
        "username": "testUser",
        "password": "$2b$10$MSOwDwEU7E0fL2byFTI80.Ls2FRdkKtix5ZK77LEMcRNvrvuMyuL6",
        "_id": "658241440daca9778afb0e7f",
        "__v": 0
    }
}
```

### User Login
Login in app by sending a POST request to the `/login` endpoint. Here's an example using cURL:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  {
  "username": "testUser",
  "password": "testPassword"
}' http://localhost:3001/login
```
The response will provide an authentication token:

```Json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvbGUyIiwiaWF0IjoxNzAzMDM1Mzc1fQ.DMn87z-On9FDKg1TMXkkFRgxOVmLhZFizWc8_T3y5h8"
}
```
# Persistence Layer on the Backend:


# Stretch Goals (history of scores):
It includes a feature to visualize trends in machine health scores.

1. The GetAPI endpoint `historyDataPoints` is implemented in app.ts.
2. Data Manipulation for Visualization:
  Data manipulation for visualization of trends in machine health scores is done in `../backend/syncDataPoints.ts`.
3. MongoDB Storage: Manipulated data is saved into MongoDB for historical tracking.



manipulate the data of machine-health for visulaization of trends in machine health scores.
dataMAnipulation of machine-health is `../backend/syncDataPoints.ts` and saving it into the mongoDb.

The response includes data for different machines, each with corresponding dates and scores.

``` Json
[
    {
        "label": "assemblyLine",
        "labels": [
            "2023-12-19",
            "2023-12-18",
            "2023-12-9",
            "2023-12-19",
            "2023-12-19",
            "2023-12-19"
        ],
        "data": [
            "0.00",
            "72.22",
            "72.22",
            "72.22",
            "72.22",
            "72.22"
        ]
    },
    {
        "label": "qualityControlStation",
        "labels": [
            "2023-12-19"
        ],
        "data": [
            "20.00"
        ]
    },
    {
        "label": "weldingRobot",
        "labels": [
            "2023-12-23",
            "2023-12-1",
            "2023-12-19",
            "2023-12-19",
            "2023-12-19"
        ],
        "data": [
            "88.19",
            "88.19",
            "88.19",
            "88.19",
            "88.19"
        ]
    }
]
```