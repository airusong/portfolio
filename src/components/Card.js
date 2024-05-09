import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
    <VStack
      spacing={4}
      padding={4}
      backgroundColor="white"
      borderRadius="md"
      boxShadow="md"
      align="left"
      >
      <Image src={imageSrc} alt={title} />
      <Heading as="h3" size="md" color="black">{title}</Heading>
      <Text color="black">{description}</Text>
       <HStack>
        <Text color="black">Learn more</Text>
        <FontAwesomeIcon icon={faArrowRight} color="black" />
       </HStack>
      </VStack>
  )
};

export default Card;
