import { Flex, Link, ListItem, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import React, { FC } from "react";
import { IIssues } from "../types";

const stroke = css`
  display: inline;
  font-size: 16px;
  border: 1px solid rgba(17, 16, 28, 0.3);
  margin: 0 10px;
  height: 16px;
`;

const ListItemOpenIssues: FC<IIssues> = (data: {
  title: string;
  number: number;
  created_at: string;
  user: { html_url: string; login: string };
  comments: number;
}) => {
  return (
    <ListItem
      bgColor="white"
      borderRadius={20}
      border="1px solid black"
      listStyleType="none"
      p={4}
    >
      <Text fontWeight="700" textAlign="start" color="gray.800">
        {data.title}
      </Text>
      <Text textAlign="start">
        #{data.number} opened{" "}
        {Math.floor(
          (new Date().getTime() - new Date(data.created_at).getTime()) /
            (3600 * 24 * 1000)
        )}{" "}
        days ago
      </Text>
      <Flex alignItems="center" flexWrap="wrap">
        <Link
          href={data.user.html_url}
          target="blank"
          _hover={{ textDecoration: "none" }}
        >
          {data.user.login}
        </Link>
        <Text css={stroke}></Text>
        <Text>Comments: {data.comments}</Text>
      </Flex>
    </ListItem>
  );
};

export default ListItemOpenIssues;
