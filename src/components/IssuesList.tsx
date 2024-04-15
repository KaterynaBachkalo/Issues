import {
  Box,
  Flex,
  Link,
  ListItem,
  Text,
  UnorderedList,
  theme,
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
  assignee: {} | null;
}

const IssuesList: FC<IProps> = ({ open, close }) => {
  const stroke = css`
    display: inline;
    font-size: 16px;
    border: 1px solid rgba(17, 16, 28, 0.3);
    margin: 0 10px;
    height: 16px;
  `;

  const openIssues = open.filter((obj) => !obj.hasOwnProperty("pull_request"));

  const closedIssues = close.filter(
    (obj) => !obj.hasOwnProperty("pull_request")
  );

  const assigneeIssues = openIssues.filter((i) => i.assignee !== null);

  return (
    <Flex gap={5}>
      <Box
        width={`calc(${theme.sizes.container.xl} / 2 - 2 * 20px)`}
        textAlign="center"
      >
        <Text mb={5} fontWeight="700" as="h2">
          ToDo
        </Text>
        <UnorderedList
          display="flex"
          flexDirection="column"
          gap={5}
          textAlign="center"
          border="1px solid black"
          bgColor="gray.300"
          color="gray.500"
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
              p={4}
            >
              <Text fontWeight="700" textAlign="start" color="gray.800">
                {item.title}
              </Text>
              <Text textAlign="start">
                #{item.number} opened{" "}
                {Math.floor(
                  (new Date().getTime() - new Date(item.created_at).getTime()) /
                    (3600 * 24 * 1000)
                )}{" "}
                days ago
              </Text>
              <Flex alignItems="center">
                <Link
                  href={item.user.html_url}
                  target="blank"
                  _hover={{ textDecoration: "none" }}
                >
                  {item.user.login}
                </Link>
                <Text css={stroke}></Text>
                <Text>Comments: {item.comments}</Text>
              </Flex>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
      <Box
        width={`calc(${theme.sizes.container.xl} / 2 - 2 * 20px)`}
        textAlign="center"
      >
        <Text mb={5} fontWeight="700" as="h2">
          In Progress
        </Text>
        <UnorderedList
          display="flex"
          flexDirection="column"
          gap={5}
          textAlign="center"
          border="1px solid black"
          bgColor="gray.300"
          color="gray.500"
          p={5}
          m={0}
        >
          {assigneeIssues?.map((item) => (
            <ListItem
              key={item.id}
              bgColor="white"
              borderRadius={20}
              border="1px solid black"
              listStyleType="none"
              p={4}
            >
              <Text fontWeight="700" textAlign="start" color="gray.800">
                {item.title}
              </Text>
              <Text textAlign="start">
                #{item.number} opened{" "}
                {Math.floor(
                  (new Date().getTime() - new Date(item.created_at).getTime()) /
                    (3600 * 24 * 1000)
                )}{" "}
                days ago
              </Text>
              <Flex alignItems="center">
                <Link
                  href={item.user.html_url}
                  target="blank"
                  _hover={{ textDecoration: "none" }}
                >
                  {item.user.login}
                </Link>
                <Text css={stroke}></Text>
                <Text>Comments: {item.comments}</Text>
              </Flex>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
      <Box
        width={`calc(${theme.sizes.container.xl} / 2 - 2 * 20px)`}
        textAlign="center"
      >
        <Text mb={5} fontWeight="700" as="h2">
          Done
        </Text>
        <UnorderedList
          display="flex"
          flexDirection="column"
          gap={5}
          textAlign="center"
          border="1px solid black"
          bgColor="gray.300"
          color="gray.500"
          p={5}
          m={0}
        >
          {closedIssues?.map((item) => (
            <ListItem
              key={item.id}
              bgColor="white"
              borderRadius={20}
              border="1px solid black"
              listStyleType="none"
              p={4}
            >
              <Text fontWeight="700" textAlign="start" color="gray.800">
                {item.title}
              </Text>
              <Text textAlign="start">
                #{item.number} opened{" "}
                {Math.floor(
                  (new Date().getTime() - new Date(item.created_at).getTime()) /
                    (3600 * 24 * 1000)
                )}{" "}
                days ago
              </Text>
              <Flex alignItems="center">
                <Link
                  href={item.user.html_url}
                  target="blank"
                  _hover={{ textDecoration: "none" }}
                >
                  {item.user.login}
                </Link>
                <Text css={stroke}></Text>
                <Text>Comments: {item.comments}</Text>
              </Flex>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Flex>
  );
};

export default IssuesList;
