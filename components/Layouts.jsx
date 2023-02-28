import Head from 'next/head';
import { Box } from '@chakra-ui/react';

import Footer from './Footer';
import Navbar from './Navbar';

const Layouts = ({children}) =>(
    <>
    <Head>
        <title>
            BlueSky
        </title>
    </Head>
    <Box maxWidth= "1280px" m ="auto">
        <header>
            <Navbar/>
        </header>
        <main>
            {children}
        </main>
        <footer>
            <Footer/>
        </footer>

    </Box>
    </>
);
export default Layouts;
