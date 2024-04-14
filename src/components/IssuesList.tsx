import { Box, Flex, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { FC } from "react";

interface IProps {
  data: [];
}

const IssuesList: FC<IProps> = ({ data }) => {
  console.log(data);

  const boxStyles = css`
    width: calc(1280px / 2 - 2 * 20px);
    text-align: center;
  `;

  return (
    <Flex gap={5}>
      <Box css={boxStyles}>
        <Text mb={5}>ToDo</Text>
        <Box
          textAlign="center"
          border="1px solid black"
          bgColor="gray.300"
        ></Box>
      </Box>
      <Box css={boxStyles}>
        <Text mb={5}>In Progress</Text>
        <Box
          textAlign="center"
          border="1px solid black"
          bgColor="gray.300"
        ></Box>
      </Box>
      <Box css={boxStyles}>
        <Text mb={5}>Done</Text>
        <Box
          textAlign="center"
          border="1px solid black"
          bgColor="gray.300"
        ></Box>
      </Box>
    </Flex>
  );
};

export default IssuesList;
