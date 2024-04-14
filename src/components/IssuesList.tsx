import {
  Box,
  Flex,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { FC } from "react";

interface IProps {
  open: Arr[];
  close: Arr[];
}

interface Arr {
  id: number;
  pull_request: {};
  state: string;
  title: string;
  number: number;
  created_at: string;
  user: {
    login: string;
    html_url: string;
  };
  comments: number;
}

const IssuesList: FC<IProps> = ({ open, close }) => {
  console.log(open);

  const boxStyles = css`
    width: calc(1280px / 2 - 2 * 20px);
    text-align: center;
  `;

  const stroke = css`
    display: inline;
    font-size: 10px;
    border: 1px solid rgba(17, 16, 28, 0.3);
    margin: 0 10px;
    height: 10px;
  `;

  const openIssues = open.filter((obj) => !obj.hasOwnProperty("pull_request"));

  const closeIssues = close.filter(
    (obj) => !obj.hasOwnProperty("pull_request")
  );

  return (
    <Flex gap={5}>
      <Box css={boxStyles}>
        <Text mb={5}>ToDo</Text>
        <UnorderedList
          display="flex"
          flexDirection="column"
          gap={5}
          textAlign="center"
          border="1px solid black"
          bgColor="gray.300"
          p={5}
          m={0}
        >
          {openIssues?.map((item) => (
            <ListItem
              key={item.id}
              bgColor="white"
              borderRadius={20}
              border="1px solid black"
              listStyleType="none"
            >
              <Text>{item.title}</Text>
              <Text>#{item.number}</Text>
              <Text>
                opened{" "}
                {new Date().getDate() - new Date(item.created_at).getDate()}{" "}
                days ago
              </Text>
              <Link href={item.user.html_url}>{item.user.login}</Link>
              <Text css={stroke}></Text>
              <Text>Comments: {item.comments}</Text>
            </ListItem>
          ))}
        </UnorderedList>
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
        <UnorderedList
          display="flex"
          flexDirection="column"
          gap={5}
          textAlign="center"
          border="1px solid black"
          bgColor="gray.300"
          p={5}
          m={0}
        >
          {closeIssues?.map((item) => (
            <ListItem
              key={item.id}
              bgColor="white"
              borderRadius={20}
              border="1px solid black"
              listStyleType="none"
            >
              <Text>{item.title}</Text>
              <Text>#{item.number}</Text>
              <Text>
                opened{" "}
                {new Date().getDate() - new Date(item.created_at).getDate()}{" "}
                days ago
              </Text>
              <Link href={item.user.html_url}>{item.user.login}</Link>
              <Text css={stroke}></Text>
              <Text>Comments: {item.comments}</Text>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Flex>
  );
};

export default IssuesList;
