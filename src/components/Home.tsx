import { Container } from "@chakra-ui/react";
import FormSearch from "./FormSearch";

const Home = () => {
  return (
    <Container as="section" maxW="container.xl" p={5}>
      <FormSearch />
    </Container>
  );
};

export default Home;
