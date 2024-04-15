import {
  Box,
  Flex,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { FC, useEffect } from "react";
import { IIssues } from "../types";
import { useDispatch } from "react-redux";
import {
  setAssigneeIssues,
  setClosedIssues,
  setOpenIssues,
} from "../redux/issuesSlice";
import { useSelector } from "react-redux";
import {
  selectAssigneeIssues,
  selectClosedIssues,
  selectOpenIssues,
} from "../redux/selectors";

interface IProps {
  open: IIssues[];
  close: IIssues[];
}

const IssuesList: FC<IProps> = ({ open, close }) => {
  const dispatch = useDispatch();

  const openIssues = useSelector(selectOpenIssues);
  const closedIssues = useSelector(selectClosedIssues);
  const assigneeIssues = useSelector(selectAssigneeIssues);

  const stroke = css`
    display: inline;
    font-size: 16px;
    border: 1px solid rgba(17, 16, 28, 0.3);
    margin: 0 10px;
    height: 16px;
  `;

  useEffect(() => {
    const openIssues = open.filter(
      (obj) => !obj.hasOwnProperty("pull_request")
    );
    dispatch(setOpenIssues(openIssues));

    const closedIssues = close.filter(
      (obj) => !obj.hasOwnProperty("pull_request")
    );
    dispatch(setClosedIssues(closedIssues));

    const assigneeIssues = openIssues.filter((i) => i.assignee !== null);
    dispatch(setAssigneeIssues(assigneeIssues));
  }, [close, open, dispatch]);

  const flexWrapCondition = window.innerWidth <= 1000 ? "wrap" : "nowrap";

  return (
    <Flex gap={5} flexWrap={flexWrapCondition}>
      <Box flex="1" textAlign="center" minWidth="280px">
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
              <Flex alignItems="center" flexWrap="wrap">
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
      <Box flex="1" textAlign="center" minWidth="280px">
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
              <Flex alignItems="center" flexWrap="wrap">
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
      <Box flex="1" textAlign="center" minWidth="280px">
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
              <Flex alignItems="center" flexWrap="wrap">
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
