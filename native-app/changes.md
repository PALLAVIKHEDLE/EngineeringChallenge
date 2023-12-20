## Changes
-----------

## Requirements
* The application uses `react-navigation/bottom-tabs` for Tab layout. The bottom tabs dynamically display based on the authentication status.

## Authentication and Session Management:
* Two components, `registrationScreen` and `loginScreen`, handle user registration and login, respectively. The corresponding API calls (`registerUser` and `loginUser`) are implemented in `./authService.tsx`.
  
  Screenshots:
  ![Login Screen](./assets/frontendScreen/loginScreen.png)
  ![Registration Screen](./assets/frontendScreen/registrrationScreen.png)

  After successful login, the application includes the following components:
  1. Machine Health (`index.tsx`)
  2. Log Part (`two.tsx`)
  3. Visualization (`historyChart.tsx`)
  4. Logout (`logOutScreen.tsx`)

 ![Dashboard](./assets/frontendScreen/dashboard.png)
 ![Visualization](./assets/frontendScreen/visualization.png)
## Data State Management
Data is stored in the states returned by the API. The state management system updates and manages the state as new data points and scores are fetched.

## Stretch Goals - (Visualizations)
The application fetches data using the `fetchHistoryDataPoints` API and utilizes the `react-native-chart-kit` library to display charts representing trends in machine health scores.


## Installation

Follow these steps to set up :

1. Navigate to the project directory:

   ```bash
   cd native-app
   ```

2. Install dependencies using Yarn (or npm if you prefer):

   ```bash
   yarn
   ```
### Starting the APP

To run the following command:

```bash
yarn start
```