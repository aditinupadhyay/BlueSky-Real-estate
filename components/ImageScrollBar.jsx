import Image from 'next/image';
import {Box, Icon, Flex } from '@chakra-ui/react';
import {useContext} from 'react';
import { ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';


const LeftArrow =()=>{
    const {scrollPrev} =useContext(VisibilityContext);
    return(
        <Flex justifyContent='center' alignItems='center' marginRight= '1'>
            <Icon 
            as={FaArrowAltCircleLeft}
            fontSize='2xl'
            onClick={()=>scrollPrev()}
            cursor='pointer'
            />

        </Flex>
    )
}

const RightArrow =()=>{
    const {scrollNext} = useContext(VisibilityContext);
    return(
        <Flex justifyContent='center' alignItems= 'center' marginLeft= '1'>
            <Icon
            as={FaArrowAltCircleRight}
            cursor='pointer'
            onClick={()=>scrollNext()}
            fontSize='2xl'
            />

        </Flex>
    )
}

const ImageScrollBar =({data})=>(
    <ScrollMenu LeftArrow ={LeftArrow} RightArrow = {RightArrow} style ={{overflow:'hidden'}}>
        {data.map((item)=>(
            <Box key ={item.id} width='900px' itemID={item.id} overflow='hidden' p='1'>
                <Image
                alt='property'
                width='1000'
                height='500'
                src= {item.url}
                blurDataURL={item.url}
                placeholder='blur'
                sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px" ></Image>
            </Box>

        ))}
        

    </ScrollMenu>
)

export default ImageScrollBar;
