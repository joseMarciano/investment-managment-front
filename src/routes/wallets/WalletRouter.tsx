import { Button } from '@chakra-ui/react';
import { Link, RouteObject } from "react-router-dom";


const router: RouteObject = {
    path: '/wallet',
    element: <Link to={'/execution-summary/9bbca7d6e23f4a5ba3e585253bef398e'}><Button colorScheme={'red'}> Go to wallet </Button> </Link>
}

export default router;