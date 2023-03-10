import Link from "next/link";
import Image from "next/image";
import {Flex,Box,Button, Text} from "@chakra-ui/react";
import { baseUrl, fetchApi } from "@/utils/fetchAPI";
import Property from "@/components/Property";

const Banner = ({purpose,imageURL,title1,title2,desc1,desc2,linkName,buttonText}) =>(
  <Flex flexWrap= "wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageURL} width ={500} height ={300} alt ="banner"/>
    <Box p={5}>
      <Text color={"gray.500"} fontSize ={"sm"} fontWeight = {"medium"}>{purpose}</Text>
      <Text  fontSize ={"3xl"} fontWeight = {"bold"}>{title1}<br/>{title2}</Text>
      <Text  fontSize ={"lg"} paddingTop = "3" paddingBottom={3} color = "gray.300" fontWeight = {"medium"}>{desc1}<br/>{desc2}</Text>
      <Button fontSize={"xl"} bg='blue.300' color={"white"} >
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)
export default function Home({propertiesForSale,propertiesForRent}){
  
  return(
    <Box>
      {/* <h1>Hello </h1> */}
      <Banner 
      purpose=  'RENT A HOME'
      title1= "Rental Homes for"
      title2= "everyone"
      desc1= "Villas, cottages, pent houses"
      desc2 = "and more"
      buttonText='Explore Renting'
      linkName='/search?purpose=for-rent'
      imageURL='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      

      />
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property)=><Property property ={property} key={property.id}/>)}
      </Flex>
      <Banner
      purpose= "BUY A HOME"
      title1="Buy Homes for"
      title2= "for everyone"
      desc1= "3bhk,4bhk, 5bhk"  
      desc2="and many more"
      buttonText="Explore Buying"
      linkName='/search?purpose=for-sale'
      imageURL='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
       
       />
       <Flex flexWrap= "wrap">
         {propertiesForSale.map((property)=><Property property ={property} key={property.id}/>)}
       </Flex>

    </Box>
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);
  return{
    props:{
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    }
  }
}


