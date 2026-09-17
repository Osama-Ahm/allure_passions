import { Navigate } from 'react-router';

// Pre-redesign routes that outlived their pages: the old prescription URL still
// has to reach the new one. Remove with src/legacy.
export const legacyRoutes = [{ path: 'prescription-skincare', element: <Navigate to="/skincare/tretinoin" replace /> }];
