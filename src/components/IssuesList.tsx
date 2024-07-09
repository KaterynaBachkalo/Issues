import { Box, Flex, Text, UnorderedList } from "@chakra-ui/react";
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
import ListItemOpenIssues from "./ListItemOpenIssues";
import ListItemAssigneeIssues from "./ListItemAssigneeIssues";
import ListItemClosedIssues from "./ListItemClosedIssues";

interface IProps {
  open: IIssues[];
  close: IIssues[];
}

const IssuesList: FC<IProps> = ({ open, close }) => {
  const openIssues = useSelector(selectOpenIssues);
  const closedIssues = useSelector(selectClosedIssues);
  const assigneeIssues = useSelector(selectAssigneeIssues);

  const dispatch = useDispatch();

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
            <ListItemOpenIssues
              key={item.id}
              title={item.title}
              number={item.number}
              created_at={item.created_at}
              user={item.user}
              comments={item.comments}
            />
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
            <ListItemAssigneeIssues key={item.id} data={item} />
          ))}
        </UnorderedList>
      </Box>
      <Box
        flex="1"
        textAlign="center"
        minWidth="280px"
        onDragOver={(e) => e.preventDefault()}
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
            <ListItemClosedIssues key={item.id} data={item} />
          ))}
        </UnorderedList>
      </Box>
    </Flex>
  );
};

export default IssuesList;
