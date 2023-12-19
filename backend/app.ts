import express, { Request, Response } from 'express';
import { getMachineHealth } from './machineHealth';
import { registerUser, loginUser } from '../backend/netlify/functions/api/userService';
// import { IDataPoint, DataPointModel } from '../backend/netlify/functions/api/dataPoint';
import jwt from 'jsonwebtoken';
import cors from 'cors'; 
import mongoDb from './netlify/functions/api/db'
import { historyDataModel} from '../backend/netlify/functions/api/historyData'; 
import {syncToCloud} from './syncDataPoints'


const app = express();
const port = 3001;

// Middleware to parse JSON request bodies
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// Endpoint to get machine health score
app.post('/machine-health', async (req: Request, res: Response) => {
  const result = getMachineHealth(req);
  if (result.error) {
    res.status(400).json(result);
  } else {
    res.json(result);
    //push to mongo
    try {
     let historyDATA= syncToCloud(req.body,result)
     console.log('historyDATA',historyDATA)
     for (const data of historyDATA) {
        const savedData = await data.save();
       console.log('Saved Historical Data:', savedData);
    }
      // const historyDATA = new historyDataModel({  machineId: "WeldingMachine",
      // userId: 'role2',
      // timestamp: new Date(),
      // score: "58.4",
      // dataPoints: {
      //   "assemblyLine": {
      //     "alignmentAccuracy": "0.5"
      //   },
      //   "weldingRobot": {
      //     "vibrationLevel": "4.0",
      //     "electrodeWear": "0.8"
      //   }
      // },});
     
    } catch (error) {
      // Handle the error here
      console.error('Error saving historical data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});


app.get('/hello', (req, res) => res.send("Hello World"));

app.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const { error, user } = await registerUser(username, password);
    if (error) {
      console.log('Registration Error:', error);
      return res.status(400).json({ error: error.message });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  loginUser(username, password, (error, user) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a token and send it to the client
    const token = jwt.sign({ username: user.username }, 'e0NldHbb/VaWwH7B9J0kPM6B5HSPfKHOkeo4KF5VeQji8neWwTk7oI7kp44awOdPzvHaToJT9hJ36NkNA7VPZ1LIj/7TYLwloPUVTp/VhsAky9874XeQoaZOUUT2I+tOL3L0z8BnEbN2+uyH6kvKkNMUHLKWsRx1OxKf/oXaQt5X9P56lF7rPPuoY3JO97xgFvLaEY6393B1wnEiVWqHPW9xeMz/XOBIDiGQvHTAopAlg61UKJmHRaA6wfAh4HGQldMojIHPAat5zyTUAsjnkGNSV9BfCbCqKiOxbXE3rRC/4R5+2edpMHMLqAjq55B2S636m+Q0kTeRuiSNN+mH2Q==');

    res.json({ token });
  });
});


app.listen(port, () => {
  console.log(`API is listening at http://localhost:${port}`);
});

mongoDb.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoDb.once('open', () => {
  console.log('Connected to MongoDB');
});
