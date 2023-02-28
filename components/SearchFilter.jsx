import { useEffect, useState } from "react";
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react';
import router from 'next/router'
import {Mdcancel} from 'react-icons/md';
import Image from 'next/image';
import { filterData,getFilterValues } from "@/utils/filterData";
// import { baseUrl, fetchApi } from '../utils/fetchApi';
// import noresult from '../assets/images/noresult.svg';
// import Router from "router";

const SearchFilter = () => {
    const [filter, setFilter] =useState(filterData);


    const searchProperties = (filterValues) => {
        const path = router.pathname;
        const { query } = router;

        const values = getFilterValues(filterValues);

        values.forEach((item) => {
            if(item.value && filterValues?.[item.name]){
            
            query[item.name] = item.value
            }
        })

        router.push({pathname : path, query:query})



        
    
        
      };

    return(
        <Flex flexWrap='wrap' color = 'gray.100' p='4' justifyContent= 'center'>
            {filter.map((filter) =>(
                <Box key= {filter.queryName}>
                    <Select 
                    placeholder={filter.placeholder}
                    w='fit-content'
                    p='2'
                    color= 'blue.500'
                    onChange={(e) => searchProperties({[filter.queryName]: e.target.value})}
                    >
                        {filter?.items?.map((item)=>(
                            <option value= {item.value} key = {item.value}>
                                {item.name}
                            </option>

                        ))}

                        

                    </Select>
                </Box>

            ))}
           

        </Flex>
    )

}
export default SearchFilter;