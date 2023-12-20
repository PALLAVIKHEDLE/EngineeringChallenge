## Changes
----

## Pre-Requisites

- For persistence we used MongoDB. Follow any of these three to setup your mongo instance. 
    - Mongo on cloud using [Atlas UI](https://www.mongodb.com/docs/atlas/getting-started/)
    - Docker instance, [setup instructions](#running-mongodb-in-docker) [Preferred]

## Set Mongo URI

- Set `MONGODB_URI` which is used for persistence in [`db.ts`](./netlify/functions/api/db.ts); 

## Authentication Middleware:

JSON Web Token (jsonwebtoken) is used for authentication middleware. The setup is done in [`authMiddleware.ts`](../backend/netlify/functions/api/authMiddleware.ts). You can generate your own token to update line `15` or continue using this.


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
## Modifications

### Authentication and Session Management:

MongoDB is used here; a collection called `users` will store username and hashed password as a user registers.
More on [this](../backend/netlify/functions/api/user.ts).

#### User Registration

Register a user by sending a POST request to the `/register` endpoint. Here's an example using cURL:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  {
  "username": "testUser",
  "password": "testPassword"
}' http://localhost:3001/register
```

Sample success response:
```Json
{
    "message": "User Created Successfully!"
}
```

#### User Login
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
### Persistence Layer on the Backend:

We use two collections in mongo for the whole persistence logic: `users` & `datapoints`.

- `users` is to store the user records
- `datapoints` is to store the historical data records.

Screenshot of data in mongodb:
![users](./assets/users.png)
![dataPoints](./assets/datapoints.png)


### Stretch Goals (history of scores):
It includes a feature to visualize trends in machine health scores.

1. The GetAPI endpoint `historyDataPoints` is implemented in [`app.ts`](./app.ts)
2. Data Manipulation for Visualization:
  Data manipulation for visualization of trends in machine health scores is done in [`syncDataPoints.ts`](../backend/syncDataPoints.ts).
3. MongoDB Storage: Manipulated data is saved into MongoDB for historical tracking. The file responsible for this operation is [`syncDataPoints.ts`](../backend/syncDataPoints.ts).

The response includes data for different machines, each with corresponding dates and scores which is used by frontend to make visualizations.
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

## Running MongoDB in Docker

To run mongo in docker; 
- [Installation guideline for Mac](https://docs.docker.com/desktop/install/mac-install/) - Much straightforward, just install `Docker Desktop` 
- [Installation guideline for Linux](https://docs.docker.com/desktop/install/linux-install/)
- [Installation guideline for Window](https://docs.docker.com/desktop/install/windows-install/)

If you are using `Docker Desktop` you should automatically have `docker-compose` utility installed. If not refer this [guide](https://docs.docker.com/compose/install/).

- Mongo Client [Optional]

To view mongo, I had included a web based interface with docker called `mongo-express`. If no you can use an offline client such as [`mongo compass`](https://www.mongodb.com/try/download/compass). Incase you are using Atlas - cloud instance, it should be already giving you an user interface to play around :).

Once you have this installation done -

- `cd EngineeringChallenge`
- Run docker compose -
`docker-compose -f docker-compose.yml up -d`

* [`docker-compose.yml`](./docker-compose.yml) defines `root` as mongo username and `password` as mongo password. Your final connection string would look like `mongodb://root:password@localhost:27017/`

* Visit [localhost:8088](http://localhost:8088/) for mongo-express web interface.

To stop mongodb:
- `docker-compose -f docker-compose.yml down`

