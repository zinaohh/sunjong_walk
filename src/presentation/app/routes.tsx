import { createBrowserRouter } from 'react-router';
import { AppLayout } from './AppLayout';
import { HomeScreen } from '../screens/home/HomeScreen';
import { PlanScreen } from '../screens/plan/PlanScreen';
import { CheckScreen } from '../screens/check/CheckScreen';
import { ReviewScreen } from '../screens/review/ReviewScreen';
import { PATHS } from './paths';

export const router = createBrowserRouter([
  {
    path: PATHS.home,
    element: <AppLayout />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: PATHS.plan, element: <PlanScreen /> },
      { path: PATHS.check, element: <CheckScreen /> },
      { path: PATHS.review, element: <ReviewScreen /> },
    ],
  },
]);
