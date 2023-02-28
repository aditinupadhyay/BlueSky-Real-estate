import { useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import{Flex, Text, Box, Icon, keyframes} from '@chakra-ui/react';
import {BsFilter} from 'react-icons/bs';
import SearchFilter from "@/components/SearchFilter";
import Property from "@/components/Property";
import noresult from '../assets/images/noresult.svg'
import { fetchApi,baseUrl } from "@/utils/fetchAPI";

const Search = ({ properties }) =>{
    const [searchFilter, setSearchFilter] = useState(false);
    const router = useRouter();
    return(
        <Box>
            <Flex 
            cursor= 'pointer'
            bgColor='gray.100'
            p ='2'
            fontWeight= 'bold'
            fontSize= 'lg'
            borderBottom= '2px'
            borderColor= 'gray.200'
            textAlign= 'center'
            justifyContent= 'center'
            onClick={() => setSearchFilter((prevFilter) => !prevFilter)}>   
            {/* Once we start filtering we want to stop filter */}
                <Text>Search properties by filters</Text>
                <Icon paddingLeft= '5' w='10' as ={BsFilter}/>
                
            </Flex>
            {searchFilter && <SearchFilter/>}
            <Text size= '2xl' p ='4' fontWeight= 'bold'>
                Properties {router.query.purpose}

            </Text>
            <Flex flexWrap= 'wrap' >
            {properties.map((property) => <Property property={property} key={property.id} />)}
            </Flex>
            {properties.length ===0 && (
                <Flex justifyContent= 'center' alignItems='center' flexDirection='column' marginBottom= '5' marginTop= '5'>
                    <Image src = {noresult} alt = 'no result'/>
                    <Text fontSize= '2xl' marginTop= '3'> No Results Found</Text>
                </Flex>
            )}
        </Box>
    )
}
export default Search;
export async function getServerSideProps({ query }){
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';
    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);
    
    return {
        props: {
          properties: data?.hits,
        },
      };
  }