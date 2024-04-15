import { Container, Text } from "@chakra-ui/react";
import FormSearch from "./FormSearch";

const Home = () => {
  return (
    <Container as="section" maxW="container.xl" p={5}>
      <Text as="h1" fontSize="2xl" fontWeight="bold" mb={10}>
        GitHub Issue Management Board
      </Text>
      <FormSearch />
    </Container>
  );
};

export default Home;
