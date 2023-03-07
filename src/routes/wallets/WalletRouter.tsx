import { Button } from '@chakra-ui/react';
import { Link, RouteObject } from "react-router-dom";


const router: RouteObject = {
    path: '/wallet',
    element: <Link to={'/execution/123'}><Button colorScheme={'red'}> Go to wallet </Button> </Link>
}

export default router;